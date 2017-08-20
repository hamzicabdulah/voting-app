import React from 'react';
import axios from 'axios';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
          {window.location.pathname !== '/' && <Link to="/">Pollo</Link>}
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <li role="presentation"><Link to="/">Home</Link></li>
          <li role="presentation"><Link to="/all-polls">All Polls</Link></li>
          {sessionStorage.getItem('userData') && <li role="presentation"><Link to={'/user/' + JSON.parse(sessionStorage.getItem('userData')).local.username}>My Polls</Link></li>}
          {sessionStorage.getItem('userData') && <li role="presentation"><Link to="/new-poll">New Poll</Link></li>}
          {sessionStorage.getItem('userData') && <li role="presentation"><a onClick={logout}>Log Out</a></li>}
          {!sessionStorage.getItem('userData') && <li role="presentation"><Link to="/login">Log In</Link></li>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;