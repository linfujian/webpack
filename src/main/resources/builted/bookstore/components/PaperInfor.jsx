import React from 'react';

export default class paperInfor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {quantity: 1};
    this.changeQuantity = this.changeQuantity.bind(this);
  }

  changeQuantity(e) {
    const quantity = e.target.value;
    this.setState({quantity: quantity});
  }

  render() {
    return (
      <div>
        <div className="section section-breadcrumbs">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1>专业试题详情</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="container">
            <div className="row">
              {/* Product Image  */}
              <div className="col-sm-6">
                <div className="product-image-large">
                  <img src="resources/lib/img/product1.jpg"></img>
                </div>
              </div>
              {/* product Summary & Options */}
              <div className="col-sm-6 product-details">
                <h4>{this.props.paper.name}</h4>
                <div className="price">
                  <span className="price-was">￥{this.props.paper.price/0.8}</span>￥{this.props.paper.price}
                </div>
                <h5>迅速一览</h5>
                <p>
                  {this.props.paper.description}
                </p>
                <table className="shop-item-selections">
                  <tr>
                    <td><b>供应书店：</b></td>
                    <td>{this.props.paper.author}</td>
                  </tr>
                  <tr>
                    <td><b>更新日期</b></td>
                    <td>{this.props.paper.publishedOn}</td>
                  </tr>
                  <tr>
                    <td><b>购买数量</b></td>
                    <td>
                      <input type="text" className="form-control input-sm input-micro" defaultValue="1" onChange={this.changeQuantity} />
                    </td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>
                      <a href={"addcart/" + this.props.paper.id + "/" + this.state.quantity} className="btn btn"><i className="icon-shopping-cart-white"></i>加入购物车</a>
                    </td>
                  </tr>
                </table>
              </div>
              {/* End Product Summary */}

              {/* Full Description & comments */}
              <div className="col-sm-12">
                <div className="tabbable">
                  <ul className="nav nav-tabs product-details-nav">
                    <li className="active"><a href="#tab1" data-toggle="tab">商品介绍</a></li>
                    <li><a href="#tab2" data-toggle="tab">商品评价</a></li>
                  </ul>
                  {/* Tab Content(full description) */}
                  <div className="tab-content product-detail-info">
                    <div className="tab-pane active" id="tab1">
                      <h4>真题介绍</h4>
                      <p>
                        该真题包括2002-2016的14年的天津大学化工学院生物化工专业的历年真题，来源本校xx书店，真实可靠，共11
                        14份真题，按照标准研究生考试1：1纸质版，附有标准答案
                      </p>
                      <h4>出版书店</h4>
                      <p>XX书店为天津大学校园书店，提供该试题已20余年，经与该书店商量，价格是在书店购买价格的基础上6.5折</p>
                      <h4>真题亮点</h4>
                      <ul>
                        <li>XX书店属于天津大学校园书店，真题真实可靠</li>
                        <li>推广期间，赠送笔记</li>
                        <li>此处做成map形式</li>
                      </ul>
                    </div>
                    {/* Tab Content(Comments) */}
                    <div className="tab-pane" id="tab2">

                    </div>
                  </div>
                </div>
              </div>
              {/* End Full Description & Comments */}
            </div>
          </div>
        </div>
      </div>
    );

  }
}
