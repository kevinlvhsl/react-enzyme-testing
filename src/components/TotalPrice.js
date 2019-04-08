import React from 'react'
import PropTypes from 'prop-types'

const TotalPrice = ({ income, outcome}) => {
  return (
    <div className="row">
      <h2 className="income">
        <label>收入： </label><span className="col">{ income }</span>
      </h2>
      <h2 className="outcome">
      <label>支出： </label><span className="col">{ outcome }</span>
      </h2>
    </div>
  )
}
TotalPrice.propTypes = {
  income: PropTypes.number.isRequired,
  outcome: PropTypes.number.isRequired
}

  export default TotalPrice
