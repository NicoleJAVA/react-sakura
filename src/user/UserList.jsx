import React from 'react';
import axios from 'axios';
import ApiUrl from '../config/api_url';
import TokenHeaders from '../utils/tokenUtils';

export default class UserList extends React.Component{

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
          method: "get",
          url: ApiUrl.USER_LIST,
          headers: TokenHeaders,
      }).then(res => {
        this.setState({
            userList: res.data.data,
        });
      });
  };

  render(){
      let {list} = this.state;
      return(
        <div>UserList</div>
      );
  }
}

