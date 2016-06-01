import React from 'react'
import jQuery from 'jquery'
import NoteListItem from './NoteListItem'
import NoteDetail from './NoteDetail'


export default React.createClass({
  getInitialState() {
    return {
      data: [],
      currentLabel: this.props.currentLabel,
      totalLabels: []
    };
  },
  loadNotesFromServer(label) {
    var url = 'http://localhost:5000/api/notes';
    if (label) {
      label = label.replace(' ', '+');
      url += '?label=' + label;
    }

    jQuery.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(response) {
        let nextState = {
          data: response.items
        };

        if (this.props.noteId) {
          nextState.selectedNote = response.items.find(note => note.id == this.props.noteId);
        }
        if (nextState.selectedNote == null && response.items.length > 0) {
          nextState.selectedNote = response.items[0];
        }

        this.setState(nextState);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount() {
    this.loadNotesFromServer(this.state.currentLabel);
  },
  componentWillReceiveProps(nextProps) {
    let updatedState = {
      currentLabel: nextProps.currentLabel,
      totalLabels: nextProps.totalLabels
    };

    if (nextProps.currentLabel != this.state.currentLabel) {
      this.loadNotesFromServer(nextProps.currentLabel);
    }

    if (nextProps.noteId) {
      updatedState.selectedNote = this.state.data.find(item => item.id == nextProps.noteId);
    }

    this.setState(updatedState);
  },
  onClickCreateNote(e) {
    this.setState({
      selectedNote: {
        title: '',
        content: '',
        labels: []
      }
    });
  },
  onClickItem(note) {
    this.setState({selectedNote: note});
  },
  onSaveNote(note) {
    let data = this.state.data;
    let targetIndex = data.findIndex(item => item.id == note.id);
    data[targetIndex] = note;

    this.setState({
      data: data,
      selectedNote: note
    });
  },
  onCreateNote(data) {
    this.setState({
      data: data,
      selectedNote: data[0]
    });
  },
  onRemoveNote() {
    this.loadNotesFromServer(this.state.currentLabel);
  },
  render() {
    return (
      <div className="twelve wide column">
        <div className="ui grid">
          <div className="six wide column">
            <button type="button" className="ui fluid blue basic button" onClick={this.onClickCreateNote}>
              새로운 메모 작성
            </button>

            <div className="ui divided link items">
              {this.state.data.map(function (note) {
                return (
                    <NoteListItem
                        key={note.id}
                        data={note}
                        label={this.state.currentLabel}
                        onClick={this.onClickItem}
                    />
                );
              }.bind(this))}
            </div>

            {this.props.children}
          </div>
          <div className="ten wide column">
            <NoteDetail
              data={this.state.selectedNote}
              currentLabel={this.state.currentLabel}
              totalLabels={this.state.totalLabels}
              onSaveNote={this.onSaveNote}
              onCreateNote={this.onCreateNote}
              onRemoveNote={this.onRemoveNote}
            />
          </div>
        </div>
      </div>
    )
  }
})
