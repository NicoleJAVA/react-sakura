import React from 'react';
import {List, Avatar, Button, Row, Col} from 'antd';
import axios from 'axios';
import ApiUrl from '../config/api_url';
import TokenHeaders from '../utils/tokenUtils';

export default class CategoryList extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        categoryList: [],
    };
  }

  componentDidMount() {
      this._isMounted = true; 
      this.getCategoryList();
  }

  componentWillUnmount() {
    this._isMounted = false; 
  }

  getCategoryList = () => {
      axios({
          method: "get",
          url: ApiUrl.CATEGORY_ALL,
          headers: TokenHeaders,
      }).then(res => {
        let data = res.data.data;

        if (this._isMounted) {
            this.setState({
                categoryList: data,
            });
        }
      });
  };

  deleteCategory = (id) => {
  };

  updateCategory = (id) => {
    this.props.history.push('/admin/category/edit/' + id);
  };

  render(){
      let {categoryList} = this.state;

      return(
        <div>
            <List
                header={
                    <Row className="user-list-row">
                        <Col span={2}>
                            <b>分類</b>
                        </Col>
                        <Col span={6}>
                            <b>名稱</b>
                        </Col>
                        <Col span={8}>
                            <b>等級</b>
                        </Col>
                        <Col span={6}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={categoryList}
                renderItem={item => (
                    <List.Item>
                        <Row className='user-list-row'
                        >
                            <Col span={2}>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar src={item.image}/>
                                    }
                                />
                            </Col>
                            <Col span={6}>
                                {item.name}
                            </Col>
                            <Col span={8}>
                                {item.level}
                            </Col>
                            <Col span={6}>
                                <Button type="primary" onClick={(e) => {this.updateCategory(item.id)}}>編輯</Button>
                                <Button type="primary" onClick={(e) => {this.deleteCategory(item.id)}}>刪除</Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            >
            </List>
        </div>
      );
  }
}

