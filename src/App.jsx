import React from 'react';
import './App.css';
import {HashRouter as Router, Route} from 'react-router-dom';
import Login from './user/Login';
import './styles/all.scss';

class App extends React.Component{
  render(){
      return(
        <Router>
          <div>
            <Route path="/" exact component={Login}/>
          </div>
        </Router>
      );
  }
}
export default App;
