import { post, get } from "./http";
import utils from './utils';
import { message } from 'antd';
export default {
  /**
   * 并行请求时，需要一个状态为resolve的函数
   */
  isResolve(){
    return new Promise((resolve,reject)=>{
      resolve(true)
    })
  },
  /**
   * 获取币种列表
   */
  getCoinArr(){
    const coinArr = [];
    return new Promise((resolve, reject) => {
      get('/common/coinTypes',{}).then(res => {
        if (!res.code) {
          res.map(v => {
            coinArr.push({value:v.typeName,label:v.typeName,exgPrice:2,exgNum:v.showPrecision});
          })
          resolve(coinArr)
        }else {
          reject(res)
          message.warning(res.message);
        }
      })
    });
  },
  /**
   * 未登录时获取验证码
   * myAccount:账号  type:获取类型
   */
  publicGetCode(type,myAccount){
    let url = utils.isPhone(myAccount) ? '/user/sendEmailCode' :'/user/sendEmailCode';
    let accountKey = utils.isPhone(myAccount) ? {codeType:type,phone : myAccount} : {codeType:type,email : myAccount};
    return new Promise((resolve,reject)=>{
      post(url,accountKey).then(res=>{
        if (!res.code) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  /**
   * 登录之后旧的获取验证码
   * regType:类型  type:获取类型
   */
  PublicOldGetCode(regType,type){
    let url = regType === 1  ? '/user/sendEmailCode' :'/user/sendEmailCode';
    return new Promise((resolve,reject)=>{
      post(url,{
        codeType:type
      }).then(res=>{
        if (!res.code) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  /**
   * 登录之后获取验证码
   * regType:注册类型  type:获取类型
   */
  isLoginPublicGetCode(regType,type){
    let url = regType === 1  ? '/common/sendSMSCode' :'/common/sendEmailCode';
    return new Promise((resolve,reject)=>{
      post(url,{
        codeType:type
      }).then(res=>{
        if (!res.code) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  /**
   * 验证验证码
   *  myCode:验证码 type:验证类型 myAccount:账号
   */
  publicCheckCode(myCode,type,myAccount){
    return new Promise((resolve,reject) => {
      post('/common/checkCode',{
        code:myCode,
        codeType:type,
        account:myAccount
      }).then(res=>{
        if (!res.code) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  /**
   * 验证账号是否绑定GA
   * myAccount:账号
   */
  publicIsBindGa(myAccount){
    return new Promise((resolve,reject)=>{
      get('/user/isBindGa',{
        account:myAccount,
      }).then(res=>{
        if (!res.code) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  /**
   * 验证GA
   * gaCode:谷歌码，type:类型
   */
  publicVerifyGA(gaCode,type,myAccount){
    return new Promise((resolve,reject) => {
      post('/user/verifyGA',{
        gaCode:gaCode,
        captchaType:type,
        account:myAccount
      }).then(res=>{
        if (!res.code) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  /** 
   * 退出登录
   */
  publicLogout(){
    return new Promise((resolve,reject)=>{
      post('/user/logout',{}).then(res=>{
        if (!res.code) {
          resolve(res)
          // store.commit('isLogin',false)
          // store.commit('setInfo',{})
          utils.deleteCookie();
        }else{
          reject(res)
        }
      })
    })
  }
}

