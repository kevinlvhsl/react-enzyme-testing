import React, { Component } from 'react'
import PropTypes from 'prop-types'
/**
 * 接受内容展示
 * 有一个默认选中项
 */
export class Tabs extends Component {
  static propTypes = {
    activeIndex: PropTypes.number,
    onTabChange: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      // activeIndex: props.activeIndex || 0
    }
  }
  changeTab = (e, index) => {
    e.preventDefault()
    if (this.props.activeIndex === index) return

    // this.setState({ activeIndex: index })
    this.props.onTabChange(index)
  }
  render() {
    const children = this.props.children
    const { activeIndex } = this.props
    return (
      <ul className="nav nav-tabs nav-fill my-4">
        {
          React.Children.map(children, (child, index) => {
            const activeClassName = index === activeIndex ? 'nav-link active' : 'nav-link'
            return (<li className="nav-item">
              <a href="#"
                onClick={(e) => {this.changeTab(e, index)}}
                className={activeClassName}
                role="button"
              >
              {child}
              </a>
            </li>)
          })
        }
      </ul>
    )
  }
}

export const Tab = ({ children }) =>
  (<React.Fragment>{children}</React.Fragment>)