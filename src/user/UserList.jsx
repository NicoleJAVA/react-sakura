import React from 'react';
import { List, Avatar, Button, Row, Col } from 'antd';
import axios from 'axios';
import ApiUrl from '../config/api_url';
import TokenHeaders from '../utils/tokenUtils';

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
    };
  }

  componentDidMount() {
    this.getUserList();
  }

  getUserList = () => {
    axios({
      method: 'get',
      url: ApiUrl.USER_LIST,
      headers: TokenHeaders,
    }).then((res) => {
      this.setState({
        userList: res.data.data,
      });
    });
  };

  render() {
    let { userList } = this.state;

    return (
      <div>
        <List
          header={
            <Row className="100">
              <Col span={2}>
                <b>大頭貼</b>
              </Col>
              <Col span={4}>
                <b>帳號名稱</b>
              </Col>
              <Col span={4}>
                <b>電話</b>
              </Col>
              <Col span={6}>
                <b>地址</b>
              </Col>
              <Col span={3}>
                <b>操作</b>
              </Col>
            </Row>
          }
          bordered
          dataSource={userList}
          renderItem={(item) => (
            <List.Item>
              <Row className="w-100">
                <Col span={2}>
                  <List.Item.Meta avatar={<Avatar src={item.head_image} />} />
                </Col>
                <Col span={4}>{item.username}</Col>
                <Col span={4}>{item.mobile}</Col>
                <Col span={6}>{item.address}</Col>
                <Col span={3}>
                  <Button type="primary">編輯</Button>
                  <Button type="primary">刪除</Button>
                </Col>
              </Row>
            </List.Item>
          )}
        ></List>
      </div>
    );
  }
}
