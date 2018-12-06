import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import { LocaleProvider } from 'antd';
// 修改antd默认语言
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentWillMount() {
    if (this.props.location.pathname === '/') {
      this.props.history.push('/home/index')
    }
  }

  render() {
    return (
      <div className="App">
        <LocaleProvider locale={zhCN}>
          {this.props.children}
        </LocaleProvider>
      </div>
    );
  }
}

export default withRouter(App);
