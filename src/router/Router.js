/*
   Root, Router 配置
*/
import React from 'react';
import {Route, Switch} from 'react-router-dom';
 
import App from './../App';
import Home from '../views/Home/Home';
import HomeIndex from '../views/Home/Index';
import HomeOrder from '../views/Home/Order';
import MyFooter from '../components/MyFooter';
 
const Root = () => (
  <Switch>
    <Route
      render={props => (
        <App>
          <Switch>
            <Route path="/home" render={props => (
              <Home>
                <Route path="/home/index" component={HomeIndex} />
                <Route path="/home/order" component={HomeOrder} />
              </Home>
            )} />
            <Route path="/order" component={MyFooter} />
          </Switch>
        </App>
      )}
    />
  </Switch>
);
 
export default Root;