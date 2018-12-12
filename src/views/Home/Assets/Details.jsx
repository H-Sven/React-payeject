import React, { Component } from 'react'
import { connect } from 'react-redux';

const mapStateToProps = state => {//需要redux中的哪些全局状态
  return {
    name:state.allRedux.name,
  }
}
const mapDispatchToProps = dispatch => {//需要redux中的那些action创建函数
  return {
    goLogin(data){ //申明一个调用方法传入action,传入对应的type
      dispatch({type:'GO_LOGIN',data})
    },
    outLogin(data){
      dispatch({type:'OUT_LOGIN',data})
    }
  }
}

 class Details extends Component {
    constructor(props) {
      super(props);
      this.state = {}
    }
  render() {
    return (
      <div className="details">
        <br></br>
        {this.props.name}
        <br></br>
        <br></br>
        <div onClick={this.props.goLogin.bind(this,'李四')}>Click GOLOGIN</div>
        <br></br>
        <div onClick={this.props.goLogin.bind(this,'王二')}>Click OUTLOGIN</div>
      </div>
    )
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Details);
