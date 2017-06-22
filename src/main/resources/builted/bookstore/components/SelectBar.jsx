import React from 'react';
import $ from 'jquery';

export default class SelectBar extends React.Component {
  constructor(props) {
    super(props);
    this.sendAjaxQuery = this.sendAjaxQuery.bind(this);
  }

  sendAjaxQuery() {
    $.ajax({
      type: 'GET',
      DataType: 'json',
      url: 'query',
      data: {
        'province': $('.province').val(),
        'university': $('.university').val(),
        'school': $('.school').val(),
        'major': $('.major').val()
      },
      success: (response => {
        this.props.callback(response);
      })
    });
  }

  render() {
    const selectStyle = {
      boxSizing: 'border-box',
      height: '32px',
      padding: '0 0.5em',
      border: '1px solid #888',
      borderRadius: '3px',
      backgroundColor: '#fff',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right center',
      font: '12px/1.5 Tahoma,Arial,sans-serif'
};
    return (
      <div>
        <div className="section">
          <div className="container">
            <div id="major_location">
              <p>
                所选专业：
                  <select style={selectStyle} className="province" data-first-title="选择省份"></select>&nbsp;&nbsp;
                  <select style={selectStyle} className="university" data-first-title="选择学校"></select>&nbsp;&nbsp;
                  <select style={selectStyle} className="school" data-first-title="选择学院"></select>&nbsp;&nbsp;
                  <select style={selectStyle} className="major" data-first-title="选择专业"></select>
              </p>
              <p><button className="btn btn-default" onClick={this.sendAjaxQuery}>查询</button></p>
            </div>
          </div>
        </div>
      </div>
    );

  }
}
