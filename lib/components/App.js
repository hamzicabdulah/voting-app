import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import AddPoll from './AddPoll';
import Poll from './Poll';
import UserPolls from './UserPolls';

class App extends React.PureComponent {
    constructor() {
        super();
        let localStorageUserData = JSON.parse(localStorage.getItem('userData'));
        this.state = { userData: (localStorageUserData && localStorageUserData !== 'false') ? localStorageUserData : false };
    }
    setUserData = (userData) => {
        localStorage.setItem('userData', JSON.stringify(userData));
        this.setState({ userData });
    }
    render() {
        return (
            <div>
                <Navbar userData={this.state.userData} setUserData={this.setUserData}/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        {!this.state.userData && <Route path="/login" component={(props) => <Login {...props} setUserData={this.setUserData}/>} />}
                        <Route path="/user/:id" component={UserPolls} />
                        {this.state.userData && <Route path="/add-poll" component={AddPoll} />}
                        <Route path="/poll/:id" component={Poll} />
                        <Route path="*" render={() => <Redirect to="/" />} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;