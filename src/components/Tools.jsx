import React, { Component } from 'react'
import { DatePicker , Input , Select , Button } from 'antd';
import utils from '../static/js/utils'
import funcApi from '../static/js/funcApi'
import moment from 'moment';
const { RangePicker } = DatePicker;
const Search = Input.Search;
const Option = Select.Option;

export default class Tools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      inputValue: '',
      coinTypeArr: [
        { value: 0, label: '全部' },
      ],
      selectCoin: '',
      statusArr: [],
      selectStatus: '',
      paymentType:'0',
      paymentArr:[
        { value: 0, label: '全部' },
        { value: '1', label: '银行卡' },
        { value: '2', label: '支付宝' },
        { value: '3', label: '微信' },
      ]
    }
  }
  componentWillMount = () => {
    console.log(this.props.toolsType); // 工具所在页面
    // 获取币种列表
    funcApi.getCoinArr().then(res => {
      this.setState({ 
        coinTypeArr: this.state.coinTypeArr.concat(res),
        statusArr:this.props.statusArr
      })
    })
  }
  //时间选择
  onOkDate(value) {
    this.setState({
      startDate: utils.timeStamp(value[0]._d),
      endDate: utils.timeStamp(value[1]._d),
    })
  }
  // 订单编号
  inputValue(e) {
    this.setState({ inputValue: e.target.value })
  }
  // 选择币种
  handleChangeCoin(value) {
    this.setState({ selectCoin: value })
  }
  // 选择状态
  handleChangeStatus(value) {
    this.setState({ selectStatus: value })
  }
  // 选择收款方式
  handleChangepayMent(value){
    this.setState({ paymentType: value })
  }
  // 将搜索数据发送给父组件
  sendData() {
    this.props.getChildData({
      startDate:this.state.startDate,
      endDate:this.state.endDate,
      inputValue:this.state.inputValue,
      selectCoin:this.state.selectCoin,
      selectStatus:this.state.selectStatus,
      paymentType:this.state.paymentType
    })
  }
  // 下载报表
  DownLoad(){
    utils.downloadCSV('/trade/transList',{
      pageNo:1,
      pageSize:20,
      tradeType:1,
      isDownLoad:1,
      orderNo:this.state.inputValue,
      oinType:this.state.selectCoin === 0 ? '' : this.state.selectCoin,
      status:this.state.selectStatus === 0 ? '': this.state.selectStatus,
      beginTime:this.state.startDate,
      endTime:this.state.endDate
    })
  }

  render() {
    return (
      <div className="tools">
        <RangePicker
          showTime={{
            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
          }}
          format="YYYY/MM/DD HH:mm:ss"
          placeholder={['开始时间', '结束时间']}
          onOk={this.onOkDate.bind(this)}
        />
        <Search
          placeholder={this.props.toolsType === 'record' ? '提现编号' : '订单编号'}
          onChange={this.inputValue.bind(this)}
          onSearch={this.sendData.bind(this)}
          style={{ width: 200 }}
        />
        <Select placeholder="选择币种" style={{ width: 120 }} onChange={this.handleChangeCoin.bind(this)}>
          {this.state.coinTypeArr.map((item, index) => {
            return (
              <Option value={item.value} key={index}>{item.label}</Option>
            )
          })}
        </Select>
        <Select placeholder="选择状态" style={{ width: 120 }} onChange={this.handleChangeStatus.bind(this)}>
          {this.state.statusArr.map((item, index) => {
            return (
              <Option value={item.value} key={index}>{item.label}</Option>
            )
          })}
        </Select>
        {this.props.toolsType === 'record' && 
          <Select placeholder="收款方式" style={{ width: 120 }} onChange={this.handleChangepayMent.bind(this)}>
          {this.state.paymentArr.map((item, index) => {
            return (
              <Option value={item.value} key={index}>{item.label}</Option>
            )
          })}
        </Select>
        }
        <Button type="primary" icon="search" onClick={this.sendData.bind(this)}>搜索</Button>
        {this.props.toolsType === 'order' && 
          <Button type="danger" icon="download" onClick={this.DownLoad.bind(this)}>下载报表</Button>
        }
      </div>
    )
  }
}
