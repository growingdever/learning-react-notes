import React from 'react'
import Label from './Label'
import jQuery from 'jquery'


export default React.createClass({
  getInitialState() {
    return {
      data: []
    };
  },
  componentDidMount() {
    var url = 'http://localhost:5000/api/labels';
    jQuery.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function (response) {
        this.setState({data: response.items});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  handleNewLabelNameChange(e) {
    this.setState({new_label_name: e.target.value});
  },
  createLabel(e) {
    console.log('create ' + this.state.new_label_name);
    var url = 'http://localhost:5000/api/labels';
    jQuery.ajax({
      url: url,
      method: 'POST',
      dataType: 'json',
      cache: false,
      success: function (response) {
        console.log(response);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  render() {
    return (
      <div>
        <h2>Labels</h2>

        <input
          type="text"
          placeholder="New label name"
          value={this.state.new_label_name}
          onChange={this.handleNewLabelNameChange}/>
        <button type="button" onClick={this.createLabel}>Create</button>

        <ul>
          {this.state.data.map(function (label) {
            return <Label key={label.id} data={label}/>;
          })}
        </ul>

        {this.props.children}
      </div>
    )
  }
})
