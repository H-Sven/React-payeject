import React, { Component } from 'react';
import {HashRouter,Route, Switch ,Redirect} from 'react-router-dom';
import Home from './views/Home/Home';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentWillMount() {
    
  }

  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Redirect exact to="/home/index" from="/" />
            <Route  path="/home" component={Home} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
