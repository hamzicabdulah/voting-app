import React from 'react';

const navbarStyle = {
  "fontFamily": "'Source Sans Pro', sans-serif",
  "fontWeight": "bold"
}

const Navbar = (props) => {
  return (
    <div style={navbarStyle} className="Navbar">
      <h1>Voting App</h1>
      {props.userData && <a href="/api/logout">Logout</a>}
      {!props.userData && <a href="/login">Login</a>}
      {!props.userData && <a href="/signup">Signup</a>}
    </div>
  );
}

export default Navbar;