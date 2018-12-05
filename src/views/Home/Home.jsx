import React, { Component } from 'react';
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
  }
  componentDidMount() {
    
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
                {this.props.children}
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