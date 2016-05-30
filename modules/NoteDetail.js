import React from 'react'
import RichStyleEditor from './rich-style-editor/RichStyleEditor'


export default React.createClass({
  onChangeEditorContent(content) {
    console.log(content);
  },
  render() {
    return (
      <div className="eight wide column">
        <h1>
          hello
        </h1>
        <RichStyleEditor onChangeContent={this.onChangeEditorContent}/>
      </div>
    )
  }
})
