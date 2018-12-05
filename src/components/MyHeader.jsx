import React, { Component } from 'react';
import { Avatar ,Menu, Dropdown } from 'antd';
import "./my_header.scss";
import ImgLogo from '../static/images/logo.png';
import { get } from '../static/js/http';




export default class MyHeader extends Component {
  constructor(props) {
   super(props)
   this.state = {
    nickName:'',
    userId:'',
   }
   this.ClickMenu = this.ClickMenu.bind(this)
  }
  componentDidMount() {
    this.getUserInfo()
  }
  getUserInfo(){
    get('/useraccount/getUserInfo',{}).then(res=>{
      console.log(res);
      if (!res.code) {
        this.setState({
          nickName:res.nickName,
          userId:res.userId,
        })
      }
    })
  }
  ClickMenu({key}){
    console.log(key);
    if (key === 'account') {//个人中心
      
    }else if(key === 'logout'){//退出
      this.$funcApi.publicLogout().then(res=>{
        
      })
    }
  }

  render() {
    return (
      <div className="my_header">
        <div className="logo">
          <img src={ImgLogo} alt=""/>
          <span>商户平台</span>
        </div>
        <div className="account_box">
          <Avatar size={34} icon="user" />
          <Dropdown overlay={
            (
              <Menu onClick={this.ClickMenu}>
                <Menu.Item key="account">
                  <span>个人中心</span>
                </Menu.Item>
                <Menu.Item key="logout">
                  <span>退出</span>
                </Menu.Item>
              </Menu>
            )
          } placement="bottomCenter">
            <div className="my_name">
              <div>{this.state.nickName}</div>
              <div>账户ID：{this.state.userId}</div>
            </div>
          </Dropdown>
        </div>
      </div>
    )
  }
}
