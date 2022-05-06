import React from 'react';
import ReactDOM from 'react-dom';
import {Layout, Menu, Breadcrumb, Input, Icon, Button, message} from 'antd';
import axios from 'axios';
import ApiUrl from '../config/api_url';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class Admin extends React.Component{

  constructor(props) {
    super(props);
  }



  render(){
      return(
          <Layout>
              {/* left side menu */}
              <Sider>

              </Sider>

              {/* right side: main content */}
              <Layout>
                  <Content>

                  </Content>
              </Layout>
          </Layout>
      );
  }
}

