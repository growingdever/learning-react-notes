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
      edited: {
        title: null,
        content: null
      },
      selectedLabels: [],
      totalLabels: []
    }
  },
  componentDidMount() {
    // TODO : not working for jQuery('$' is loaded by index.html)
    $('.ui.dropdown.label-selection').dropdown({
      onChange: this.onChangeSelectedLabels
    });
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      let labelIds = nextProps.data.labels.map(label => String(label.id));
      labelIds.sort();

      let prevSelectedLabels = this.state.selectedLabels;
      for (let prevSelectedLabel of prevSelectedLabels) {
        if (labelIds.indexOf(prevSelectedLabel) == -1) {
          let selectorQuery = '.ui.dropdown.label-selection > a[data-value="' + prevSelectedLabel + '"]';
          $(selectorQuery).remove();
        }
      }

      this.setState({
        data: nextProps.data,
        edited: {
          title: nextProps.data.title,
          content: nextProps.data.content
        },
        selectedLabels: labelIds
      });
      // TODO : is it correct way?
      this.state.data = nextProps.data;
      this.state.edited = {title: nextProps.data.title, content: nextProps.data.content};
      this.state.selectedLabels = labelIds;

      $('.ui.dropdown.label-selection')
          .dropdown('clear')
          .dropdown('set selected', labelIds);

      // update already selected label's title
      for (var prevLabel of this.state.totalLabels) {
        for (var newLabel of nextProps.totalLabels) {
          if (prevLabel.id == newLabel.id && prevLabel.title != newLabel.title) {
            var selectorQuery = '.ui.dropdown.label-selection > a[data-value="' + prevLabel.id + '"]';
            var elem = $(selectorQuery);
            if (elem) {
              elem.text(newLabel.title);
            }
          }
        }
      }

      this.updateMode();
    }

    this.setState({
      currentLabel: nextProps.currentLabel,
      totalLabels: nextProps.totalLabels
    });
  },
  handleChangeTitle(e) {
    this.setState({
      edited: {
        title: e.target.value,
        content: this.state.edited.content
      }
    });
    // TODO : is it correct way?
    this.state.edited.title = e.target.value;

    this.updateMode();
  },
  onChangeEditorContent(content) {
    this.setState({
      edited: {
        title: this.state.edited.title,
        content: content
      }
    });
    // TODO : is it correct way?
    this.state.edited.content = content;

    this.updateMode();
  },
  onChangeSelectedLabels(value) {
    if (value == '') {
      value = []
    }

    value.sort();

    this.setState({
      selectedLabels: value
    });
    // TODO : is it correct way?
    this.state.selectedLabels = value;

    this.updateMode();
  },
  updateMode() {
    let prevSelectedLabels = this.state.data.labels.map(label => String(label.id));
    let currentSelectedLabels = this.state.selectedLabels;

    let cond1 = this.state.data.title == this.state.edited.title;
    let cond2 = this.state.data.content == this.state.edited.content;
    let cond3 = prevSelectedLabels.length == currentSelectedLabels.length
        && prevSelectedLabels.every((v, i) => v === currentSelectedLabels[i]);

    if (cond1 && cond2 && cond3) {
      this.setState({mode: 'read'});
    } else {
      let mode = 'edit';
      if (!this.state.data.id) {
        mode = 'new';
      }
      this.setState({mode: mode});
    }
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
        title: this.state.edited.title,
        content: this.state.edited.content,
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
        title: this.state.edited.title,
        content: this.state.edited.content,
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
                value={this.state.edited.title}
                onChange={this.handleChangeTitle}
              />
            </div>
          </div>
          <div className="right floated four wide column">
            <div className="mini right floated ui buttons">
              {controlButtons}
            </div>
          </div>
        </div>

        {selections}

        <RichStyleEditor
          id={this.state.data.id}
          content={this.state.edited.content}
          onChangeContent={this.onChangeEditorContent}
        />
      </div>
    )
  }
})
