import React from 'react';
import {Layout, Menu, Breadcrumb, Input, Icon, Button, message} from 'antd';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Home from '../Home';
import UserList from '../user/UserList';
import CategoryList from '../category/CategoryList';
import EditCategory from '../category/EditCategory';
import AddCategory from '../category/AddCategory';
import ProductList from '../product/ProductList';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class Admin extends React.Component{

  constructor(props) {
    super(props);
  }

  onClickHome = (e) => {
      this.props.history.push('/admin/home');
  }

  onClickUserList = (e) => {
      this.props.history.push('/admin/user/list');
  };

  onClickCategoryList = (e) => {
      this.props.history.push('/admin/category/list');
  };


  onClickAddCategory = (e) => {
    this.props.history.push('/admin/category/add');
  };

  onClickProductList = (e) => {
    this.props.history.push('/admin/product/list');
  };

  render(){
      return(
          <Layout className="admin-menu-layout">
              {/* left side menu */}
              <Sider>
                  <div className="menu-title fs-xl">商城後台管理系統</div>
                  <Menu theme="dark" 
                    defaultSelectedKeys={['1']} 
                    mode="inline" 
                    defaultOpenKeys={['/user', '/product', '/category']}>
                      <Menu.Item key="1" onClick={this.onClickHome}>
                          <Icon type="pie-chart"/>
                          <span>首頁</span>
                      </Menu.Item>
                 

                  <SubMenu
                    key="/user"
                    title={
                        <span>
                            <Icon type="desktop"/>
                            <span>帳號管理</span>
                        </span>
                    }
                  >

                    <Menu.Item key="userList" onClick={this.onClickUserList}>帳號列表</Menu.Item> 
                  </SubMenu>

                  <SubMenu
                    key="/product"
                    title={
                        <span>
                            <Icon type="desktop"/>
                            <span>商品管理</span>
                        </span>
                    }
                  >

                    <Menu.Item key="productList" onClick={this.onClickProductList}>商品列表</Menu.Item> 
                    <Menu.Item key="addProduct">新增商品</Menu.Item> 
                  </SubMenu>

                  <SubMenu
                    key="/category"
                    title={
                        <span>
                            <Icon type="desktop"/>
                            <span>分類管理</span>
                        </span>
                    }
                  >

                    <Menu.Item key="categoryList" onClick={this.onClickCategoryList}>
                      <Icon type="file"/>
                        <span>分類列表</span> 
                    </Menu.Item> 
                    <Menu.Item key="addCategory" onClick={this.onClickAddCategory}>
                      <Icon type="file"/>
                        <span>新增分類</span> 
                    </Menu.Item> 
                  </SubMenu>
                </Menu>
              </Sider>

              {/* right side: main content */}
              <Layout> 
                  <Content className="admin-content">
                      <Breadcrumb className="admin-breadcrumb">
                        <Breadcrumb.Item>後台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>
                      </Breadcrumb>
                      <div className="admin-route-container">

                        <Route path="/admin/user/list" component={UserList}/>
                        {/* product: */}
                        <Route path="/admin/product/list" component={ProductList}/>
                        {/* category: */}
                        <Route path="/admin/category/list" component={CategoryList}/>
                        <Route path="/admin/category/add" component={AddCategory}/>
                        <Route path="/admin/category/edit/:id" component={EditCategory}/>

                        {/* home */}
                        <Route path="/admin/home" component={Home}/>
                        <Redirect to="/admin/home" component={Home}/>
                      </div>
                  </Content>
                  <Footer>Sakura Shop</Footer>
              </Layout>
          </Layout>
      );
  }
}

