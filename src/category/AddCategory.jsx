import React from 'react';
import {List, Avatar, Button, Row, Col, Select, Card, Input, Upload, Dividers} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import TokenHeaders from '../utils/tokenUtils';

const {Option} = Select;

export default class AddCategory extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        categoryList: [],
        modalVisible: false,
        id: '',
        image: '',
        name: '',
        level: 'V2',
        pid: '',
    };
  }

  componentDidMount() {
      this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
}

  render(){
      const uploadButton = (
          <div>
              <PlusOutlined/>
              <div className="ant-upload-text">上傳</div>
          </div>
      );
      return(
        <div className="category-layout">
          <Card></Card>
        </div>
      );
  }
}

