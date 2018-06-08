import * as React from 'react';
import GlobalStyles from '../../global-styles-variables';
import RegisterData from '../../models/register-data';
import axios from 'axios';
import { connect } from 'react-redux';

const registerContainerStyles: object = {
  padding: '15px'
};

const inputStyles: object = GlobalStyles.sharedComponentStyles.input;
const flexEnd: object = GlobalStyles.sharedComponentStyles.flexEnd;
const buttonStyles: object = GlobalStyles.sharedComponentStyles.button;

class Register extends React.Component<any, RegisterData> {
  private myFormRef: HTMLFormElement;

  constructor(props: any) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
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
    axios.post('http://localhost:8000/api/auth/register', {
      email: this.state.email, 
      password: this.state.password
    })
    .then(res => {
      localStorage.setItem('user_token_chat_app', res.data.token);
      this.props.update(res.data.email);
      this.clearForm();
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
      <div style={registerContainerStyles}>
        <form 
          onSubmit={this.handleSubmit}
          ref={(el: HTMLFormElement) => {
            this.myFormRef = el;
          }}
        >
          <label htmlFor='register-email'>Your email:</label>
          <input 
            id='register-email' 
            name='email'
            onChange={this.handleFormChange}
            style={inputStyles} 
            type='text'
          />
          <label htmlFor='register-password'>Password:</label>
          <input 
            id='register-password'
            name='password' 
            onChange={this.handleFormChange}
            style={inputStyles} 
            type='password'
          />
          <label htmlFor='register-password-confirm'>Confirm password:</label>
          <input 
            id='register-password-confirm' 
            name='confirmPassword'
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
                !this.state.password || 
                !this.state.confirmPassword ||
                this.state.confirmPassword !== this.state.password 
              }
            >
              Submit
            </button>
          </div>        
        </form>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    email: state
    };
  }

function mapDispatchToProps(dispatch: any) {
  return {
    update: (email: string) => dispatch({type: 'UPDATE', email: email}),
    clear: () => dispatch({type: 'CLEAR'})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);