import React, { Component } from 'react'
import './order.scss'
import Tools from '../../components/Tools'
import utils from '../../static/js/utils'
import { Table } from 'antd';
import { get } from '../../static/js/http';

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusArr: [
        { value: '0', label: '全部' },
        { value: '1', label: '待支付' },
        { value: '2', label: '审核中' },
        { value: '3', label: '已完成' },
        { value: '4', label: '已取消' },
      ],
      columns: [
        {title: '订单编号',dataIndex: 'orderNo',key: 'orderNo'},
        {title: '下单时间',dataIndex: 'createTime',key: 'createTime',
          render: createTime => (
            <span>{utils.formatDate(createTime,'yyyy-MM-dd hh:mm:ss')}</span>
          )
        },
        {title: '下单金额',dataIndex: 'totalPrice',key: 'totalPrice'},
        {title: '付款方式',dataIndex: 'paymentType',key: 'paymentType',
          render: paymentType => (
            <span>
              {paymentType === '0' && '---'}
              {paymentType === '1' && <i className="iconfont icon-bank-card" style={{marginLeft:'5px'}}></i>}
              {paymentType === '2' && <i className="iconfont icon-zhifubao1" style={{marginLeft:'5px'}}></i>}
              {paymentType === '3' && <i className="iconfont icon-weixin" style={{marginLeft:'5px'}}></i>}
            </span>
          ),
        },
        {title: '下单货币',dataIndex: 'coinType',key: 'coinType'},
        {title: '单价',dataIndex: 'price',key: 'price'},
        {title: '货币数量',dataIndex: 'qty',key: 'qty'},
        {title: '服务费',dataIndex: 'serviceFee',key: 'serviceFee'},
        {title: '结余数量',dataIndex: 'balance',key: 'balance'},
        {title: '订单状态',dataIndex: 'statusDesc',key: 'statusDesc'},
      ],
      data: [],
      ToolSelectArr:[],
    }
  }
  componentWillMount = () => {
    this.getOrderList()
  }
  getChildData(valueArr){
    this.setState({ToolSelectArr:valueArr},() => {
      this.getOrderList()
    })
  }
  // 获取表格数据
  getOrderList(pageNo = 1){
    get('/trade/transList',{
      pageNo:pageNo,
      pageSize:10,
      tradeType:1,
      orderNo:this.state.ToolSelectArr.inputValue,
      coinType:this.state.ToolSelectArr.selectCoin === 0 ? '' : this.state.ToolSelectArr.selectCoin,
      status:this.state.ToolSelectArr.selectStatus === 0 ? '': this.state.ToolSelectArr.selectStatus,
      beginTime:this.state.ToolSelectArr.startDate,
      endTime:this.state.ToolSelectArr.endDate,
    }).then(res=>{
      if (!res.code) {
        this.setState({data:res.items})
      }else{
        
      }
    })
  }
  
  render() {
    return (
      <div className="my_order">
        <div className="order_title">
          订单列表<span>数据可能存在延时，请以隔天的数据为准</span>
        </div>
        <Tools
          getChildData={this.getChildData.bind(this)} 
          toolsType="order"
          statusArr={this.state.statusArr}
        >
        </Tools>
        {/* 订单列表 */}
        <Table columns={this.state.columns} dataSource={this.state.data} rowKey='orderNo' pagination={false} />
      </div>
    )
  }
}
