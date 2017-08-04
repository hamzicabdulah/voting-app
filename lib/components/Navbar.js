import React from 'react';

const Navbar = (props) => {
  if (props.userData) {
    return (
      <div className="Navbar">
          <a href="/api/logout">Logout</a>
      </div>
    );
  } else {
    return (
      <div className="Navbar">
          <a href="/login">Login</a>
          <a href="/signup">Signup</a>
      </div>
    );
  }
}

export default Navbar;