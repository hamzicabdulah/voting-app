import React from 'react';
import axios from 'axios';
import { Navbar, Nav, NavItem, MenuItem } from 'react-bootstrap';

const NavigationBar = (props) => {
  const logout = function() {
    axios.get('/api/logout')
    .then((response) => {
        console.log(response.data.userData);
        props.setUserData(response.data.userData);
    })
    .catch((err) => {
        console.log(err);
    });
  }
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          {window.location.pathname !== '/' && <a href="/">Pollo</a>}
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <li role="presentation"><a href="/">Home</a></li>
          <li role="presentation"><a href="/all-polls">All Polls</a></li>
          {props.userData && <li role="presentation"><a href={'/user/' + JSON.parse(localStorage.getItem('userData')).local.username}>My Polls</a></li>}
          {props.userData && <li role="presentation"><a href="/new-poll">New Poll</a></li>}
          {props.userData && <li role="presentation"><a onClick={logout}>Logout</a></li>}
          {!props.userData && <li role="presentation"><a href="/login">Login</a></li>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;