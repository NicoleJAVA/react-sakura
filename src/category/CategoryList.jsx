import React from 'react';
import { List, Avatar, Button, Row, Col, Modal, message } from 'antd';
import axios from 'axios';
import ApiUrl from '../config/api_url';
import TokenHeaders from '../utils/tokenUtils';

const { confirm } = Modal;
export default class CategoryList extends React.Component {
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
      method: 'get',
      url: ApiUrl.CATEGORY_ALL,
      headers: TokenHeaders,
    }).then((res) => {
      let data = res.data.data;

      if (this._isMounted) {
        this.setState({
          categoryList: data,
        });
      }
    });
  };

  deleteCategory = (id) => {
    let dataProps = {
      id: id,
    };
    confirm({
      title: '是否確定刪除此分類？',
      content: '若您點擊確認按鈕，此分類將被永久刪除，無法復原。',
      okText: '確認',
      cancelText: '取消',
      onOk() {
        axios({
          method: 'post',
          url: ApiUrl.CATEGORY_DELETE,
          headers: TokenHeaders,
          data: dataProps,
        }).then((res) => {
          message.success('刪除成功');
        });
      },
      onCancel() {
        message.success('刪除失敗');
      },
    });
  };

  updateCategory = (id) => {
    this.props.history.push('/admin/category/edit/' + id);
  };

  render() {
    let { categoryList } = this.state;

    return (
      <div>
        <List
          header={
            <Row className="w-100">
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
          renderItem={(item) => (
            <List.Item>
              <Row className="w-100">
                <Col span={2}>
                  <List.Item.Meta avatar={<Avatar src={item.image} />} />
                </Col>
                <Col span={6}>{item.name}</Col>
                <Col span={8}>{item.level}</Col>
                <Col span={6}>
                  <Button
                    type="primary"
                    onClick={(e) => {
                      this.updateCategory(item.id);
                    }}
                    className="me-2"
                  >
                    編輯
                  </Button>
                  <Button
                    type="primary"
                    onClick={(e) => {
                      this.deleteCategory(item.id);
                    }}
                  >
                    刪除
                  </Button>
                </Col>
              </Row>
            </List.Item>
          )}
        ></List>
      </div>
    );
  }
}
