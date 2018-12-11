import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './record.scss'
import Tools from '../../../components/Tools'
import utils from '../../../static/js/utils'
import { Table } from 'antd';
import { get } from '../../../static/js/http';

import './record.scss';

export default class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusArr: [
        { value: '0', label: '全部' },
        { value: '1', label: '待收款' },
        { value: '2', label: '待确认' },
        { value: '3', label: '已完成' },
        { value: '4', label: '已取消' },
      ],
      columns: [
        {title: '时间',dataIndex: 'createTime',key: 'createTime',
          render: createTime => (
            <span>{utils.formatDate(createTime,'yyyy-MM-dd hh:mm:ss')}</span>
          )
        },
        {title: '提现编号',dataIndex: 'orderNo',key: 'orderNo'},
        {title: '提现货币',dataIndex: 'coinType',key: 'coinType'},
        {title: '提现数量',dataIndex: 'qty',key: 'qty'},
        {title: '提现单价',dataIndex: 'price',key: 'price'},
        {title: '提现总额',dataIndex: 'totalPrice',key: 'totalPrice'},
        {title: '收款方式',dataIndex: 'paymentType',key: 'paymentType',
          render: paymentType => (
            <span>
              {paymentType === '0' && '---'}
              {paymentType === '1' && <i className="iconfont icon-bank-card" style={{marginLeft:'5px'}}></i>}
              {paymentType === '2' && <i className="iconfont icon-zhifubao1" style={{marginLeft:'5px'}}></i>}
              {paymentType === '3' && <i className="iconfont icon-weixin" style={{marginLeft:'5px'}}></i>}
            </span>
          ),
        },
        {title: '订单状态',dataIndex: 'statusDesc',key: 'statusDesc'},
        {title: '操作',dataIndex: 'status',key: 'status',
          render: (status,item) => (
            <span>
              <span>{status === '2' && <span>确认放币</span>}</span>,
              <span><Link to={`/home/assets/recordDetails/${item.orderId}`}>详情</Link></span>
            </span>
          )
        },
      ],
      data: [],
      ToolSelectArr:[],
    }
  }
  componentWillMount = () => {
    this.getTransList()
    
  }
  
  // 搜索条件
  getChildData(valueArr){
    this.setState({ToolSelectArr:valueArr},() => {
      this.getTransList()
    })
  }
  // 获取提现记录
  getTransList(pageNo = 1){
    get('/trade/transList',{
      pageNo:pageNo,
      pageSize:10,
      tradeType:2,
      orderNo:this.state.ToolSelectArr.inputValue,
      coinType:this.state.ToolSelectArr.selectCoin === 0 ? '' : this.state.ToolSelectArr.selectCoin,
      status:this.state.ToolSelectArr.selectStatus === 0 ? '': this.state.ToolSelectArr.selectStatus,
      beginTime:this.state.ToolSelectArr.startDate,
      endTime:this.state.ToolSelectArr.endDate,
      paymentType:this.state.ToolSelectArr.paymentType === 0 ? '' : this.state.ToolSelectArr.paymentType,
    }).then(res=>{
      if (!res.code) {
        this.setState({data:res.items})
      } else {
        
      }
    })
  }

  render() {
    return (
      <div className="record">
        <Tools
          getChildData={this.getChildData.bind(this)} 
          toolsType="record"
          statusArr={this.state.statusArr}
        >
        </Tools>
         {/* 提现列表 */}
         <Table columns={this.state.columns} dataSource={this.state.data} rowKey='orderNo' pagination={false} />
      </div>
    )
  }
}
