import React from 'react'
import { mount, shallow } from 'enzyme'
import TotalPrice from '../TotalPrice'

const props = {
  income: 100,
  outcome: 200
}

describe('test TotalPrice component', () => {
  it('component showld render correct inome&outcome number', () => {
    const wrapper = shallow(<TotalPrice { ...props } />)
    expect(wrapper.find('.income span').text() * 1).toEqual(props.income)
    expect(wrapper.find('.outcome span').text() * 1).toEqual(props.outcome)
  })
})
