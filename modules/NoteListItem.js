import React from 'react'
import NavLink from './NavLink'


export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

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
    let pathname = '/notes/' + this.props.data.id;
    let query = {};
    if (this.props.label) {
      query.label = this.props.label;
    }

    let to = {pathname, query};

    let active = this.context.router.isActive(to, true);
    let containerClassName;
    if (active) {
      containerClassName = 'ui blue segment';
    } else {
      containerClassName = 'ui segment';
    }

    return (
      <div className={containerClassName}>
        <NavLink to={to} className="note-list-item">
          <h4 className="ui header">{this.props.data.title}</h4>
          <div dangerouslySetInnerHTML={this.contentHTML()} />
        </NavLink>
      </div>
    )
  }
})
