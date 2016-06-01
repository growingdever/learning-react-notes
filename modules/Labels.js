import React from 'react'
import { Link } from 'react-router'
import jQuery from 'jquery'
import CreateLabelModal from './CreateLabelModal'
import Label from './Label'


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

        <div className="ui relaxed divided list">
          <div className="item">
            <Link to="/" className={allLabelClassName}>모든 메모</Link>
          </div>
          {this.state.data.map(function (label) {
            let active = false;
            if (label.title == this.props.currentLabel) {
              active = true;
            }

            return (
              <Label key={label.id} active={active} title={label.title}/>
            );
          }.bind(this))}
        </div>

        {this.props.children}
      </div>
    )
  }
})
