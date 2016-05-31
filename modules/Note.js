import React from 'react'

export default React.createClass({
  onClick(e) {
    this.props.onClick(this.props.data);
  },
  render() {
    return (
      <a className="item" onClick={this.onClick}>
        <h4>{this.props.data.title}</h4>
        <div>
          {this.props.data.content}
        </div>
        <ul>
          {this.props.data.labels.map(function (label) {
            return <li key={label.id}>{label.title}</li>;
          })}
        </ul>
      </a>
    )
  }
})
