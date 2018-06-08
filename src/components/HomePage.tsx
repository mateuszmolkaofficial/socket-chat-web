import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as io from 'socket.io-client';
import GlobalStyles from '../global-styles-variables';

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

const chatContainerStyles: object = {
  width: '60%',
  height: '60%',
  backgroundColor: GlobalStyles.colours.white,
  borderRadius: '15px',
  overflow: 'hidden',
  position: 'relative'
};

const chatContainerHeader: object = {
  backgroundColor: GlobalStyles.colours.red,
  color: GlobalStyles.colours.white,
  padding: '10px',
  textAlign: 'center'
};

const userInfoContainer: object = {
  padding: '0 20px',
  borderBottom: `1px solid ${GlobalStyles.colours.red}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const chatContainerHeading: object = {
  margin: 0
};

const messagesContainer: object = {
  maxHeight: '75%',
  overflowX: 'auto',
  padding: '10px'
};

const messagesContainerSubDiv: object = {
  maxWidth: '80%',
  wordWrap: 'break-word'
};

const messageContentStyle: object = {
  margin: '0 0 0.5em',
  padding: '0',
  display: 'flex',
  justifyContent: 'space-between'
};

const messageAuthor: object = {
  fontFamily: GlobalStyles.fonts.fontMainBold,
};

const logoutButton: object = {
  fontSize: '0.9em',
  height: '2.5em',
  padding: '0.5em',
  backgroundColor: GlobalStyles.colours.red,
  color: GlobalStyles.colours.white,
  border: 'none',
  borderRadius: '5px'
};

const sendMessageContainer: object = {
  position: 'absolute',
  bottom: '0',
  backgroundColor: GlobalStyles.colours.yellow,
  width: '100%',
  padding: '6px'
};

const messageForm: object = {
  display: 'flex',
  justifyContent: 'space-around'
};

const messageInput: object = {
  width: '85%',
  height: '2em',
  fontSize: '1em',
  border: 'none',
  borderRadius: '5px'
};

const messageButton: object = {
  width: '10%',
  backgroundColor: GlobalStyles.colours.blue,
  color: GlobalStyles.colours.white,
  border: 'none',
  borderRadius: '5px'
};

class HomePage extends React.Component<any, any> {
  private socket: any;
  private myFormRef: HTMLFormElement;

  constructor(props: any) {
    super(props);

    this.socket = io('localhost:8000');
    this.socket.emit('GET_ALL_MESSAGES');

    this.socket.on('RETURN_ALL_MESSAGES', (messages: any) => {
      this.setState({messages: messages});
    });

    this.state = {
      message: '',
      messages: []
    };

    this.logout = this.logout.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (localStorage.user_token_chat_app) {
      axios.post('http://localhost:8000/api/auth/verify', {
        token: localStorage.user_token_chat_app
      })
      .then(res => {
        this.props.update(res.data.email);
      });
    } else {
      this.props.history.push('/auth/login');
    }
  }

  handleChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target;
    this.setState({message: target['value']});
  }

  logout() {
    localStorage.clear();
    this.props.history.push('/auth/login');
  }

  sendMessage(event: React.FormEvent<HTMLFormElement>) {
    if (event) { 
      event.preventDefault();
    }

    if (this.state.message) {
      this.socket.emit('SEND_MESSAGE', {
        author: this.props.email,
        text: this.state.message,
        timestamp: Date()
      });
      this.socket.emit('GET_ALL_MESSAGES');
    }
    this.clearForm();
  }

  clearForm = () => {
    this.setState({email: '', password: ''});
    this.myFormRef.reset();
  }

  generateDate = (message: any) => {
    const hoursStamp = new Date(message.timestamp).getHours();
    const hours = (hoursStamp.toString().length === 1) ? 
      '0' + hoursStamp : 
      hoursStamp;

    const minutesStamp = new Date(message.timestamp).getMinutes();
    const minutes = (minutesStamp.toString().length === 1) ? 
      '0' + minutesStamp : 
      minutesStamp;
    return hours + ':' + minutes;
  }

  _handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      this.sendMessage(event);
    }
  }

  render() {
    return (
      <div style={mainContainerStyles}>
        <div style={chatContainerStyles}>
          <div style={chatContainerHeader}>
            <h2 style={chatContainerHeading}>Welcome to the chat</h2>
          </div>
          <div style={userInfoContainer}>
            <p>Your logged in as: {this.props.email}</p>
            <button style={logoutButton} onClick={this.logout}>Log out</button>
          </div>
          <div 
            style={messagesContainer} 
            ref={(el: HTMLDivElement) => {
              if (el) {
                el.scrollTop = el.scrollHeight;
              }
            }}
          >
            {this.state.messages.map((message: any) => 
              <div key={message._id} style={messageContentStyle}>
                <div style={messagesContainerSubDiv}>
                  <span style={messageAuthor}>{message.author}</span>:&nbsp;
                  {message.text}
                </div>
                <div>
                  {this.generateDate(message)}
                </div>
              </div>
            )}
          </div>
          <div style={sendMessageContainer}>
            <form 
              style={messageForm}
              onSubmit={this.sendMessage}
              ref={(el: HTMLFormElement) => {
                this.myFormRef = el;
              }}
            >
              <input 
                style={messageInput}
                onChange={this.handleChange}
                name='message' 
                id='messageArea' 
              />
              <button style={messageButton}>Send</button>
            </form>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);