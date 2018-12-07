/*
   Root, Router 配置
*/
import React from 'react';
import {Route, Switch} from 'react-router-dom';
 
import App from './../App';
import MyFooter from '../components/MyFooter';

import Home from '../views/Home/Home';
import HomeIndex from '../views/Home/Index';
import HomeOrder from '../views/Home/Order';
import Assets from '../views/Home/Assets/Assets';
import AssetsIndex from '../views/Home/Assets/AssetsIndex';
import AssetsRecord from '../views/Home/Assets/Record';
 
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
                <Route path="/home/assets" render={props => (
                  <Assets>
                    <Route path="/home/assets/index" component={AssetsIndex} />
                    <Route path="/home/assets/record/:coin" component={AssetsRecord} />
                  </Assets>
                )} />
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