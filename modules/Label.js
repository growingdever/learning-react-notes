import React from 'react'
import { Link } from 'react-router'


export default React.createClass({
  render() {
    var className = 'ui tag label';
    if (this.props.active) {
      className += ' blue';
    }

    return (
      <div className="item">
        <Link
          to={{ pathname: '/', query: { label: this.props.title } }}
          className={className}>{this.props.title}
        </Link>
      </div>
    )
  }
})
