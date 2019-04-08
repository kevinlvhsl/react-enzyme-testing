import React from 'react'
import Ionicon from 'react-ionicons'
import { Colors } from '../utility'

export default () => (
  <div className="loading-com text-center">
    <Ionicon
      icon="ios-refresh"
      rotate
      fontSize="40px"
      color={Colors.blue}
    />
    <h6>加载中...</h6>
  </div>
)