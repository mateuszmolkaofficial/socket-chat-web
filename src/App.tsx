import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import AuthPage from './components/auth/AuthPage';
import HomePage from './components/HomePage';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/home' component={HomePage}/>
        <Route path='/auth' component={AuthPage}/>
        <Route path='/' render={() => <Redirect to='/auth' />}/>
      </Switch>
    );
  }
}

export default App;
