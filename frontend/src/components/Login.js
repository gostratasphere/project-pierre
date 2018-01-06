import React, { Component } from 'react'
import './Login.css'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.submitLogin = this.submitLogin.bind(this)
  }

  componentWillMount () {
    this.setState({
      username: '',
      password: '',
      message: '',
      messageClass: ''
    })
  }

  submitLogin () {
    let that = this
    if (this.state.username && this.state.password) {
      console.log(this.state.username)
      console.log(this.state.password)
      this.setState({username: '', password: '', message: 'success', messageClass: 'success'})
      // console.log(this.getState('password'))
    } else {
      console.log('username or password are blank')
      this.setState({message: 'failure', messageClass: 'failure'})
    }
    window.setTimeout(function () {
      that.setState({message: ''})
    }, 2000)
  }

  handleChange (event) {
    console.log(event)
    if (event.target) {
      if (event.target.name === 'username') {
        this.setState({username: event.target.value})
      }
      if (event.target.name === 'password') {
        this.setState({password: event.target.value})
      }
    }
  }

  componentDidUpdate () {
    console.log(this.state)
  }

  render () {
    return (
      <div className='login-form'>
        <h1>Login</h1>
        <label>Username: </label>
        <input name='username' onChange={this.handleChange} value={this.state.username} />
        <label>Password: </label>
        <input name='password' onChange={this.handleChange} value={this.state.password} />
        <button name='submit' onClick={this.submitLogin}>login</button>
        <div className={this.state.messageClass}>
          {this.state.message}
        </div>
      </div>
    )
  }
}

export default Login
