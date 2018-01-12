import React, { Component } from 'react';
import './Login.css';
import { Button, Input, Container } from 'semantic-ui-react'


class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  componentWillMount () {
    this.setState({
      username: '',
      password: '',
      message: '',
      messageClass: ''
    });
  }

  submitLogin (event) {
    let that = this;
    let element = event.target;
    element.disabled = true;
    if (this.state.username && this.state.password) {
      // add logic to login service
      console.log(this.state.username);
      console.log(this.state.password);
      this.setState({username: '', password: '', message: 'success', messageClass: 'success'});
      // console.log(this.getState('password'))
    } else {
      console.log('username or password are blank');
      this.setState({message: 'please fill out all fields', messageClass: 'failure'});
    }
    window.setTimeout(function(event) {
      that.setState({message: ''});
      element.disabled = false;
    }, 2000)
  }

  handleChange (event) {
    if (event.target) {
      if (event.target.name === 'username') {
        this.setState({username: event.target.value});
      }
      if (event.target.name === 'password') {
        this.setState({password: event.target.value});
      }
    }
  }

  componentDidUpdate () {
    // console.log(this.state);
  }

  render () {
    return (
      <Container centered>

          <h2>Login</h2>
          <Input name='username' label='Username' className='loginInput' onChange={this.handleChange} value={this.state.username} />
          <Input name='password' label='Password' className='loginInput' type='password' onChange={this.handleChange} value={this.state.password} />
          <Button name='submit' className='loginButton' onClick={this.submitLogin}>login</Button>
          <div id='notify-message' className={this.state.messageClass}>
            {this.state.message}
          </div>

      </Container>
    )
  }
}

export default Login;
