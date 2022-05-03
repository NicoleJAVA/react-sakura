import React from 'react';
import ReactDOM from 'react-dom';
import {Card, Input, Icon, Button, message} from 'antd';
import axios from 'axios';

export default class Login extends React.Component{

  constructor(props) {
    super(props);
  }

  render(){
      return(
        <div className="login-box">
          <Card className='login-card' title="後台管理登入" bordered={true}>
            <Input
              id="userName"
              size="large"
              placeholder='請輸入使用者名稱'
              prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0, 0.25)'}}/>}
            />
            <br/><br/>
            <Input.Password
              id="password"
              size="large"
              placeholder='請輸入密碼'
              prefix={<Icon type="key" style={{color: 'rgba(0, 0, 0, 0.25)'}}/>}
            />
            <br/><br/>
            <Button type='primary' size="large" block>Login</Button>
          </Card>
        </div>
      );
  }
}

