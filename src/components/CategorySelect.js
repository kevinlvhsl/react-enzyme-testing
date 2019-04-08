import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Ioniton from 'react-ionicons'
import { Colors } from '../utility'

export default class CategorySelect extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    selectedCategory: PropTypes.object,
    onSelect: PropTypes.func.isRequired
  }
  selectCategory = (event, category) => {
    if (this.props.selectedCategory && this.props.selectedCategory.id === category.id) return
    event.preventDefault()
    this.props.onSelect(category)
  }
  render() {
    const { selectedCategory, categories } = this.props
    const selectedId = selectedCategory && selectedCategory.id
    return (
      <div className="category-select-component">
        <div className="row">
          {
            categories.map((category, index) => {
              const iconColor = (category.id === selectedId) ? Colors.white : Colors.gray
              const backColor = (category.id === selectedId) ? Colors.blue : Colors.white
              const activeClassName = (category.id === selectedId) ? 'category-item col-3 active' : 'category-item col-3'
              return (
                <div className={activeClassName} key={category.id}
                  style={{ textAlign: 'center'}} role="button"
                  onClick={e => this.selectCategory(e, category)}>
                  <Ioniton
                    className="rounded-circle"
                    color={iconColor}
                    style={{backgroundColor: backColor, padding: '5px'}}
                    icon={category.iconName}
                    fontSize="50px"
                  />
                  <p>{category.name}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
