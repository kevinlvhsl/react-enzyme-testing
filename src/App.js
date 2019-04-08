import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Context } from './WithContext'
import axios from 'axios'
import { parseToYearAndMonth, ID, flatternArr } from './utility'
import './App.css'
import Home from './containers/Home'
import Create from './containers/Create'
// 1、改造async
// 2、加loading
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: {},
      categories: {},
      editItem: null,
      currentDate: parseToYearAndMonth(),
      loading: false
    }
    const withLoading = (cb) => {
      return (...args) => {
        this.setState({ loading: true })
        return cb(...args)
      }
    }
    this.actions = {
      getIntialState: withLoading(async () => {
        const { year, month } = this.state.currentDate
        const itemURL = `/items?${year}-${month}&_sort=timestamp&order=desc`
        const promiseArr = [axios.get('/categories'), axios.get(itemURL)]
        const [cateRes, itemRes] = await Promise.all(promiseArr)
        this.setState({
          categories: flatternArr(cateRes.data),
          items: flatternArr(itemRes.data),
          loading: false
        })
      }),
      getEditData: withLoading(async (id) => {
        const itemURL = `/items/${id}`
        const { categories, editItem, items } = this.state
        // 判断是否需要加载 categories 和 editItem（当前有传id并且items中已加载过）
        const needLoadCates = Object.keys(categories).length === 0
        const needLoadItem = id && !(items && items[id])
        const promiseArr = [needLoadCates ? axios.get('/categories') : null, needLoadItem ? axios.get(itemURL) : null]
        const [cateRes, itemRes] = await Promise.all(promiseArr)

        const cates = needLoadCates ? flatternArr(cateRes.data) : categories
        const editingItem = needLoadItem ? itemRes.data : items[id]
        this.setState({
          categories: cates,
          editItem: editingItem,
          loading: false
        })
        return { categories: cates, editItem: editingItem }
      }),
      changeDate: withLoading(async (year, month) => {
        const { data } = await axios.get(`/items?${year}-${month}&_sort=timestamp&order=desc`)
        this.setState({
          items: flatternArr(data),
          currentDate: parseToYearAndMonth(`${year}-${month}`),
          loading: false
        })
        return flatternArr(data)
      }),
      deleteItem: withLoading(async (id) => {
        const deletedItem = await axios.delete(`/items/${id}`)
        delete this.state.items[id]
        this.setState({
          items: { ...this.state.items }
        })
        return deletedItem
      }),
      createItem: withLoading(async (data) => {
        const id = ID()
        const pased = parseToYearAndMonth(data.date)
        const newItem = {
          ...data,
          id,
          monthCategory: `${pased.year}-${pased.month}`,
          timestamp: new Date(data.date).getTime()
        }
        await axios.post('/items', newItem)
        this.setState({
          items: { ...this.state.items, [id]: newItem }
        })
        return newItem
      }),
      updateItem: withLoading(async (data) => {
        data.timestamp = new Date(data.date).getTime()
        await axios.put(`/items/${data.id}`, data)
        this.state.items[data.id] = data
        this.setState({
          items: { ...this.state.items }
        })
        return data
      })
    }
  }

  render() {
    return (
      <Context.Provider value={{
        state: this.state,
        actions: this.actions
      }}>
        <Router>
          <div className="App">
            <div className="container pb-5">
              <Route path="/" exact component={Home} />
              <Route path="/create" component={Create} />
              <Route path="/edit/:id" component={Create} />
            </div>
          </div>

        </Router>
      </Context.Provider>
    )
  }
}

export default App;
