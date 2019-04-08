import React from 'react'
import Ionicon from 'react-ionicons'

import PropTypes from 'prop-types';
const CreateButton = ({ text, onClickHandler }) => {
  return (
    <button className="btn btn-primary btn-block d-flex justify-content-center align-items-center" onClick={(e) => {onClickHandler(e)}}>
      <Ionicon
        className="rounded-circle"
        fontSize="30px"
        color="#fff"
        icon="ios-add-circle"
        beat={true}
      />
      {text}
    </button>
  )
}
CreateButton.propTypes = {
  text: PropTypes.string,
  onClickHandler: PropTypes.func
}
export default CreateButton
