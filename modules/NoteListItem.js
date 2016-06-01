import React from 'react'
import Moment from 'moment'
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
      containerClassName = 'item note-list-item active';
    } else {
      containerClassName = 'item note-list-item';
    }

    var now = Moment.utc();
    var updated = Moment(new Date(this.props.data.updated_date));
    var updatedHumanized = Moment.duration(now - updated).humanize() + ' ago';

    return (
        <div className={containerClassName}>
          <NavLink to={to} className="content">
            <h4 className="header">{this.props.data.title}</h4>
            <div className="meta">
              <span>{updatedHumanized}</span>
            </div>
            <div className="description" dangerouslySetInnerHTML={this.contentHTML()}/>
            <div className="extra">
              <div className="ui tag labels">
                {this.props.data.labels.map(function (label) {
                  return (<div key={label.id} className="ui label">{label.title}</div>);
                }.bind(this))}
              </div>
            </div>
          </NavLink>
        </div>
    )
  }
})
