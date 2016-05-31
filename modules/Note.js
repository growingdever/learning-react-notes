import React from 'react'
import NavLink from './NavLink'


export default React.createClass({
  contentHTML() {
    let content = this.props.data.content;
    content = content.replace(/<[^>]*>/g, '');

    let suffix = '';
    if (content.length > 100) {
      suffix = '...';
    }

    content = content.substring(0, 100) + suffix;

    return {
      __html: content
    };
  },
  render() {
    let to = '/notes/' + this.props.data.id;
    let query = {};
    if (this.props.label) {
      query.label = this.props.label;
    }

    return (
      <NavLink to={{ pathname: to, query: query }} className="note-list-item" onlyActiveOnIndex>
        <div className="ui piled segment">
          <h4 className="ui header">{this.props.data.title}</h4>
          <div dangerouslySetInnerHTML={this.contentHTML()} />
        </div>
      </NavLink>
    )
  }
})
