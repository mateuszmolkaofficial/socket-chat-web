import * as React from 'react';
import GlobalStyles from '../../global-styles-variables';
import LoginData from '../../models/login-data';
import axios from 'axios';

const loginContainerStyles: object = {
  padding: '15px'
};

const inputStyles: object = GlobalStyles.sharedComponentStyles.input;
const flexEnd: object = GlobalStyles.sharedComponentStyles.flexEnd;
const buttonStyles: object = GlobalStyles.sharedComponentStyles.button;

class Login extends React.Component<any, LoginData> {
  private myFormRef: HTMLFormElement;

  constructor(props: any) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateEmail(email: string): boolean {
    // tslint:disable-next-line:max-line-length
    const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(String(email).toLowerCase());
  }

  handleFormChange(event: React.FormEvent<HTMLInputElement>): void {
    const target = event.target;
    this.setState({
      [target['name']]: target['value']
    });
    event.preventDefault();
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    axios.post('http://localhost:8000/api/auth/login', {
      email: this.state.email, 
      password: this.state.password
    })
    .then(res => {
      this.clearForm();
      localStorage.setItem('user_token_chat_app', res.data.token);
      this.props.history.push('/home');
    })
    .catch(err => {
      if (err.response) {
        console.log(err.response);
      }
    });

    event.preventDefault();
  }

  clearForm = () => {
    this.setState({email: '', password: ''});
    this.myFormRef.reset();
  }

  render() {
    return (
      <div style={loginContainerStyles}>
        <form 
          onSubmit={this.handleSubmit}
          ref={(el: HTMLFormElement) => {
            this.myFormRef = el;
          }}
        >
          <label htmlFor='login-email'>Your email:</label>
          <input 
            id='login-email' 
            name='email'
            onChange={this.handleFormChange}
            style={inputStyles} 
            type='text'
          />
          <label htmlFor='register-password-confirm'>Your password:</label>
          <input 
             id='login-password'
             name='password' 
             onChange={this.handleFormChange}
             style={inputStyles} 
             type='password'
          />
          <div style={flexEnd}>
            <button 
              style={buttonStyles}
              disabled={
                !this.state.email ||
                !this.validateEmail(this.state.email) ||
                !this.state.password
              }
            >
              Login
            </button>
          </div> 
        </form>   
      </div>
    );
  }
}

export default Login;