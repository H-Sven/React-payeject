import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import App from './App';

// 修改antd默认语言
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './index.scss';
import * as serviceWorker from './serviceWorker';


moment.locale('zh-cn');


ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <App></App>
  </LocaleProvider>,
document.getElementById('root'));

serviceWorker.unregister();
