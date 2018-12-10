import React, { Component } from 'react'
import { get } from "../../../static/js/http";
import utils from "../../../static/js/utils";
import './withdrawal.scss';
import { Input,Button } from "antd";

export default class Withdrawal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectPayId:'',
      coinType:'',
      available:'---',
      frozen:'---',
      total:'---',
      minNum:'',
      maxNum:'',
      steps:1,
      iptNumber:'',
      exgNum:2,
      verification:false,
      codeType:'102',
      loading:false,
      step1Loading:false,
      qty:'',
      price:'',
      adId:'',
      totalPrice:'',
      paymentTypes:[],
      orderId:'',
    }
  }
  
  componentWillMount() {
    // 获取对应币种
    this.setState({
      coinType:this.props.match.params.coin,
    },() => {
      this.getAccountList();
      this.getWithdrawalNumber();
    })
  }

  // 获取币种信息
  getAccountList(coinType = this.state.coinType){
    get('/useraccount/accountListByMerchant',{ coinType }).then(res=>{
      if (!res.code) {
        this.setState({
          available:res[coinType].avail,
          frozen:res[coinType].freeze,
          total:res[coinType].total,
          exgNum:res[coinType].precision,
        })
      }
    })
  }
  // 获取当前最小提币数量
  getWithdrawalNumber(coinType = this.state.coinType){
    get('/trade/getMatchAdLowerLimit',{ coinType }).then(res=>{
      if (!res.code) {
        this.setState({
          minNum:res.minNum,
          maxNum:res.maxNum,
        })
      }
    })
  }
  // 提现数量
  changeIpt(e){
    this.setState({
      iptNumber:utils.toDecimal(e.target.value,this.state.exgNum)
    })
  }
  // 全部提现
  allFun(){
    const allNumber = +this.state.available > +this.state.maxNum ? this.state.maxNum : this.state.available;
    this.setState({
      iptNumber:allNumber
    })
  }
  // 下一步
  nextStep1(){
    this.setState({
      steps:2
    })
  }
  
 
  render() {
    const { coinType, available, frozen, total,steps ,iptNumber,minNum, maxNum} = this.state;
    return (
      <div className="withdrawal">
        <div className="data_list_box">
          <div className="data_list">
            <div className="li_title">可用{coinType}</div>
            <div className="number">{available}</div>
          </div>
          <div className="data_list">
            <div className="li_title">冻结{coinType}</div>
            <div className="number">{frozen}</div>
          </div>
          <div className="data_list">
            <div className="li_title">{coinType}总量</div>
            <div className="number">{total}</div>
          </div>
        </div>
        {/* 提现部分 */}
        <div className="steps_box">
          {steps === 1 && 
            <div className="steps steps_1">
              <div className="steps_title">设置提现数量、收款方式</div>
              <div className="ipt_box">
                <div className="ipt_title">提现数量</div>
                <div className="ipt_box_inner">
                  <Input value={iptNumber} onChange={this.changeIpt.bind(this)} className="my_input" placeholder={`提现数量范围：${minNum}-${maxNum}`} step="0.0000000001" type="number" />
                  <span className="hover" onClick={this.allFun.bind(this)}>全部</span>
                </div>
              </div>
              <div className="next_step">
                <Button type="primary" onClick={this.nextStep1.bind(this)}>下一步</Button>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}
