import React from 'react'
import RichStyleEditor from './rich-style-editor/RichStyleEditor'


export default React.createClass({
  getInitialState() {
    return {
      data: {
        title: null,
        content: null
      }
    }
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({data: nextProps.data});
    }
  },
  handleChangeTitle(e) {
    this.setState({
      data: {
        title: e.target.value
      }
    });
  },
  onChangeEditorContent(content) {
  },
  render() {
    return (
      <div>
        <div className="ui grid note detail top">
          <div className="twelve wide column">
            <div className="ui huge transparent fluid input">
              <input
                type="text"
                placeholder="제목을 입력해주세요"
                value={this.state.data.title}
                onChange={this.handleChangeTitle}
              />
            </div>
          </div>
          <div className="right floated four wide column">
            <div className="mini right floated ui buttons">
              <button className="ui green basic button">수정</button>
              <button className="ui red basic button">삭제</button>
            </div>
          </div>
        </div>
        <RichStyleEditor
            content={this.state.data.content}
            onChangeContent={this.onChangeEditorContent}
        />
      </div>
    )
  }
})
