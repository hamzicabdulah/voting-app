import React from 'react';
import axios from 'axios';
import { Navbar, Nav, NavItem, MenuItem } from 'react-bootstrap';

const NavigationBar = () => {
  const logout = function() {
    axios.get('/api/logout')
    .then((response) => {
        sessionStorage.clear();
        window.location.href = '/';
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
          {sessionStorage.getItem('userData') && <li role="presentation"><a href={'/user/' + JSON.parse(sessionStorage.getItem('userData')).local.username}>My Polls</a></li>}
          {sessionStorage.getItem('userData') && <li role="presentation"><a href="/new-poll">New Poll</a></li>}
          {sessionStorage.getItem('userData') && <li role="presentation"><a onClick={logout}>Log Out</a></li>}
          {!sessionStorage.getItem('userData') && <li role="presentation"><a href="/login">Log In</a></li>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;