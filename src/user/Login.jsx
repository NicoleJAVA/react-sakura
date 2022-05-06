import React from 'react';
import ReactDOM from 'react-dom';
import {Card, Input, Icon, Button, message} from 'antd';
import axios from 'axios';
import ApiUrl from '../config/api_url';

export default class Login extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    };
  }

  checkLogin = () => {
    if (this.isBlank(this.state.userName)) {
      message.error('帳號不能為空');
      return false;
    } else if (this.isBlank(this.state.password)) {
      message.error('密碼不能為空');
      return false;
    }


    let dataProps = {
      'username': this.state.userName,
      'password': this.state.password,
    };
    console.log('dataProps', dataProps); // todo dele

    axios({
      method: 'post',
      url: ApiUrl.USER_LOGIN,
      data: dataProps,
    }).then(res => {
      console.log(res.data);
      let data = res.data.data;
      if (res.data.code === 0) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('username', data.username );

        const {history} = this.props;
        history.push({pathname: '/admin'});
      } else {
        message.error('帳號或密碼錯誤');
      }
    });
  };

   isBlank = function(str ){
    return (!!!str || /^\s*$/.test(str));
  }

  setUserName = (name) => {
    this.setState({
      userName: name,
    });
  };

  setPassword = (password) => {
    this.setState({
      password: password,
    });
  };

  render(){
      return(
        <div className="login-box">
          <Card className='login-card' title="後台管理登入" bordered={true}>
            <Input
              id="userName"
              size="large"
              placeholder='請輸入帳號'
              prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0, 0.25)'}}/>}
              onChange={(e) => {this.setUserName(e.target.value)}}
            />
            <br/><br/>
            <Input.Password
              id="password"
              size="large"
              placeholder='請輸入密碼'
              prefix={<Icon type="key" style={{color: 'rgba(0, 0, 0, 0.25)'}}/>}
              onChange={(e) => {this.setPassword(e.target.value)}}
            />
            <br/><br/>
            <Button type='primary' size="large" block onClick={this.checkLogin}>Login</Button>
          </Card>
        </div>
      );
  }
}

