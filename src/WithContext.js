import React from 'react'
export const Context = React.createContext()

const withContext = (WrapperComponent) => {
  return (props) => (
    <Context.Consumer>
    {
      ({ state, actions }) => {
        return (<WrapperComponent { ...props } data={ state } actions={ actions } />)
      }
    }
    </Context.Consumer>
  )
}

export default withContext