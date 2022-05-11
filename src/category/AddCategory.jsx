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

    setCategoryName = (name) => {
        this.setState({
            name: name,
        });
    }

    setLevel = (level) => {
        this.setState({
            level: level,
        });
    }

    setParentId = (pid) => {
        this.setState({
            pid: pid,
        });
    }

    onClickSubmit = () => {
        // todo: submit form
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
                  <Form.Item label="分類名稱">
                      <Input 
                        className="add-category-input"
                        placeholder="子分類名稱"
                        value={this.state.name}
                        onChange={(e) => {this.setCategoryName(e.target.value)}}
                      />
                  </Form.Item>
                  <Form.Item label="分類等級">
                      <Select className='add-category-select' 
                        defaultValue={this.state.level} 
                        value={this.state.level}
                        onSelect = {this.setLevel}
                        >
                          <Option value="V1">一級分類</Option>
                          <Option value="V2">二級分類</Option>
                      </Select>
                  </Form.Item>
                  <Form.Item label="父分類名稱">
                      <Select className='add-category-select' defaultValue={this.state.pid} value={this.state.pid}
                        onSelect = {this.setParentId}
                      >
                          {
                              parentList.map(item => (
                                  <Option key ={item.id} value={item.id}>{item.name}</Option>
                              ))
                          }
                      </Select>
                  </Form.Item>
                  <Button type="primary" className="add-category-submit-btn" onClick={this.onClickSubmit}>確定</Button>
              </Form>
          </Card>
        </div>
      );
  }
}

