import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { range, padLeft } from '../utility'
export default class MonthPicker extends Component {
  static propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      selectedYear: this.props.year
    }
  }
  componentDidMount () {
    document.addEventListener('click', this.handClick, false)
  }
  componentWillUnmount () {
    document.removeEventListener('click', this.handClick, false)
  }
  handClick = (event) => {
    // 如果事件节点属于 当前组件 则不做处理
    if (this.node.contains(event.target)) return
    this.setState({
      isOpen: false
    })
  }
  selectYear = (e, year) => {
    e.preventDefault()
    console.log(year)
    this.setState({
      selectedYear: year
    })
  }
  selectMonth = (e, month) => {
    e.preventDefault()
    console.log(month)
    this.setState({
      isOpen: false,
    })
    this.props.onChange(this.state.selectedYear, month)
  }
  toggleDropdown = (e) => {
    e.preventDefault()
    this.setState({ isOpen: !this.state.isOpen})
  }
  render() {
    const { year, month } = this.props
    const { isOpen, selectedYear } = this.state
    const monthRange = range(12, 1)
    const yearRange = range(11, -5).map(y => y + year)
    return (
      <div className="dropdown month-picker-component" ref={(ref) => {this.node = ref}}>
        <h5>选择月份</h5>
        <button className="btn btn-secondary dropdown-toggle" onClick={this.toggleDropdown}>
          {year} 年 {month} 月
          <span className="caret"></span>
        </button>
        {
          isOpen &&
            <div className="dropdown-menu" style={{display: 'block'}}>
              <div className="row">
                <div className="col border-right years-range">
                  {
                    yearRange.map((y, index) => (<a
                      key={y}
                      role="button" href="#"
                      onClick={(e) => {this.selectYear(e, y)}}
                      className={(y === selectedYear) ? 'dropdown-item active text-white' : 'dropdown-item'}
                    >{y} 年</a>))
                  }
                </div>
                <div className="col months-range">
                  {
                    monthRange.map((m, index) => (<a
                      key={m}
                      role="button"
                      onClick={(e) => {this.selectMonth(e, m)}}
                      className={(m === month) ? 'dropdown-item active text-white' : 'dropdown-item'}
                    >{padLeft(m)} 月</a>))
                  }
                </div>
              </div>
            </div>
        }
      </div>
    )
  }
}
