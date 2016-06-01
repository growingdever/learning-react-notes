import React from 'react'


export default React.createClass({
  getInitialState() {
    return {
      newLabelTitle: null
    };
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.label) {
      this.setState({
        label: nextProps.label,
        newLabelTitle: nextProps.label.title
      });
    }
  },
  handleLabelTitleChange(e) {
    this.setState({newLabelTitle: e.target.value});
  },
  onClickApprove() {
    var url = 'http://localhost:5000/api/labels/' + this.state.label.id;
    jQuery.ajax({
      url: url,
      method: 'PUT',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        title: this.state.newLabelTitle
      }),
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
        <div className="ui small modal modify-label-title">
          <div className="content">
            <div className="description">
              <div className="ui fluid transparent left icon input">
                <i className="tags icon"></i>
                <input
                    type="text"
                    placeholder="새로운 라벨 이름을 입력하세요."
                    value={this.state.newLabelTitle}
                    onChange={this.handleLabelTitleChange}/>
              </div>
            </div>
          </div>
          <div className="actions">
            <div className="ui negative button">취소</div>
            <div className="ui positive button" onClick={this.onClickApprove}>수정</div>
          </div>
        </div>
    )
  }
})
