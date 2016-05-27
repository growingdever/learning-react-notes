import React from 'react'

export default React.createClass({
  render() {
    return (
      <li>
        <h2>{this.props.data.title}</h2>
        <p>
          {this.props.data.content}
        </p>
      </li>
    )
  }
})
