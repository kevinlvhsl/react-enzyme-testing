import React from 'react'
import { mount } from 'enzyme'
import PriceForm from '../PriceForm'
import { testItems } from '../../testData'

const props = {
  onFormSubmit: jest.fn(),
  onFormCancel: jest.fn()
}

const propsWithPrice = {
  onFormSubmit: jest.fn(),
  onFormCancel: jest.fn(),
  item: testItems[0]
}

let wrapper
let wrapper2
let formInstance
export const getInputValue = (selector, wrapper) => {
  return wrapper.find(selector).instance().value
}
export const setInputValue = (selector, wrapper, newVal) => {
  wrapper.find(selector).instance().value = newVal
}
describe('test PriceForm Component', () => {
  beforeEach(() => {
    wrapper = mount(<PriceForm { ...props } />)
    wrapper2 = mount(<PriceForm { ...propsWithPrice } />)
    formInstance = wrapper.find(PriceForm).instance()
  })

  // it('should render correct to match snapshot', () => {
  //   expect(wrapper).toMatchSnapshot()
  //   expect(wrapper2).toMatchSnapshot()
  // })

  describe('test PriceForm with no item', () => {
    it('render PriceForm  should generate three inputs and one form element', () => {
      expect(wrapper.find('input').length).toEqual(3)
      expect(wrapper.find('form').length).toEqual(1)
    })
    it('render PriceForm with no data should render three inputs and no value', () => {
      expect(getInputValue('#title', wrapper)).toEqual('')
      expect(getInputValue('#price', wrapper)).toEqual('')
      expect(getInputValue('#date', wrapper)).toEqual('')
    })
    it('submit form with empty input should show alert message', () => {
      wrapper.find('form').simulate('submit')
      expect(formInstance.state.validatePass).toEqual(false)
      expect(wrapper.find('.alert').length).toEqual(1)
      expect(props.onFormSubmit).not.toHaveBeenCalled()
    })
    it('submit form with invalid price should show alert message', () => {
      setInputValue('#title', wrapper, 'test')
      setInputValue('#price', wrapper, '-20')
      wrapper.find('form').simulate('submit')
      expect(formInstance.state.validatePass).toEqual(false)
    })
    it('submit form with invalid date format should show alert message', () => {
      setInputValue('#title', wrapper, 'test')
      setInputValue('#price', wrapper, '20')
      setInputValue('#date', wrapper, 'wrong date')
      wrapper.find('form').simulate('submit', { preventDefault: () => {} })
      expect(formInstance.state.validatePass).toEqual(false)
    })
    it('submit form with valid data should call with the right object', () => {
      setInputValue('#title', wrapper, 'test')
      setInputValue('#price', wrapper, '20')
      setInputValue('#date', wrapper, '2018-01-01')
      const newItem = { title: 'test', price: 20, date: '2018-01-01'}
      wrapper.find('form').simulate('submit', { preventDefault: () => {} })
      expect(props.onFormSubmit).toHaveBeenCalledWith(newItem, false)
    })
    // it('should correct to trigger submit callback function', () => {
    //   wrapper.find('.btn-submit').simulate('click', { preventDefault: () => {} })
    //   expect(props.onFormSubmit).toHaveBeenCalled()
    //   wrapper2.find('.btn-submit').simulate('click', { preventDefault: () => {} })
    //   // expect(propsWithPrice.onFormSubmit).toHaveBeenCalled()
    // })
  })

  describe('test PriceForm with item data', () => {
    it('render Price Form with item should render the correct data to inputs', () => {
      expect(getInputValue('#title', wrapper2)).toEqual(propsWithPrice.item.title)
      expect(getInputValue('#price', wrapper2)).toEqual(propsWithPrice.item.price.toString())
      expect(getInputValue('#date', wrapper2)).toEqual(propsWithPrice.item.date)
    })

    it('submit with changed value, should trigger callback right object', () => {
      setInputValue('#title', wrapper2, 'new title')
      setInputValue('#price', wrapper2, 200)
      setInputValue('#date', wrapper2, '2019-04-04')
      wrapper2.find('form').simulate('submit', { preventDefault: () => {} })
      const newItem = {...testItems[0], title: 'new title', price: 200, date: '2019-04-04'}
      expect(wrapper2.find('.alert').length).toEqual(0)
      expect(propsWithPrice.onFormSubmit).toHaveBeenCalledWith(newItem, true)
      expect(formInstance.state.validatePass).toEqual(true)
      expect(formInstance.state.errorMessage).toEqual('')
    })
  })

})
