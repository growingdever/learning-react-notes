import React from 'react'
import NavLink from './NavLink'


export default React.createClass({
  render() {
    let to = '/notes/' + this.props.data.id;
    let query = {};
    if (this.props.label) {
      query.label = this.props.label;
    }

    return (
      <NavLink to={{ pathname: to, query: query }} onlyActiveOnIndex>
        <h4>{this.props.data.title}</h4>
        <div>
          {this.props.data.content}
        </div>
        <ul>
          {this.props.data.labels.map(function (label) {
            return <li key={label.id}>{label.title}</li>;
          })}
        </ul>
      </NavLink>
    )
  }
})
