import React, { Component } from 'react'

export default class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  componentWillMount() {
    // 获取对应币种
    console.log(this.props.match.params.coin);
  }
  
  
  render() {
    return (
      <div>
        {this.props.match.params.coin}
      </div>
    )
  }
}
