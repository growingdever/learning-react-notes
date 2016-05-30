import React from 'react'
import RichStyleEditor from './rich-style-editor/RichStyleEditor'


export default React.createClass({
  onChangeEditorContent(content) {
    console.log(content);
  },
  render() {
    return (
      <div className="eight wide column">
        <div className="ui grid note detail top">
          <div className="twelve wide column">
            <div className="ui huge transparent fluid input">
              <input type="text" placeholder="제목을 입력해주세요"/>
            </div>
          </div>
          <div className="right floated four wide column">
            <div className="mini right floated ui buttons">
              <button className="ui green basic button">수정</button>
              <button className="ui red basic button">삭제</button>
            </div>
          </div>
        </div>
        <RichStyleEditor onChangeContent={this.onChangeEditorContent}/>
      </div>
    )
  }
})
