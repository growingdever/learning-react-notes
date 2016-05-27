import React from 'react'
import Note from './Note'
import jQuery from 'jquery'


export default React.createClass({
  getInitialState: function () {
    return {
      data: []
    };
  },
  componentDidMount: function() {
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
  render() {
    return (
      <div>
        <h2>Notes</h2>
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
