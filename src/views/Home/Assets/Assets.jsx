import React, { Component } from 'react'
import './assets.scss'
import { Breadcrumb } from 'antd';
import { withRouter , Route, Switch } from 'react-router-dom';
import AssetsIndex from "./AssetsIndex";
import Withdrawal from "./Withdrawal";
import Record from "./Record";
import Details from "./Details";
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
            {this.props.location.pathname.includes('home/assets/withdrawal') && <Breadcrumb.Item>提现</Breadcrumb.Item>}
            {this.props.location.pathname.includes('home/assets/record') && <Breadcrumb.Item>提现记录</Breadcrumb.Item>}
            {this.props.location.pathname.includes('home/assets/details') && <Breadcrumb.Item>账单记录</Breadcrumb.Item>}
          </Breadcrumb>
        </div>
        <Switch>
          <Route  path="/home/assets/index" component={AssetsIndex} />
          <Route  path="/home/assets/withdrawal/:coin" component={Withdrawal} />
          <Route  path="/home/assets/record" component={Record} />
          <Route  path="/home/assets/details" component={Details} />
        </Switch>
      </div>
    )
  }
}
export default withRouter(Assets);
