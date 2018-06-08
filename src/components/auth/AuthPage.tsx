import * as React from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import GlobalStyles from '../../global-styles-variables';
import axios from 'axios';

const mainContainerStyles: object = {
  backgroundColor: GlobalStyles.colours.blue,
  color: GlobalStyles.colours.black,
  width: '100%',
  height: '100vh',
  fontSize: '14px',
  padding: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const authStyles: object = {
  backgroundColor: GlobalStyles.colours.white,
  color: GlobalStyles.colours.black,
  borderRadius: GlobalStyles.dimentions.borderRadius,
  width: '30%',
  overflow: 'hidden'
};

const authHead: object = {
  padding: '15px',
  backgroundColor: GlobalStyles.colours.red,
  color: GlobalStyles.colours.white
};

const authHeader: object = {
  margin: 0,
  textAlign: 'center'
};

const navPanelStyles: object = {
  display: 'flex',
  justifyContent: 'space-around'
};

const navItemStyles: object = {
  backgroundColor: GlobalStyles.colours.lightGrey,
  width: '100%',
  padding: '15px',
  textAlign: 'center',
  textDecoration: 'none',
  color: GlobalStyles.colours.grey
};

const active: object = {
  backgroundColor: GlobalStyles.colours.white,
  color: GlobalStyles.colours.black
};

class AuthPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    if (localStorage.user_token_chat_app) {
      axios.post('http://localhost:8000/api/auth/verify', {
        token: localStorage.user_token_chat_app
      })
      .then(res => {
        this.props.history.push('/home');
      });
    } 
  }

  render() {
    return (
    <div style={mainContainerStyles}>
      <div style={authStyles}>  
        <div style={authHead}>
          <h2 style={authHeader}>Welcome to the chat!</h2>
        </div>
        <div style={navPanelStyles}>
          <NavLink style={navItemStyles} to='/auth/register' activeStyle={active}>
            Register
          </NavLink>
          <NavLink style={navItemStyles} to='/auth/login' activeStyle={active}>
            Login
          </NavLink>
        </div>
        <Switch>
          <Route path='/auth/register' component={Register}/>
          <Route path='/auth/login' component={Login}/>
          <Route path='/' render={() => <Redirect to='/auth/login' />} />
        </Switch>
      </div>
    </div>
    );
  }
}

export default AuthPage;