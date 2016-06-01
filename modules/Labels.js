import React from 'react'
import { Link } from 'react-router'
import Label from './Label'
import jQuery from 'jquery'


export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  
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
        if (this.props.onLoadLabels) {
          this.props.onLoadLabels(response.items);
        }
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
    let allLabelClassName = 'ui tag label';
    if (this.props.label == undefined) {
      allLabelClassName += ' blue';
    }

    return (
      <div className="four wide column">
        <input
          type="text"
          placeholder="New label name"
          value={this.state.new_label_name}
          onChange={this.handleNewLabelNameChange}/>
        <button type="button" onClick={this.createLabel}>Create</button>

        <div className="ui relaxed divided list">
          <div className="item">
            <Link to="/" className={allLabelClassName}>모든 메모</Link>
          </div>
          {this.state.data.map(function (label) {
            let active = false;
            if (label.title == this.props.label) {
              active = true;
            }

            return (
              <Label key={label.id} active={active} title={label.title}/>
            );
          }.bind(this))}
        </div>

        {this.props.children}
      </div>
    )
  }
})
