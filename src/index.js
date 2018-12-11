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

//redux 和 react-redux（关联react和redux）
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import appStore from './store';
const store = createStore(appStore)

moment.locale('zh-cn');


ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <Provider store={store}>
      <App></App>
    </Provider>
  </LocaleProvider>,
document.getElementById('root'));

serviceWorker.unregister();
