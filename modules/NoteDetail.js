import React from 'react'
import RichStyleEditor from './rich-style-editor/RichStyleEditor'


export default React.createClass({
  getInitialState() {
    return {
      mode: 'read',
      data: {
        title: null,
        content: null
      }
    }
  },
  componentWillReceiveProps(nextProps) {
    console.log('NoteDetail.componentWillReceiveProps');
    console.log(nextProps);

    if (nextProps.data) {
      this.setState({data: nextProps.data});
    }
  },
  onFocusInput(e) {
    this.setState({mode: 'edit'});
  },
  onBlurInput(e) {
    this.setState({mode: 'read'});
  },
  handleChangeTitle(e) {
    this.setState({
      data: {
        title: e.target.value
      }
    });
  },
  onChangeEditorContent(content) {
    let prevData = this.state.data;
    prevData.content = content;
    this.setState({data: prevData})
  },
  _onClickSave(e) {
    console.log(this.state.data);
  },
  render() {
    let controlButtons = null;
    if (this.state.mode == 'read') {
      controlButtons = (
          <div className="mini right floated ui buttons">
            <button className="ui green basic button">수정</button>
            <button className="ui red basic button">삭제</button>
          </div>
      );
    } else if (this.state.mode == 'edit') {
      controlButtons = (
          <div className="mini right floated ui buttons">
            <button className="ui green basic button" onClick={this._onClickSave}>저장</button>
          </div>
      );
    }

    return (
      <div
        onFocus={this.onFocusInput}
        onBlur={this.onBlurInput}>
        <h5>{this.state.mode}</h5>
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
            {controlButtons}
          </div>
        </div>
        <RichStyleEditor
          id={this.state.data.id}
          content={this.state.data.content}
          onChangeContent={this.onChangeEditorContent}
        />
      </div>
    )
  }
})
