import React from 'react'
import PriceList from '../PriceList'
import { shallow } from 'enzyme'
import Ionicon from 'react-ionicons'
import { testItems, testCategories } from '../../testData'
import { flatternArr } from '../../utility'
const itemsWithCategory = testItems.map(item => {
  item.category = flatternArr(testCategories)[item.cid]
  return item
})
const props = {
  list: itemsWithCategory,
  onModifyItem: jest.fn(),
  onDeleteItem: jest.fn()
}
let wrapper
const itemClassName = '.list-group-item'
describe('test PriceList Component', () => {
  beforeEach(() => {
    wrapper = shallow(<PriceList {...props} />)
  })

  it('should render to match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render correct price item length ', () => {
    const ls = wrapper.find(itemClassName)
    expect(ls.length).toEqual(itemsWithCategory.length)
  })
  it('should render correct icon and price for each item', () => {
    const iconList = wrapper.find(itemClassName).first().find(Ionicon)
    expect(iconList.length).toEqual(3)
    expect(iconList.first().props().icon)
      .toEqual(itemsWithCategory[0].category.iconName)
  })

  it('should trigger the correct function callbacks', () => {
    const firstItem = wrapper.find(itemClassName).first()
    firstItem.find('a').first().simulate('click', {preventDefault: () => {}})
    expect(props.onModifyItem).toHaveBeenCalledWith(itemsWithCategory[0])
    firstItem.find('a').last().simulate('click', {preventDefault: () => {}})
    expect(props.onDeleteItem).toHaveBeenCalledWith(itemsWithCategory[0])
  })
})