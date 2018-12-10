import React, { Component } from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import HomeIndex from './Index';
import HomeOrder from './Order';
import Assets from './Assets/Assets';

import { Layout } from 'antd';
import "./home.scss";
import MyHeader from '../../components/MyHeader'
import MyFooter from '../../components/MyFooter'
import MySider from '../../components/MySider'

const {
  Header, Footer, Sider, Content,
} = Layout;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  componentWillMount() {
    // this.props.history.push('/home/index')
  }
  
  render() {
    return (
      <div className="home">
        <Layout>
          <Header><MyHeader></MyHeader></Header>
          <Layout>
            <Sider><MySider></MySider></Sider>
            <Content>
              <div className="content_main">
                <Switch>
                  <Route  path="/home/index" component={HomeIndex} />
                  <Route  path="/home/order" component={HomeOrder} />
                  <Route  path="/home/assets" component={Assets} />
                </Switch>
              </div>
              <Footer><MyFooter></MyFooter></Footer>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
export default Home;