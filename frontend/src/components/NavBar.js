import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class NavBar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    console.log(name);
    if (name === 'events') {
      window.location.href = '/list';
    } 
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted fixed='top'>
        <Menu.Item name='login' active={activeItem === 'login'} onClick={this.handleItemClick} />
        <Menu.Item name='events' active={activeItem === 'events'} onClick={this.handleItemClick} />
      </Menu>
    )
  }
}