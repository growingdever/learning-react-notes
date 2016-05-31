import React from 'react'
import Note from './Note'
import jQuery from 'jquery'
import MyEditor from './NoteDetail'


export default React.createClass({
  getInitialState() {
    return {
      data: [],
      label: this.props.label
    };
  },
  loadNotesFromServer(label) {
    var url = 'http://localhost:5000/api/notes';
    if (label) {
      url += '?label=' + label;
    }

    console.log(url);

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
      label: nextProps.label
    };

    if (nextProps.label != this.state.label) {
      this.loadNotesFromServer(nextProps.label);
    } else {
      updatedState.selectedNote = this.state.data.find(item => item.id == nextProps.noteId);
    }

    this.setState(updatedState);
  },
  handleNewNoteTitleChange(e) {
    this.setState({new_note_title: e.target.value});
  },
  handleNewNoteContentChange(e) {
    this.setState({new_note_content: e.target.value});
  },
  createNote(e) {
    var url = 'http://localhost:5000/api/notes';
    jQuery.ajax({
      url: url,
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        title: this.state.new_note_title,
        content: this.state.new_note_content,
        label_ids: []
      }),
      cache: false,
      success: function (response) {
        this.setState({data: response.items});
        if (response.items.length > 0) {
          this.setState({selectedNote: response.items[0]});
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  onClickItem(note) {
    this.setState({selectedNote: note});
    this.forceUpdate();
  },
  render() {
    return (
      <div className="twelve wide column">
        <div className="ui grid">
          <div className="six wide column">
            <h2>Notes</h2>

            <input
              type="text"
              placeholder="New note title"
              value={this.state.new_note_title}
              onChange={this.handleNewNoteTitleChange}/>
            <textarea
              type="text"
              placeholder="New note content"
              value={this.state.new_note_content}
              onChange={this.handleNewNoteContentChange}/>
            <button type="button" onClick={this.createNote}>Create</button>

            <div className="ui list">
              {this.state.data.map(function (note) {
                return <Note key={note.id} data={note} label={this.state.label} onClick={this.onClickItem}/>;
              }.bind(this))}
            </div>

            {this.props.children}
          </div>
          <div className="ten wide column">
            <MyEditor
                data={this.state.selectedNote}
            />
          </div>
        </div>
      </div>
    )
  }
})
