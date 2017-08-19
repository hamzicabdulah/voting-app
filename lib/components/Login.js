import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';
import { formStyle as style } from './styles';

function isValid(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            loginUsername: '',
            loginPassword: '',
            signupUsername: '',
            signupEmail: '',
            signupPassword: '',
            signupConfirmPassword: ''
        };
        this._notificationSystem = null;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this._addNotification = this._addNotification.bind(this);
    }
    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }
    handleLogin(event) {
        if (this.state.loginUsername.length < 1) {
            this._addNotification('Username field can\'t be left empty.', 'error');
        } else if (this.state.loginPassword.length < 1) {
            this._addNotification('Password field can\'t be left empty.', 'error');
        } else {
            axios.post('/api/login', {
                username: this.state.loginUsername,
                password: this.state.loginPassword
            })
            .then((response) => {
                sessionStorage.setItem('userData', JSON.stringify(response.data.userData));
                window.location = '/';
            })
            .catch((err) => {
                console.log(err);
                this._addNotification('Invalid username or password.', 'error');
            });
        }
        event.preventDefault();
    }
    handleSignup(event) {
        if (this.state.signupUsername.length < 1) {
            this._addNotification('Username field can\'t be left empty.', 'error');
        } else if (this.state.signupEmail.length < 1) {
            this._addNotification('Email address field can\'t be left empty.', 'error');
        } else if (!isValid(this.state.signupEmail)) {
            this._addNotification('Email address is not valid.', 'error');
        } else if (this.state.signupPassword.length < 1 || this.state.signupConfirmPassword.length < 1) {
            this._addNotification('Password field can\'t be left empty.', 'error');
        } else if (this.state.signupPassword !== this.state.signupConfirmPassword) {
            this._addNotification('Passwords do not match.', 'error');
        } else {
            axios.post('/api/signup', {
                username: this.state.signupUsername,
                password: this.state.signupPassword,
                email: this.state.signupEmail
            })
            .then((response) => {
                sessionStorage.setItem('userData', JSON.stringify(response.data.userData));
                window.location = '/';
            })
            .catch((err) => {
                console.log(err);
                this._addNotification('Username not available. Please choose a different one.', 'error');
            });
        }
        event.preventDefault();
    }
    _addNotification(message, level) {
        if (this._notificationSystem) {
        this._notificationSystem.addNotification({
            message,
            level
        });
        }
    }
    render() {
        return (
            <div className="UserForms" style={style.formsContainer}>
                <div className="Login" style={style.form}>
                    <form onSubmit={this.handleLogin}>
                        <h2 style={style.header}>Log In</h2>
                        <div>
                            <label style={style.label}>Username</label>
                            <input style={style.input} type="text" name="loginUsername" placeholder="Username" onChange={this.handleInputChange}/>
                        </div>
                        <div>
                            <label style={style.label}>Password</label>
                            <input style={style.input} type="password" name="loginPassword" placeholder="Password" onChange={this.handleInputChange}/>
                        </div>
                        <Button bsStyle="primary" type="submit" style={style.submit}>Log In</Button>
                    </form>
                </div>
                <div className="Signup" style={style.form}>
                    <form onSubmit={this.handleSignup}>
                        <h2 style={style.header}>Sign Up</h2>
                        <div>
                            <label style={style.label}>Username</label>
                            <input style={style.input} type="text" name="signupUsername" placeholder="Username" onChange={this.handleInputChange}/>
                        </div>
                        <div>
                            <label style={style.label}>Email Address</label>
                            <input style={style.input} type="text" name="signupEmail" placeholder="Email Address" onChange={this.handleInputChange}/>
                        </div>
                        <div>
                            <label style={style.label}>Password</label>
                            <input style={style.input} type="password" name="signupPassword" placeholder="Password" onChange={this.handleInputChange}/>
                        </div>
                        <div>
                            <label style={style.label}>Confirm Password</label>
                            <input style={style.input} type="password" name="signupConfirmPassword" placeholder="Confirm Password" onChange={this.handleInputChange}/>
                        </div>
                        <Button bsStyle="primary" type="submit" style={style.submit}>Sign Up</Button>
                    </form>
                </div>
                <NotificationSystem ref={n => this._notificationSystem = n} style={style.notification} />
            </div>
        );
    }
}

export default Login;