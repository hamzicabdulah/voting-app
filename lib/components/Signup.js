import React from 'react';

class Signup extends React.Component {
  render() {
    return (
        <div className="signup">
            <form action="/api/signup" method="post">
                <div>
                    <label>Username</label>
                    <input type="text" name="username"/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password"/>
                </div>
            
                <button type="submit">Register</button>
            </form>
        </div>
    );
  }
}

export default Signup;