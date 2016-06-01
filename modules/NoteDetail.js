import React from 'react'
import jQuery from 'jquery'
import RichStyleEditor from './rich-style-editor/RichStyleEditor'


export default React.createClass({
  getInitialState() {
    return {
      mode: 'read',
      data: {
        id: null,
        title: null,
        content: null,
        labels: []
      },
      selectedLabels: [],
      totalLabels: []
    }
  },
  componentDidMount() {
    // TODO : not working for jQuery('$' is loaded by index.html)
    $('.ui.dropdown.label-selection').dropdown({
      action: 'activate',
      onChange: this.onSelectLabel
    });
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({data: nextProps.data});

      if (this.state.data.id != nextProps.data.id) {
        this.setState({selectedLabels: nextProps.data.labels.map(label => String(label.id))});
      }

      $('.ui.dropdown.label-selection')
          .dropdown('clear')
          .dropdown('set selected', nextProps.data.labels.map(label => String(label.id)));
    }

    if (nextProps.totalLabels) {
      this.setState({totalLabels: nextProps.totalLabels});
    }
  },
  onFocusInput(e) {
    this.setState({mode: 'edit'});
  },
  onBlurInput(e) {
    this.setState({mode: 'read'});
  },
  handleChangeTitle(e) {
    let newData = this.state.data;
    newData.title = e.target.value;

    this.setState({data: newData});
  },
  onChangeEditorContent(content) {
    let newData = this.state.data;
    newData.content = content;

    this.setState({data: newData});
  },
  onClickSave(e) {
    var url = 'http://localhost:5000/api/notes/' + this.state.data.id;
    jQuery.ajax({
      url: url,
      method: 'PUT',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        title: this.state.data.title,
        content: this.state.data.content,
        label_ids: this.state.selectedLabels.map(label => Number.parseInt(label))
      }),
      cache: false,
      success: function (response) {
        let nextState = {
          data: response.item,
          selectedLabels: response.item.labels.map(label => String(label.id))
        };
        this.setState(nextState);

        if (this.props.onSaveNote) {
          this.props.onSaveNote(response.item);
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  onSelectLabel(value) {
    this.setState({
      selectedLabels: value
    });
  },
  render() {
    let controlButtons = null;
    if (this.state.mode == 'read') {
      controlButtons = (
        <div className="mini right floated ui buttons">
          <button className="ui red basic button">삭제</button>
        </div>
      );
    } else if (this.state.mode == 'edit') {
      controlButtons = (
        <div className="mini right floated ui buttons">
          <button className="ui green basic button" onClick={this.onClickSave}>저장</button>
        </div>
      );
    }

    let selections = (
      <select name="labels" multiple className="ui fluid selection dropdown label-selection">
        {this.state.totalLabels.map(function (label) {
          return (<option key={label.id} value={label.id}>{label.title}</option>);
        }.bind(this))}
      </select>);

    return (
      <div
        onFocus={this.onFocusInput}
        onBlur={this.onBlurInput}>
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

        {selections}

        <RichStyleEditor
          id={this.state.data.id}
          content={this.state.data.content}
          onChangeContent={this.onChangeEditorContent}
        />
      </div>
    )
  }
})
