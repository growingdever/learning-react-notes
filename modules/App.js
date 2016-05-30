import React from 'react'
import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
      <div className="ui container">
        <ul role="nav">
          <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/notes/1">Notes</NavLink></li>
        </ul>

        <div style={{"marginTop": "10px"}}>
          {this.props.children}
        </div>
      </div>
    )
  }
})
