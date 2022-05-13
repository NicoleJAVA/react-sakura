import React from 'react';
import {List, Avatar, Button, Row, Col, Modal, message} from 'antd';
import axios from 'axios';
import ApiUrl from '../config/api_url';
import TokenHeaders from '../utils/tokenUtils';

const {confirm} = Modal;
export default class ProductList extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        productList: [],
    };
  }

  componentDidMount() {
      this.getProductList();
  }

  getProductList = () => {
      axios({
          method: "get",
          url: ApiUrl.PRODUCT_LIST,
          headers: TokenHeaders,
      }).then(res => {
        let data = res.data.data;

        data.forEach((item, index) => {
          item.image = item.images.split(',')[0];
        });

        this.setState({
          productList: data,
        });
      });
  };

  deleteProduct = (id) => {
      let dataProps = {
          'id': id,
      };
      confirm({
          title: '是否確定刪除此商品？',
          content: "若您點擊確認按鈕，此商品將被永久刪除，無法復原。",
          okText: '確認',
          cancelText: '取消',
          onOk() {
            axios({
                method: "post",
                url: ApiUrl.PRODUCT_DELETE,
                headers: TokenHeaders,
                data: dataProps,
            }).then(res => {
                message.success('刪除成功');              
            });
          },
          onCancel() {
            message.success('刪除失敗');
          },
      });
  };

  editProduct = (id) => {
    this.props.history.push('/admin/product/edit/' + id);
  };

  render(){
      let {productList} = this.state;

      return(
        <div>
            <List
                header={
                    <Row className="w-100">
                        <Col span={2}>
                            <b>商品</b>
                        </Col>
                        <Col span={6}>
                            <b>名稱</b>
                        </Col>
                        <Col span={8} className="text-center">
                            <b>價格</b>
                        </Col>
                        <Col span={3}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={productList}
                renderItem={item => (
                    <List.Item>
                        <Row className="w-100"
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
                            <Col span={8} className="text-center">
                                ${item.price}
                            </Col>
                            <Col span={3}>
                                <Button type="primary" onClick={(e) => {this.editProduct(item.id)}}
                                    className="me-2"
                                >編輯</Button>
                                <Button type="primary" onClick={(e) => {this.deleteProduct(item.id)}}>刪除</Button>
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

