import React, { Component } from 'react'
import './assets.scss'
import { Breadcrumb } from 'antd';
import { withRouter , Route, Switch } from 'react-router-dom';
import AssetsIndex from "./AssetsIndex";
import Record from "./Record";
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
        <Switch>
          <Route  path="/home/assets/index" component={AssetsIndex} />
          <Route  path="/home/assets/record/:coin" component={Record} />
        </Switch>
      </div>
    )
  }
}
export default withRouter(Assets);
