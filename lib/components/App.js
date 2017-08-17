import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './Navbar';
import Home from './Home';
import Polls from './Polls';
import Login from './Login';
import NewPoll from './NewPoll';
import Poll from './Poll';

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
                        <Route exact path="/" component={Home}/>
                        <Route path="/all-polls" component={Polls} />
                        {!this.state.userData && <Route path="/login" component={(props) => <Login {...props} setUserData={this.setUserData}/>} />}
                        <Route path="/user/:username" component={Polls} />
                        {this.state.userData && <Route path="/new-poll" component={NewPoll} />}
                        <Route path="/poll/:id" component={Poll} />
                        <Route path="*" render={() => <Redirect to="/" />} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;