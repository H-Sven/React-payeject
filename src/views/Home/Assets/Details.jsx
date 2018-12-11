import React, { Component } from 'react'
import { connect } from 'react-redux';

function mapStateProps(state) {
  return {
    isLogin:state.allRedux.isLogin,
    name:state.allRedux.name,
  }
}
function mapDispatchProps(dispatch) {
  return {
    goLogin(data){
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
export default connect(mapStateProps,mapDispatchProps)(Details);
