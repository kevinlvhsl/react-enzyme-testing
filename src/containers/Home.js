import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TotalPrice from '../components/TotalPrice'
import withContext from '../WithContext.js'
import { withRouter } from 'react-router-dom'
import logo from '../logo.svg'
import CreateButton from '../components/CreateButton'
import MonthPicker from '../components/MonthPicker'
import { Tabs, Tab } from '../components/Tabs'
import Pricelist from '../components/PriceList'
import Loading from '../components/Loading'
import Ionicon from 'react-ionicons'

import { Colors, padLeft, TYPE_INCOME } from '../utility'
class Home extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    history: PropTypes.object,
  }
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.actions.getIntialState()
  }
  createItem = () => {
    this.props.history.push('/create')
  }
  onModifyItem = (item) => {
    this.props.history.push('/edit/' + item.id)
  }
  onDeleteItem = (item) => {
    this.props.actions.deleteItem(item.id)
  }
  onChangeDate = (year, month) => {
    this.props.actions.changeDate(year, month)
  }
  render() {
    const { items, categories, loading, currentDate: { year, month } } = this.props.data
    const itemsWithCategory = Object.keys(items).map(id => {
      items[id].category = categories[items[id].cid]
      return items[id]
    }).filter(item => item.date.indexOf(`${year}-${padLeft(month)}`) > -1)
    let totalIncome = 0
    let totalOutcome = 0
    itemsWithCategory.forEach((item) => {
      if (item.category.type === TYPE_INCOME) {
        totalIncome += item.price
      } else {
        totalOutcome += item.price
      }
    })
    return (
      <React.Fragment>
        <header className="App-header">
          <div className="row mb-5 justify-content-center">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div className="row">
            <div className="col">
                <MonthPicker
                  year={year}
                  month={month}
                  onChange={this.onChangeDate}
                />
              </div>
              <div className="col">
                <TotalPrice
                  income={totalIncome}
                  outcome={totalOutcome}
                />
              </div>
          </div>
        </header>
        <div className="content-area py-3 px-3">
          <Tabs actriveIndex={0} onTabChange={(i) => {
            console.log('change 后的index', i)}
          }>
            <Tab>
              <Ionicon
                className="rounded-circle mr-2"
                fontSize="25px"
                color={Colors.blue}
                icon="ios-paper"
              />
              列表模式
            </Tab>
            <Tab>
              <Ionicon
                className="rounded-circle mr-2"
                fontSize="25px"
                color={Colors.blue}
                icon="ios-pie"
              />
              列表模式
            </Tab>
          </Tabs>
          <CreateButton text="创建新的记账记录" onClickHandler={this.createItem} />
          {
            loading ? <Loading /> :
            <Pricelist
              list={itemsWithCategory}
              onModifyItem={(item) => {this.onModifyItem(item)}}
              onDeleteItem={(item) => {this.onDeleteItem(item)}}
            />
          }
        </div>
      </React.Fragment>
    )
  }
}
export default withRouter(withContext(Home))