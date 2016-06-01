import React from 'react'


export default React.createClass({
  getInitialState() {
    return {
      label: {
        title: ''
      }
    };
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.label) {
      this.setState({label: nextProps.label});
    }
  },
  onClickApprove() {
    var url = 'http://localhost:5000/api/labels/' + this.state.label.id;
    jQuery.ajax({
      url: url,
      method: 'DELETE',
      dataType: 'json',
      cache: false,
      success: function (response) {
        if (this.props.onSuccess) {
          this.props.onSuccess();
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  render() {
    return (
        <div className="ui small modal delete-label">
          <div className="content">
            <div className="description">
              <b>{this.state.label.title}</b> 라벨을 정말 삭제하시겠습니까?
            </div>
          </div>
          <div className="actions">
            <div className="ui negative button">취소</div>
            <div className="ui positive button" onClick={this.onClickApprove}>삭제</div>
          </div>
        </div>
    )
  }
})
