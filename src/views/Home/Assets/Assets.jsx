import React, { Component } from 'react'
import './assets.scss'
import { Breadcrumb } from 'antd';
import { withRouter } from 'react-router-dom';
class Assets extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="assets">
        <div className="assets_title">
          <Breadcrumb>
            <Breadcrumb.Item>我的资产</Breadcrumb.Item>
            {this.props.location.pathname.includes('home/assets/record') && <Breadcrumb.Item>提现</Breadcrumb.Item>}
          </Breadcrumb>
        </div>
        {this.props.children}
      </div>
    )
  }
}
export default withRouter(Assets);
