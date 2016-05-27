import React from 'react'

export default React.createClass({
  render() {
    return (
      <li>
        <h2>{this.props.data.title}</h2>
      </li>
    )
  }
})
