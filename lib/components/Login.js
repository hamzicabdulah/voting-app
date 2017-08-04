import React from 'react';

class Login extends React.Component {
  render() {
    return (
        <div className="login">
            <form action="/api/login" method="post">
                <div>
                    <label>Username</label>
                    <input type="text" name="username"/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password"/>
                </div>
            
                <button type="submit">Login</button>
            </form>
        </div>
    );
  }
}

export default Login;