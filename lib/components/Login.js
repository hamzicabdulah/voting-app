import React from 'react';
import axios from 'axios';
import { formStyle as style } from './styles';

function isValid(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginUsername: '',
            loginPassword: '',
            loginNotification: '',
            signupUsername: '',
            signupEmail: '',
            signupPassword: '',
            signupConfirmPassword: '',
            signupNotification: ''
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
        if (this.state.loginUsername.length < 1) {
            this.setState({ loginNotification: 'Username field can\'t be left empty.' });
        } else if (this.state.loginPassword.length < 1) {
            this.setState({ loginNotification: 'Password field can\'t be left empty.' });
        } else {
            axios.post('/api/login', {
                username: this.state.loginUsername,
                password: this.state.loginPassword
            })
            .then((response) => {
                this.props.setUserData(response.data.userData);
            })
            .catch((err) => {
                console.log(err);
                this.setState({ loginNotification: 'Invalid username or password.' });
            });
        }
        event.preventDefault();
    }
    handleSignup(event) {
        if (this.state.signupUsername.length < 1) {
            this.setState({ signupNotification: 'Username field can\'t be left empty.' });
        } else if (this.state.signupEmail.length < 1) {
            this.setState({ signupNotification: 'Email address field can\'t be left empty.' })
        } else if (!isValid(this.state.signupEmail)) {
            this.setState({ signupNotification: 'Email address is not valid.' })
        } else if (this.state.signupPassword.length < 1 || this.state.signupConfirmPassword.length < 1) {
            this.setState({ signupNotification: 'Password field can\'t be left empty.' });
        } else if (this.state.signupPassword !== this.state.signupConfirmPassword) {
            this.setState({ signupNotification: 'Passwords do not match.' });
        } else {
            axios.post('/api/signup', {
                username: this.state.signupUsername,
                password: this.state.signupPassword,
                email: this.state.signupEmail
            })
            .then((response) => {
                this.props.setUserData(response.data.userData);
            })
            .catch((err) => {
                console.log(err);
                this.setState({ signupNotification: 'Username not available. Please choose a different one.' });
            });
        }
        event.preventDefault();
    }
    render() {
        return (
            <div className="UserForms" style={style.formsContainer}>
                <div className="Login" style={style.form}>
                    <form onSubmit={this.handleLogin}>
                        <div>
                            <label style={style.label}>Username</label>
                            <input style={style.input} type="text" name="loginUsername" placeholder="Username" onChange={this.handleInputChange}/>
                        </div>
                        <div>
                            <label style={style.label}>Password</label>
                            <input style={style.input} type="password" name="loginPassword" placeholder="Password" onChange={this.handleInputChange}/>
                        </div>
                        <button style={style.submit} type="submit">Login</button>
                        <p>{this.state.loginNotification}</p>
                    </form>
                </div>
                <div className="Signup" style={style.form}>
                    <form onSubmit={this.handleSignup}>
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
                        <button style={style.submit} type="submit">Signup</button>
                        <p>{this.state.signupNotification}</p>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;