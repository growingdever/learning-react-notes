import React from 'react'
import Labels from './Labels'
import Notes from './Notes'


export default React.createClass({
  getInitialState() {
    return {
      noteId: this.props.params.noteId,
      currentLabel: this.props.location.query.label
    }
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      noteId: nextProps.params.noteId,
      currentLabel: nextProps.location.query.label
    });
  },
  onLoadLabels(labels) {
    this.setState({totalLabels: labels});
  },
  onModifyLabel(modifiedLabel) {
    let prevTotalLabels = this.state.totalLabels;
    let target = prevTotalLabels.find(label => label.id == modifiedLabel.id);
    target.title = modifiedLabel.title;
    this.setState({totalLabels: prevTotalLabels});
  },
  render() {
    return (
      <div className="ui grid">
        <Labels
          currentLabel={this.state.currentLabel}
          onLoadLabels={this.onLoadLabels}
        />
        <Notes
          noteId={this.state.noteId}
          currentLabel={this.state.currentLabel}
          totalLabels={this.state.totalLabels}
        />
      </div>
    )
  }
})
