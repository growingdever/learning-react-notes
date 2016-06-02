import React from 'react'
import { Link } from 'react-router'
import jQuery from 'jquery'
import Label from './Label'
import CreateLabelModal from './CreateLabelModal'
import ModifyLabelTitleModal from './ModifyLabelTitleModal'
import DeleteLabelModal from './DeleteLabelModal'


export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  
  getInitialState() {
    return {
      data: []
    };
  },
  componentDidMount() {
    this.loadLabelsFromServer();
  },
  loadLabelsFromServer() {
    var url = 'http://localhost:5000/api/labels';
    jQuery.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function (response) {
        this.setState({data: response.items});

        if (this.props.onLoadLabels) {
          this.props.onLoadLabels(response.items);
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  onClickCreateLabel() {
    $('.ui.modal.new-label')
        .modal({detachable: false})
        .modal('show');
  },
  onClickModifyTitle(label) {
    $('.ui.modal.modify-label-title')
        .modal({detachable: false})
        .modal('show');
    
    this.setState({targetModifyLabel: label});
  },
  onModifyLabel(label) {
    this.props.onModifyLabel(label);
  },
  onClickDelete(label) {
    $('.ui.modal.delete-label')
        .modal({detachable: false})
        .modal('show');

    this.setState({targetDeleteLabel: label});
  },
  onDeleteLabel(label) {
    this.props.onDeleteLabel(label);
  },
  render() {
    let allLabelClassName = 'ui tag label';
    if (this.props.currentLabel == undefined) {
      allLabelClassName += ' blue';
    }

    return (
      <div className="four wide column">
        <button type="button" className="ui fluid green basic button" onClick={this.onClickCreateLabel}>
          라벨 생성
        </button>

        <CreateLabelModal onCreateLabel={this.loadLabelsFromServer}/>
        <ModifyLabelTitleModal label={this.state.targetModifyLabel} onSuccess={this.loadLabelsFromServer}/>
        <DeleteLabelModal label={this.state.targetDeleteLabel} onSuccess={this.loadLabelsFromServer}/>

        <div className="ui relaxed divided list">
          <div className="item">
            <Link to="/" className={allLabelClassName}>모든 메모</Link>
          </div>
          {this.state.data.map(function (label) {
            return (
              <Label
                  key={label.id}
                  active={label.title == this.props.currentLabel}
                  label={label}
                  onClickModifyTitle={this.onClickModifyTitle}
                  onClickDelete={this.onClickDelete}
              />
            );
          }.bind(this))}
        </div>

        {this.props.children}
      </div>
    )
  }
})
