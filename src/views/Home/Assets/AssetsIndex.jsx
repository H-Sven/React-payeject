import React, { Component } from 'react'
import './assetsIndex.scss'
import { get } from '../../../static/js/http';
import {  Select , Button , Table  } from 'antd';
const Option = Select.Option;

export default class AssetsIndex extends Component {
  constructor(props) {
    super(props);
    this.assetsEstimate = this.assetsEstimate.bind(this)
    this.getAccountList = this.getAccountList.bind(this)
    this.state = {
      company: '',
      companyDes:'',
      options: [
        {value: '1',label: 'CNY'},
        {value: '2',label: 'USD'}
      ],
      circa:'---',
      timer:null,
      columns: [
        {title: '币种',dataIndex: 'coin',key: 'coin',
          render: (coin,item) => (
            <span>
              <img src={item.iconUrl} className="logo_img" alt=""/>
              <span>{coin}</span>
            </span>
          )
        },
        {title: '总量',dataIndex: 'total',key: 'total',
          render: (total,item) => (
            <span>{`${total} ≈ ${item.coinAsset} ${this.state.companyDes}`}</span>
          )
        },
        {title: '可用',dataIndex: 'avail',key: 'avail'},
        {title: '冻结',dataIndex: 'freeze',key: 'freeze'},
        {title: '操作',dataIndex: 'coin',key: 'withdrawal',
          render:(coin) => (
            <span className="withdrawal" onClick={this.withdrawal.bind(this,coin)}>提现</span>
          )
        },
      ],
      data: [],
    }
  }
  
  componentWillMount() {
    this.setState({
      companyDes:this.state.options[0].label,
      company:this.state.options[0].value,
      timer:setInterval(() => {
        this.assetsEstimate()
      }, 5000)
    },() => {
      this.assetsEstimate()
      this.getAccountList()
    })
  }
  // 卸载
  componentWillUnmount = () => {
    clearInterval(this.state.timer)
  }

  assetsEstimate(type = this.state.company){
    get('/useraccount/assetsEstimateByMerchant',{ type }).then(res=>{
      if (!res.code) {
        this.setState({circa:res.amount})
      }else{
        
      }
    })
  }
  getAccountList(type = this.state.company){
    const dataArr = [];
    get('/useraccount/accountListByMerchant',{ type }).then(res=>{
      if (!res.code) {
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            dataArr.push({coin:key,...res[key]})
            this.setState({
              data:dataArr
            })
          }
        }
      }else {
        
      }
    })
  }

  // 提现
  withdrawal(coin){
    this.props.history.push(`/home/assets/record/${coin}`)
  }

  handleChange(value,option) {
    this.setState({
      companyDes:option.props.children,
      company:value
    },()=>{
      this.assetsEstimate()
      this.getAccountList()
    })
  }
  
  render() {
    return (
      <div className="assets_index">
        {/* 账户信息 */}
        <div className="account_box">
          <div className="row_box">
            <div className="title">账户名：</div>
            <div>习近平</div>
          </div>
          <div className="row_box">
            <div className="title">账户ID：</div>
            <div>2321333</div>
          </div>
          <div className="row_box">
            <div className="title">资产总估值：</div>
            <div>≈ {this.state.circa}</div>
            <Select defaultValue={this.state.companyDes} style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
              {this.state.options.map((item,index) => {
                return (
                  <Option value={item.value} key={index}>{item.label}</Option>
                )
              })}
            </Select>
          </div>
        </div>
        {/* 资产列表 */}
        <div className="btn_box">
          <Button type="primary">提现记录</Button>
          <Button type="danger">账单明细</Button>
        </div>
        <Table columns={this.state.columns} dataSource={this.state.data} rowKey='coin' pagination={false} />
      </div>
    )
  }
}
