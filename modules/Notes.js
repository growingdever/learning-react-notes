import React from 'react'
import jQuery from 'jquery'
import NoteListItem from './NoteListItem'
import NoteDetail from './NoteDetail'


export default React.createClass({
  getInitialState() {
    return {
      data: [],
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
    this.loadNotesFromServer(this.props.currentLabel);
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
  onRemoveNote() {
    this.loadNotesFromServer(this.state.currentLabel);
  },
  render() {
    return (
      <div className="twelve wide column">
        <div className="ui grid">
          <div className="six wide column">
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
              totalLabels={this.state.totalLabels}
              onSaveNote={this.onSaveNote}
              onRemoveNote={this.onRemoveNote}
            />
          </div>
        </div>
      </div>
    )
  }
})
