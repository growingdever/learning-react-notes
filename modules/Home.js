import React from 'react'
import Labels from './Labels'
import Notes from './Notes'

export default React.createClass({
  render() {
    return (
      <div>
        <div>Home</div>
        <Labels/>
        <Notes/>
      </div>
    )
  }
})
