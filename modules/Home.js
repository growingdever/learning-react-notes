import React from 'react'
import Labels from './Labels'
import Notes from './Notes'
import MyEditor from './NoteDetail'

export default React.createClass({
  render() {
    return (
      <div className="ui grid">
        <Labels/>
        <Notes/>
        <MyEditor onChange={this.onEditorChange}/>
      </div>
    )
  }
})
