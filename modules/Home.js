import React from 'react'
import Labels from './Labels'
import Notes from './Notes'


export default React.createClass({
  render() {
    return (
      <div className="ui grid">
        <Labels/>
        <Notes label={this.props.location.query.label}/>
      </div>
    )
  }
})
