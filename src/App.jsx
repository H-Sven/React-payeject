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
            <Route exact path="/" component={() => (
              <Redirect to={`/home/index`}/>
            )} />
            <Route  path="/home" component={Home} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
