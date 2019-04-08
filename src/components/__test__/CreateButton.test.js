import React from 'react'
import { shallow } from 'enzyme'
import CreateButton from '../CreateButton'
import Ionicon from 'react-ionicons'
const props = {
  text: 'create',
  onClickHandler: jest.fn()
}
let wrapper
describe('test CreateButton component', () => {
  beforeEach(() => {
    wrapper = shallow(<CreateButton {...props } />)
  })
  it('should render the componentto match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('should render the icon correct', () => {
    expect(wrapper.find(Ionicon).length).toEqual(1)
  })
  it('should click trigger props function', () => {
    wrapper.simulate('click')
    expect(props.onClickHandler).toHaveBeenCalled()
  })

})