import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import MonthPicker from '../MonthPicker'
import { padLeft } from '../../utility'

const props = {
  year: 2019,
  month: 4,
  onChange: jest.fn()
}

let wrapper
const btnClassName = '.dropdown-toggle'
describe('test MonthPicker Component', () => {
  beforeEach(() => {
    wrapper = mount(<MonthPicker { ...props } />)
  })

  it('should render correct to match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('render the correct year and month, show correct dropdown status', () => {
    const ymText = wrapper.find(btnClassName).text()
    expect(ymText).toEqual(`${props.year} 年 ${props.month} 月`)
    expect(wrapper.find('.dropdown-menu').length).toEqual(0)
    expect(wrapper.state('isOpen')).toEqual(false)
    expect(wrapper.state('selectedYear')).toEqual(props.year)
  })

  it('after click the button, dropdown should show, year list&month list should have the correct items', () => {
    wrapper.find(btnClassName).simulate('click', { preventDefault: () => {} })
    expect(wrapper.find('.dropdown-menu').length).toEqual(1)
    expect(wrapper.state('isOpen')).toEqual(true)
    expect(wrapper.find('.years-range .dropdown-item').length).toEqual(11)
    expect(wrapper.find('.months-range .dropdown-item').length).toEqual(12)
    expect(wrapper.find('.years-range .dropdown-item.active').text())
      .toEqual(`${props.year} 年`)
    expect(wrapper.find('.years-range .dropdown-item').first().text())
      .toEqual(`${props.year - 5} 年`)
    expect(wrapper.find('.months-range .dropdown-item.active').text())
      .toEqual(`${padLeft(props.month)} 月`)
    expect(wrapper.find('.months-range .dropdown-item').first().text())
      .toEqual(`01 月`)
  })

  it('click the year&month item, should trigger the right status change', () => {
    wrapper.find(btnClassName).simulate('click', { preventDefault: () => {} })
    wrapper.find('.years-range .dropdown-item').first().simulate('click', { preventDefault: () => {} })
    expect(wrapper.state('selectedYear')).toEqual(props.year - 5)
    expect(wrapper.find('.years-range .dropdown-item').first().hasClass('active')).toEqual(true)
    wrapper.find('.months-range .dropdown-item').first().simulate('click', { preventDefault: () => {} })
    expect(props.onChange).toHaveBeenCalledWith(props.year - 5, 1)
    expect(wrapper.find('.dropdown-menu').length).toEqual(0)
    expect(wrapper.state('isOpen')).toEqual(false)
  })

  // 这里需要一些特殊的方法，模拟一个事件对象
  it('after the dropdown is shown, click the document should close the dropdown', () => {
    let eventMap = {}
    document.addEventListener = jest.fn((event, cb) => {
      eventMap[event] = cb
    })
    console.log('eventMap', eventMap)
    wrapper = mount(<MonthPicker { ...props } />)
    wrapper.find('.dropdown-toggle').simulate('click')
    expect(wrapper.state('isOpen')).toEqual(true)
    expect(wrapper.find('.dropdown-menu').length).toEqual(1)
    // 先模拟一个当前组件上的点击，期待 dropdown不关闭
    eventMap.click({
      target: ReactDOM.findDOMNode(wrapper.instance())
    })
    expect(wrapper.state('isOpen')).toEqual(true)
    // 再模拟一个document的点击，期待 dropdown 正常关闭
    eventMap.click({
      target: document
    })
    expect(wrapper.state('isOpen')).toEqual(false)
  })
})