import React from 'react'

export default React.createClass({
  render() {
    return (
      <div className="ui container">
        <div style={{"marginTop": "10px"}}>
          {this.props.children}
        </div>
      </div>
    )
  }
})
