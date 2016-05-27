import React from 'react'

export default React.createClass({
  render() {
    var id = this.props.params.id;
    var title = "note " + id;
    var content = "note note note note " + id;

    return (
      <div>
        <h2>{title}</h2>
        <p>
          {content}
        </p>
      </div>
    )
  }
})
