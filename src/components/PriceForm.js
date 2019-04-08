import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isValidDate } from '../utility'
export default class PriceForm extends Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    onFormCancel: PropTypes.func,
    item: PropTypes.object
  }
  static defaultProps = {
    item: { title: '' }
  }
  state = {
    validatePass: true,
    errorMessage: ''
  }
  componentWillUnmount() {
    this.clearForm()
  }
  validation (cb) {
    const title = this.titleInput.value.trim()
    const date = this.dateInput.value.trim()
    const price = this.priceInput.value.trim() * 1
    if (title && price && date) {
      if (price < 0 || isNaN(price)) {
        this.setState({
          validatePass: false,
          errorMessage: '价格数字必须大于0'
        })
      } else if (!isValidDate(date)) {
        this.setState({
          validatePass: false,
          errorMessage: '请填写正确的日期格式'
        })
      } else {
        this.setState({
          validatePass: true,
          errorMessage: ''
        })
        cb({ title, price, date })
      }
    } else {
      this.setState({
        validatePass: false,
        errorMessage: '所有选项都必须填写'
      })
    }
  }
  sumbitForm = (event) => {
    event.preventDefault()
    const { onFormSubmit, item } = this.props
    this.validation((data) => {
      if (item && item.id) {
        onFormSubmit({ ...item, ...data }, true)
      } else {
        onFormSubmit({ ...data }, false)
      }
    })
  }
  clearForm = () => {
    this.titleInput.value = ''
    this.dateInput.value = ''
    this.priceInput.value = ''
  }
  cancelForm = (e) => {
    this.clearForm()
    e.preventDefault()
    this.props.history.push('/')
  }
  render() {
    const { title, price, date } = this.props.item
    return (
      <form onSubmit={(event) => {this.sumbitForm(event)}}>
        <div className="form-group">
          <label htmlFor="title">标题 *</label>
          <input
            className="form-control" id="title"
            ref={t => this.titleInput = t}
            defaultValue={title}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">金额 *</label>
          <input
            className="form-control" id="price" type="number"
            ref={t => this.priceInput = t}
            defaultValue={price}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">日期 *</label>
          <input
            className="form-control" id="date" type="date"
            ref={t => this.dateInput = t}
            defaultValue={date}
          />
        </div>
        {
          (!this.state.validatePass && this.state.errorMessage) && <div className="alert alert-danger mt-5" role="alert">
            { this.state.errorMessage }
          </div>
        }
        <div className="form-group">
          <button className="btn btn-primary btn-submit mr-3"
            type="submit"
            onClick={this.sumbitForm}
          >提交</button>
          <button className="btn btn-secondary" onClick={this.cancelForm}>取消</button>
        </div>
      </form>
    )
  }
}
