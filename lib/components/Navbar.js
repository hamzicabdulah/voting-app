import React from 'react';
import axios from 'axios';
import { navbarStyle as style } from './styles';

const Navbar = (props) => {
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
    <div style={style.navbar} className="Navbar">
      <h1 style={style.heading}><a style={style.headingAnchor} href="/">Pollo</a></h1>
      <div style={style.linksContainer}>
        {props.userData && <a onClick={logout} style={style.link}>Logout</a>}
        {!props.userData && <a href="/login" style={style.link}>Login</a>}
        {!props.userData && <a href="/login" style={style.link}>Signup</a>}
        <a href="/add-poll" style={style.link}>Add Poll</a>
      </div>
    </div>
  );
}

export default Navbar;