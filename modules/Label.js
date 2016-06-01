import React from 'react'
import { Link } from 'react-router'


export default React.createClass({
  onClickModifyTitleButton() {
    if (this.props.onClickModifyTitle) {
      this.props.onClickModifyTitle(this.props.label);
    }
  },
  onClickDelete() {
    if (this.props.onClickDelete) {
      this.props.onClickDelete(this.props.label);
    }
  },
  render() {
    let className = 'ui tag label';
    if (this.props.active) {
      className += ' blue';
    }

    let buttons = null;
    if (!this.props.active) {
      buttons = (
        <div className="item right floated">
          <div className="ui mini basic icon buttons">
            <button className="ui button" onClick={this.onClickModifyTitleButton}><i className="write icon"></i></button>
            <button className="ui button" onClick={this.onClickDelete}><i className="trash icon"></i></button>
          </div>
        </div>
      );
    }

    return (
      <div className="item">
        <div className="item left floated">
          <Link
            to={{ pathname: '/', query: { label: this.props.label.title } }}
            className={className}>{this.props.label.title}
          </Link>
        </div>
        {buttons}
      </div>
    )
  }
})
