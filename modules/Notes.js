import React from 'react'
import jQuery from 'jquery'
import NoteListItem from './NoteListItem'
import NoteDetail from './NoteDetail'


export default React.createClass({
  getInitialState() {
    return {
      data: [],
      label: this.props.label,
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
        if (response.items.length > 0) {
          nextState.selectedNote = response.items[0];
        }

        if (this.props.noteId) {
          nextState.selectedNote = response.items.find(note => note.id == this.props.noteId);
        }

        this.setState(nextState);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount() {
    this.loadNotesFromServer(this.state.label);
  },
  componentWillReceiveProps(nextProps) {
    let updatedState = {
      label: nextProps.label,
      totalLabels: nextProps.totalLabels
    };

    if (nextProps.label != this.state.label) {
      this.loadNotesFromServer(nextProps.label);
    } else {
      updatedState.selectedNote = this.state.data.find(item => item.id == nextProps.noteId);
    }

    this.setState(updatedState);
  },
  onClickItem(note) {
    this.setState({selectedNote: note});
    this.forceUpdate();
  },
  onSaveNote(note) {
    let data = this.state.data;
    let targetIndex = data.findIndex(item => item.id == note.id);
    data[targetIndex] = note;

    this.setState({data: data});
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
                        label={this.state.label}
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
            />
          </div>
        </div>
      </div>
    )
  }
})
