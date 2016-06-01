import React from 'react'
import Labels from './Labels'
import Notes from './Notes'


export default React.createClass({
  getInitialState() {
    return {
      noteId: this.props.params.noteId,
      label: this.props.location.query.label
    }
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      noteId: nextProps.params.noteId,
      label: nextProps.location.query.label
    });
  },
  onLoadLabels(labels) {
    this.setState({totalLabels: labels});
  },
  render() {
    return (
      <div className="ui grid">
        <Labels
          label={this.state.label}
          onLoadLabels={this.onLoadLabels}
        />
        <Notes
          noteId={this.state.noteId}
          label={this.state.label}
          totalLabels={this.state.totalLabels}
        />
      </div>
    )
  }
})
