import axios from "axios";
import qs from "qs";
import { message} from 'antd';
import utils from './utils';

const api_url = `https://t-api.aipaybox.com/otc/w`;
const www_api_url = 'https://t-api.aipaybox.com/w';
// const router = ['/login'];
const baseUrl = [
  '/user/logout','/user/login',
  '/user/initGtCaptcha','/user/verifyGtCaptcha',
  '/user/getBackLoginPwd','/user/updateLoginPwd',
  '/user/sendEmailCode','/user/checkCode',
  '/user/isBindGa','/user/verifyGA',
  '/user/editNickName'
];

axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;  //请求携带cookie
axios.defaults.crossDomain = true;  //请求携带额外数据(不包含cookie)
axios.defaults.baseURL = api_url; //请求地址baseUrl

//http request 拦截器
axios.interceptors.request.use(
  config => {
    if (config.method === 'post' && config.url.indexOf('addPaymentQRCode') === -1 ) {
      config.data = qs.stringify({
        ...config.data,
        lang: 'zh',
        uid: utils.generateUUID(),
      });
    }else if(config.method === 'get'){
      config.params = {
        ...config.params,
        lang: 'zh',
        uid: utils.generateUUID(),
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
//http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    message.destroy()
    message.error('非法请求');
    return Promise.reject(error);
  }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {},version = 'v1') {
  let api_url = `/zh-cn/${version}${url}`;
  if (baseUrl.includes(url)) {
    api_url = `${www_api_url}/zh-cn/${version}${url}`
  }
  return new Promise((resolve, reject) => {
    axios.get(api_url, {
      params: params
    }).then(response => {
      if (!response.data.success) {
      resolve(response.data.error);
      }else {
        resolve(response.data.payload);
      }
    }).catch(err => {
      reject(err);
    });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {},version = 'v1') {
  let api_url = `/zh-cn/${version}${url}`;
  if (baseUrl.includes(url)) {
    api_url = `${www_api_url}/zh-cn/${version}${url}`
  }
  return new Promise((resolve, reject) => {
    axios.post(api_url, data).then(
      response => {
        if (!response.data.success) {
          resolve(response.data.error);
        } else {
          resolve(response.data.payload);
        }
      },
      err => {
        reject(err);
      }
    );
  });
}