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
      onChange: this.onSelectLabel
    });
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({data: nextProps.data});

      if (nextProps.data.id) {
        this.setState({mode: 'read'});

        if (this.state.data.id != nextProps.data.id) {
          this.setState({selectedLabels: nextProps.data.labels.map(label => String(label.id))});
        }

        $('.ui.dropdown.label-selection')
            .dropdown('clear')
            .dropdown('set selected', nextProps.data.labels.map(label => String(label.id)));
      } else {
        this.setState({
          mode: 'new',
          selectedLabels: []
        });
        
        $('.ui.dropdown.label-selection')
            .dropdown('clear');
      }
    }

    this.setState({
      currentLabel: nextProps.currentLabel,
      totalLabels: nextProps.totalLabels
    });
  },
  onFocusInput(e) {
    if (this.state.mode != 'new') {
      this.setState({mode: 'edit'});
    }
  },
  onBlurInput(e) {
    if (this.state.mode != 'new') {
      this.setState({mode: 'read'});
    }
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
  onClickCreate(e) {
    var url = 'http://localhost:5000/api/notes';
    if (this.state.currentLabel) {
      url += '?label=' + this.state.currentLabel.replace(' ', '+');
    }

    jQuery.ajax({
      url: url,
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        title: this.state.data.title,
        content: this.state.data.content,
        label_ids: this.state.selectedLabels.map(label => Number.parseInt(label))
      }),
      cache: false,
      success: function (response) {
        if (this.props.onCreateNote) {
          this.props.onCreateNote(response.items);
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
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
  onClickRemove(e) {
    var url = 'http://localhost:5000/api/notes/' + this.state.data.id;
    jQuery.ajax({
      url: url,
      method: 'DELETE',
      dataType: 'json',
      cache: false,
      success: function (response) {
        if (this.props.onRemoveNote) {
          this.props.onRemoveNote();
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  onSelectLabel(value) {
    if (value == '') {
      value = []
    }

    this.setState({
      selectedLabels: value
    });
  },
  render() {
    let controlButtons = null;
    if (this.state.mode == 'read') {
      controlButtons = (<button className="ui red basic button" onClick={this.onClickRemove}>삭제</button>);
    } else if (this.state.mode == 'edit') {
      controlButtons = (<button className="ui green basic button" onClick={this.onClickSave}>저장</button>);
    } else if (this.state.mode == 'new') {
      controlButtons = (<button className="ui green basic button" onClick={this.onClickCreate}>생성</button>);
    }

    let selections = (
        <select name="labels"
                multiple
                className="ui fluid selection dropdown label-selection">
          {this.state.totalLabels.map(function (label) {
            return (<option key={label.id} value={label.id}>{label.title}</option>);
          }.bind(this))}
        </select>);

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
                onFocus={this.onFocusInput}
                onBlur={this.onBlurInput}
              />
            </div>
          </div>
          <div className="right floated four wide column">
            <div className="mini right floated ui buttons">
              {controlButtons}
            </div>
          </div>
        </div>

        <div onFocus={this.onFocusInput}
          onBlur={this.onBlurInput}>
          {selections}

          <RichStyleEditor
            id={this.state.data.id}
            content={this.state.data.content}
            onChangeContent={this.onChangeEditorContent}
          />
        </div>
      </div>
    )
  }
})
