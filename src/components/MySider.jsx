import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import "./my_sider.scss";

class MySider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siderArr:[
        {path:'/home/index',pathName:'首页',icon:'icon-index'},
        {path:'/home/order',pathName:'订单',icon:'icon-dingdanxuanzhong'},
        {path:'/home/assets/index',pathName:'资产',icon:'icon-zichan2'},
        {path:'/home/account/index',pathName:'账户',icon:'icon-touxiang'},
      ],
      select:'icon-index',
    }
  }
  btnSider(select,path){
    console.log(path);
    this.props.history.push(path)
    this.setState({select : select})
  }
  render() {
    return (
      <div className="my_sider">
        {this.state.siderArr.map((item,index)=>{
          return (
            <div className={`sider_item ${this.state.select === item.icon ? 'z-active' : ''}`} key={index} onClick={this.btnSider.bind(this,item.icon,item.path)}>
              <i className={ `iconfont ${item.icon}`}></i>
              <span className="menu_title">{item.pathName}</span>
            </div>
          )
        })}
      </div>
    )
  }
}
export default withRouter(MySider);
