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
    var url = 'http://localhost:5000/api/labels';
    jQuery.ajax({
      url: url,
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ title: this.state.new_label_name }),
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
      <div className="four wide column">
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
