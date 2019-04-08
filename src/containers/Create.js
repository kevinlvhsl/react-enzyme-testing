import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withContext from '../WithContext.js'
import { withRouter } from 'react-router-dom'
import { Tabs, Tab } from '../components/Tabs'
import CategorySelect from '../components/CategorySelect'
import PriceForm from '../components/PriceForm'
import { TYPE_INCOME, TYPE_OUTCOME } from '../utility'
const typeArr = [TYPE_INCOME, TYPE_OUTCOME]

class Create extends Component {
  static propTypes = {
    id: PropTypes.string,
    data: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    history: PropTypes.object,
  }
  constructor(props) {
    super(props)
    this.state = {
      selectedCategory: null,
      tabIndex: 0
    }
  }
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.actions.getEditData(id).then((data) => {
      const { categories, editItem } = data
      const editingItem = (id && editItem) ? editItem : null
      this.setState({
        selectedCategory: (id && editItem) ? categories[editingItem.cid] : null,
        tabIndex: (id && editItem) ? typeArr.indexOf(categories[editingItem.cid].type): 0
      })
    })
  }
  tabChange = (index) => {
    console.log(index)
    this.setState({ tabIndex: index })
  }
  setSelected = (cate) => {
    this.setState({
      selectedCategory: cate
    })
  }
  onFormSubmit = (data, isEdit) => {

    const { selectedCategory, tabIndex } = this.state
    const { categories } = this.props.data
    const cd = selectedCategory || Object.values(categories).filter(cate => cate.type === typeArr[tabIndex])[0]
    const item = { ...data, cid: cd.id }
    this.props.actions[isEdit ? 'updateItem' : 'createItem'](item).then(() => {
      this.goHome()
    })

  }
  goHome = () => {
    this.props.history.push('/')
  }
  onFormCancel = () => {
    this.props.history.push('/')
  }
  render() {
    const { selectedCategory, tabIndex } = this.state
    const { id } = this.props.match.params
    const { categories,  editItem } = this.props.data
    const editingItem = (id && editItem) ? editItem : {}
    const filterCategories = Object.values(categories).filter(cate => cate.type === typeArr[tabIndex])
    return (
      <div className="create-page py-3 px-3 rounded mt-3" style={{background: '#fff'}}>
      <Tabs activeIndex={tabIndex} onTabChange={this.tabChange}>
        <Tab>收入</Tab>
        <Tab>支出</Tab>
      </Tabs>
      <div className="mt-3">
        <CategorySelect categories={filterCategories}
          selectedCategory={selectedCategory}
          onSelect={this.setSelected}
        />
      </div>
      <PriceForm onFormSubmit={this.onFormSubmit} onFormCancel={this.onFormCancel} item={editingItem} />
      </div>
    )
  }
}
export default withRouter(withContext(Create))