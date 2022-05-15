import React from 'react';
import axios from 'axios';
import ApiUrl from '../config/api_url';
import TokenHeaders from '../utils/tokenUtils';
import { Button, Select, Input, Upload, Form, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import E from 'wangeditor';
import printArray from '../utils/LogUtils';

const { Option } = Select;

export default class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryFirst: '103', // id for initialization
      categorySecond: '107', // id for initialization
      name: '',
      price: '',
      discountPrice: '',
      amount: '100', // initialize product amount
      productSN: '1122', // product sn. for initialization
      images: '',
      detailHtml: '',
      freight: '0',
      v1List: [],
      v2List: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getCategoryList();
    this.initEditor();
  }

  initEditor = () => {
    const editor = new E(this.refs.toolbar, this.refs.editor);
    editor.customConfig.zIndex = 100; // set 100 to ensure that it won't be occluded by others
    editor.customConfig.uploadImgServer = ApiUrl.UPLOAD_EDITOR;
    editor.customConfig.uploadImgHeaders = TokenHeaders;
    editor.customConfig.uploadFileName = 'file';
    editor.customConfig.onchange = (html) => {
      this.setState({
        detailHtml: html,
      });
      //   console.log("測試: HTML", html);
    };
    editor.customConfig.uploadImgHooks = {
      customInsert: (insertImg, result, editor2) => {
        let url = result.url;
        // console.log("測試: URL", url);
        insertImg(url);
      },
    };
    editor.create();
  };
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
      let v1List = [];
      data.forEach((item, index) => {
        if (item.level === 'V1') {
          v1List.push(item);
          //   printArray(v1List, "新增 " + item.name + " 至 v1List");
        }
      });

      if (this._isMounted) {
        this.setState({
          v1List: v1List,
        });
      }
    });
  };

  onV1SelectChanged = (id) => {
    let url = ApiUrl.CATEGORY_SUB + '?pid=' + id;
    axios({
      method: 'get',
      url: url,
      headers: TokenHeaders,
    }).then((res) => {
      let data = res.data.data;
      if (this._isMounted) {
        this.setState({
          v2List: data,
        });
      }
    });
  };

  setProductName = (name) => {
    this.setState({
      name: name,
    });
  };

  setProductPrice = (price) => {
    this.setState({
      price: price,
    });
  };

  setProductDiscountPrice = (discountPrice) => {
    this.setState({
      discountPrice: discountPrice,
    });
  };

  setProductFreight = (freight) => {
    this.setState({
      freight: freight,
    });
  };

  setProductAmount = (amount) => {
    this.setState({
      amount: amount,
    });
  };

  onClickSubmit = () => {
    let formData = {
      category_first: this.state.categoryFirst,
      category_second: this.state.categorySecond,
      name: this.state.name,
      price: this.state.price,
      discount_price: this.state.discountPrice,
      count: this.state.amount,
      good_sn: this.state.productSN,
      images: this.state.images,
      detail: this.state.detailHtml,
      freight: this.state.freight,
    };

    axios({
      method: 'post',
      url: ApiUrl.PRODUCT_ADD,
      headers: TokenHeaders,
      data: formData,
    }).then((res) => {
      message.success('新增商品「' + formData.name + '」成功！');
    });
  };

  onChange = (file, fileList, event) => {
    if (file.file.status === 'done') {
      // console.log('檔案', file.fileList);
      let result = [];
      file.fileList.forEach((item, index) => {
        result.push(item.response.url);
      });
      this.setState({
        images: result.toString(),
      });

      // console.log('圖片', this.state.image);
    }
  };

  render() {
    return (
      <Form>
        <Form.Item label="品名">
          <Input
            className="theme-input"
            value={this.state.name}
            onChange={(e) => {
              this.setProductName(e.target.value);
            }}
          ></Input>
        </Form.Item>
        <Form.Item label="原價">
          <Input
            className="theme-input"
            value={this.state.price}
            onChange={(e) => {
              this.setProductPrice(e.target.value);
            }}
          ></Input>
        </Form.Item>
        <Form.Item label="售價">
          <Input
            className="theme-input"
            value={this.state.discountPrice}
            onChange={(e) => {
              this.setProductDiscountPrice(e.target.value);
            }}
          ></Input>
        </Form.Item>
        <Form.Item label="運費">
          <Input
            className="theme-input"
            value={this.state.freight}
            onChange={(e) => {
              this.setProductFreight(e.target.value);
            }}
          ></Input>
        </Form.Item>
        <Form.Item label="數量">
          <Input
            className="theme-input"
            value={this.state.amount}
            onChange={(e) => {
              this.setProductAmount(e.target.value);
            }}
          ></Input>
        </Form.Item>
        <Form.Item label="分類" className="me-2">
          <Select className="theme-select" onSelect={this.onV1SelectChanged}>
            {this.state.v1List.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
          <Select className="theme-select">
            {this.state.v2List.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="商品圖片">
          <Upload
            headers={TokenHeaders}
            accept="images/*"
            listType="picture"
            action={ApiUrl.UPLOAD_IMAGE}
            onChange={this.onUploadChange}
          >
            <Button>
              <UploadOutlined /> 上傳
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item label="商品詳情">
          <div ref="toolbar" className="wang-toolbar"></div>
          <div ref="editor" className="wang-text-container"></div>
          <br />
          <Button
            className="theme-submit-btn mt-2"
            onClick={this.onClickSubmit}
          >
            確認
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
