import React from 'react'
import { shallow } from 'enzyme'
import CategorySelect from '../CategorySelect'
import { testCategories } from '../../testData'
import Ioniton from 'react-ionicons'
const props = {
  categories: testCategories,
  onSelect: jest.fn()
}
const propsWithCategory = {
  ...props,
  selectedCategory: testCategories[0]
}
let wrapper

describe('test CategorySelect Component', () => {
  beforeEach(() => {
    wrapper = shallow(<CategorySelect { ...props } />)
  })
  it('should render correct to match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('should render correct items and icon name', () => {
    const items = wrapper.find('.category-item')
    expect(items.length).toEqual(testCategories.length)
    expect(wrapper.find('.category-item.active').length).toEqual(0)
    expect(items.first().find(Ioniton).props().icon).toEqual(testCategories[0].iconName)
  })

  it('should render selectedCategory with category item with highlight and trigger the callback function ', () => {
    wrapper = shallow(<CategorySelect { ...propsWithCategory } />)
    expect(wrapper.find('.category-item').first().hasClass('active')).toEqual(true)
    wrapper.find('.category-item').last().simulate('click', { preventDefault: () => {} })
    expect(propsWithCategory.onSelect).toHaveBeenCalledWith(testCategories[testCategories.length -1])
  })

})



// import React from 'react'
// import { mount } from 'enzyme'
// import CategorySelect from '../CategorySelect'
// import { testCategories } from '../../testData'
// import Ioniton from 'react-ionicons'

// let props = {
//   onSelect: jest.fn(),
//   categories: testCategories
// }
// let propsWithItem = {
//   ...props,
//   selectedCategory: testCategories[0]
// }
// describe('test CategorySelect Content', () => {
//   it('should renter to match snapshot and render correct item length and click to be active ', () => {
//     const wrapper = mount(<CategorySelect {...props } />)
//     // expect(wrapper).toMatchSnapshot()
//     expect(wrapper.find('.category-item').length).toEqual(testCategories.length)
//     expect(wrapper.find('.category-item.active').length).toEqual(0)
//     wrapper.find('.category-item').first().simulate('click', { preventDefault: () => {} })
//     expect(wrapper.find('.category-item').first().hasClass('active')).toEqual(false)
//   })
//   it('should render correct active item and trigger click callback behavior ', () => {
//     const wrapper = mount(<CategorySelect {...propsWithItem } />)
//     expect(wrapper.find('.category-item').first().hasClass('active')).toEqual(true)
//     wrapper.find('.category-item').at(1).simulate('click', { preventDefault: () => {} })
//     expect(propsWithItem.onSelect).toHaveBeenCalledWith(propsWithItem.categories[1])
//   })
// })