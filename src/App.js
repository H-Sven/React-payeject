import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    if (this.props.location.pathname === '/') {
      this.props.history.push('/home/index')
    }
  }

  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(App);
