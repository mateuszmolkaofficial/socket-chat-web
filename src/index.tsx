import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';

const email = (state = 'test', action: any) => {
  switch (action.type) {
    case 'UPDATE':
      return state = action.email;
    case 'CLEAR':
      return state = '';
    default:
      return state;
    }
};

const store = createStore(email);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
