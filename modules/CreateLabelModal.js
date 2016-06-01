import React from 'react'


export default React.createClass({
  getInitialState() {
    return {
      labelTitle: null
    };
  },
  handleLabelTitleChange(e) {
    this.setState({labelTitle: e.target.value});
  },
  onClickCreateLabel() {
    var url = 'http://localhost:5000/api/labels';
    jQuery.ajax({
      url: url,
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ title: this.state.labelTitle }),
      cache: false,
      success: function (response) {
        this.setState({labelTitle: null});
        if (this.props.onCreateLabel) {
          this.props.onCreateLabel();
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  render() {
    return (
        <div className="ui small modal new-label">
          <div className="content">
            <div className="description">
              <div className="ui fluid transparent left icon input">
                <i className="tags icon"></i>
                <input
                    type="text"
                    placeholder="새로운 라벨 이름을 입력하세요."
                    value={this.state.labelTitle}
                    onChange={this.handleLabelTitleChange}/>
              </div>
            </div>
          </div>
          <div className="actions">
            <div className="ui negative button">취소</div>
            <div className="ui positive button" onClick={this.onClickCreateLabel}>생성</div>
          </div>
        </div>
    )
  }
})
