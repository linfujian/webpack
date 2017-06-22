import React from 'react';
import SelectBar from './SelectBar.jsx';
import PaperInfor from './paperInfor.jsx';

export default class QueryAndShow extends React.Component {
  constructor(props) {
    super(props);
    this.state= {paperInfor: {}};
    this.receiveInfor = this.receiveInfor.bind(this);
  }

  receiveInfor(object) {
    this.setState({paperInfor: object});
  }

  render() {
    return(
      <div>
        <div className="">
          <SelectBar callback={this.receiveInfor} />
        </div>
        <div className="">
          <PaperInfor paper={this.state.paperInfor} />
        </div>
        {/* Footer */}
        <div className="footer">
          <div className="row">
            <div className="col-footer col-md-3 col-xs-6">
              <h3>服务宗旨</h3>
              <ul className="no-list-style footer-navigate-section">
                <li>真实</li>
                <li>诚信</li>
                <li>沟通</li>
              </ul>
            </div>

            <div className="col-footer col-md-3 col-xs-6">
              <h3>购物指南</h3>
              <ul className="no-list-style footer-navigate-section">
                <li><a href="">购物流程</a></li>
                <li><a href="">售后服务</a></li>
                <li><a href="">联系客服</a></li>
                <li><a href="">常见问题</a></li>
              </ul>
            </div>

            <div className="col-footer col-md-3 col-xs-6">
              <h3>支付方式</h3>
              <ul className="no-list-style footer-navigate-section">
                <li><a href="">货到付款</a></li>
                <li><a href="">在线支付</a></li>
                <li><a href="">邮局汇款</a></li>
              </ul>
            </div>

            <div className="col-footer col-md-3 col-xs-6">
              <h3>联系方式</h3>
              <p className="contanct-us-details">
                <b>地址：</b>上海市闵行区莘庄镇xx号<br/>
                <b>电话：</b>18516580543<br/>
                <b>Email:</b><a href="mailto:linfujian1999@sina.com">linfujian1999@sina.com</a>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="footer-copyright">
                &copy; 2017 yanjiuseng. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
