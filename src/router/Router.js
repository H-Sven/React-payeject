/*
   Root, Router 配置
*/
import React from 'react';
import {Route, Switch} from 'react-router-dom';
 
import App from './../App';
import Home from '../views/Home/Home';
import HomeIndex from '../views/Home/Index';
import MyFooter from '../components/MyFooter';
// import MovieInfo from './../views/movieInfo/MovieInfo';
// import Photos from './../views/movieInfo/Photos';
 
const Root = () => (
  <Switch>
    <Route path="/"
      render={props => (
        <App>
          <Switch>
          <Route path="/" component={Home} />
            <Route path="/home" render={props => (
              <Home>
                <Route path="/home/index" component={HomeIndex} />
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