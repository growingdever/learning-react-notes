import React from 'react'
import Note from './Note'
import jQuery from 'jquery'


export default React.createClass({
  getInitialState() {
    return {
      data: []
    };
  },
  componentDidMount() {
    var url = 'http://localhost:5000/api/notes';
    jQuery.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(response) {
        this.setState({data: response.items});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
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
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  render() {
    return (
      <div>
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

        <ul>
          {this.state.data.map(function (note) {
            return <Note key={note.id} data={note}/>;
          })}
        </ul>

        {this.props.children}
      </div>
    )
  }
})
