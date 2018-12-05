import React, { Component } from 'react'
import { Icon,Select} from 'antd';
import { get } from '../../static/js/http';
import './index.scss';

const Option = Select.Option;

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.openShowNumber = this.openShowNumber.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      isShowNumber:true,
      companyDes:'CNY',
      company:'1',
      assetsTotal:'---', //资产总估值
      yesterdayTotal:'---', //昨日订单总金额
      todayTotal:'---', // 今日订单总金额
      todayNews:'---',//今日新增
      cancelTotal:'---',//已取消
      successTotal:'---',//待支付
      paidTotal:'---',//已完成
    }
  }
  componentWillMount() {
    this.getIndexData()
  }
  
  // 是否隐藏数字
  openShowNumber(){
    this.setState({isShowNumber: !this.state.isShowNumber})
  }
  // 获取统计数据
  getIndexData(type = this.state.company){
    get('/statistic/indexData',{ type }).then(res=>{
      if (!res.code) {
        this.setState({
          assetsTotal:res.assetTotal,
          yesterdayTotal:res.yesterdayOrderTotal,
          todayTotal:res.todayOrderTotal,
          todayNews:res.statusGroupNum.todayCnt,
          cancelTotal:res.statusGroupNum.canceledCnt,
          successTotal:res.statusGroupNum.waitingPaymentCnt,
          paidTotal:res.statusGroupNum.doneCnt,
        })
      }
    })
  }
  // 切换单位
  handleChange(value){
    this.setState({
      company: value,
      companyDes:value === '1' ? 'CNY' : 'USD'
    },()=>{
      this.getIndexData()
    })
  }
  
  render() {
    return (
      <div className="home_index">
        <div className="title">
          <div>
            <span>整体情况</span>
            <span onClick={this.openShowNumber}>
              {this.state.isShowNumber ? <Icon type="eye" theme="filled" /> : <Icon type="eye-invisible" theme="filled" />}
            </span>
          </div>
          <div className="select_company">
          <Select defaultValue={this.state.companyDes} style={{ width: 120 }} onChange={this.handleChange}>
            <Option value="1">CNY</Option>
            <Option value="2">USD</Option>
          </Select>
          </div>
        </div>
        {/* 数据区 */}
        <div className="data_list">
          <div className="data_th">
            <div className="li_title">资产总估值</div>
            <div className="number">
              <span className="company_span">{this.state.isShowNumber ? this.state.assetsTotal : '********'}&nbsp;{this.state.companyDes}</span>
            </div>
          </div>
          <div className="data_th">
            <div className="li_title">昨日订单总金额</div>
            <div className="number">
              <span className="company_span">{this.state.isShowNumber ? this.state.yesterdayTotal : '********'}&nbsp;{this.state.companyDes}</span>
            </div>
          </div>
          <div className="data_th">
            <div className="li_title">今日订单总金额</div>
            <div className="number">
              <span className="company_span">{this.state.isShowNumber ? this.state.todayTotal : '********'}&nbsp;{this.state.companyDes}</span>
            </div>
          </div>
          <div className="data_th oder_total">
            <div className="li_title">订单统计</div>
            <div className="number_box">
              <div className="number">
                <span>今日新增</span>
                <span className="count_to">{this.state.isShowNumber ? this.state.todayNews : '*****'}&nbsp;</span>
              </div>
              <div className="number">
                <span>已取消</span>
                <span className="count_to" v-show="!openNumber">{this.state.isShowNumber ? this.state.cancelTotal : '*****'}&nbsp;</span>
              </div>
              <div className="number">
                <span>待支付</span>
                <span className="count_to" v-show="!openNumber">{this.state.isShowNumber ? this.state.successTotal : '*****'}&nbsp;</span>
              </div>
              <div className="number">
            <span>已完成</span>
            <span className="count_to" v-show="!openNumber">{this.state.isShowNumber ? this.state.paidTotal : '*****'}&nbsp;</span>
          </div>
            </div>
          </div>
        </div>
        {/* 图表 */}
        <div className="chart">
          <div className="chart_title">
            <div className="left">数据报表<span>(以下数据10分钟刷新一次)</span></div>
          </div>
        </div>
      </div>
    )
  }
}
