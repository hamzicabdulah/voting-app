import React from 'react';
import axios from 'axios';
import { formStyle as style } from './styles';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginUsername: '',
            loginPassword: '',
            signupUsername: '',
            signupPassword: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
    }
    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }
    handleLogin(event) {
        axios.post('/api/login', {
             username: this.state.loginUsername,
             password: this.state.loginPassword
        })
        .then((response) => {
            this.props.setUserData(response.data.userData);
        })
        .catch((err) => {
            console.log(err);
        });
        event.preventDefault();
    }
    handleSignup(event) {
        axios.post('/api/signup', {
             username: this.state.signupUsername,
             password: this.state.signupPassword
        })
        .then((response) => {
            this.props.setUserData(response.data.userData);
        })
        .catch((err) => {
            console.log(err);
        });
        event.preventDefault();
    }
    render() {
        return (
            <div className="UserForms" style={style.formsContainer}>
                <div className="Login" style={style.form}>
                    <form onSubmit={this.handleLogin}>
                        <div>
                            <label style={style.label}>Username</label>
                            <input style={style.input} type="text" name="loginUsername" onChange={this.handleInputChange}/>
                        </div>
                        <div>
                            <label style={style.label}>Password</label>
                            <input style={style.input} type="password" name="loginPassword" onChange={this.handleInputChange}/>
                        </div>
                    
                        <button style={style.submit} type="submit">Login</button>
                    </form>
                </div>
                <div className="Signup" style={style.form}>
                    <form onSubmit={this.handleSignup}>
                        <div>
                            <label style={style.label}>Username</label>
                            <input style={style.input} type="text" name="signupUsername" onChange={this.handleInputChange}/>
                        </div>
                        <div>
                            <label style={style.label}>Password</label>
                            <input style={style.input} type="password" name="signupPassword" onChange={this.handleInputChange}/>
                        </div>
                    
                        <button style={style.submit} type="submit">Signup</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;