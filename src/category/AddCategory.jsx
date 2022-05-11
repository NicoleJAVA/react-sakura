import React from 'react';
import axios from 'axios';
import ApiUrl from '../config/api_url';
import TokenHeaders from '../utils/tokenUtils';
import {List, Avatar, Button, Row, Col, Select, Card, Input, Upload, Dividers, Form} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

const {Option} = Select;

export default class AddCategory extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        categoryList: [],
        modelVisible: false,
        id: '',
        image: '',
        name: '',
        level: 'V2',
        pid: '',
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

  render(){
      let {categoryList} = this.state;
      let parentList = [];
      categoryList.forEach((item, index) => {
          if (this.state.level === 'V2') {
              if (item.level === 'V1') {
                  parentList.push(item);
              }
          } else if (this.state.level === 'V1') {
            if (item.level === 'V0') {
                parentList.push(item);
            }
        }
      });

      const uploadButton = (
          <div>
              <PlusOutlined/>
              <div className="ant-upload-text">上傳</div>
          </div>
      );
      return(
        <div className="category-layout">
          <Card>
              <Form>
                  <Form.Item label="父類別名稱">
                      <Select className='add-category-select' defaultValue={this.state.pid} value={this.state.pid}>
                          {
                              parentList.map(item => (
                                  <Option key ={item.id} value={item.id}>{item.name}</Option>
                              ))
                          }
                      </Select>
                  </Form.Item>
              </Form>
          </Card>
        </div>
      );
  }
}

