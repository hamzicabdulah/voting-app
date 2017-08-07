import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import AddPoll from './AddPoll';
import Poll from './Poll';

class App extends React.PureComponent {
    constructor() {
        super();
        let localStorageUserData = localStorage.getItem('userData');
        this.state = { userData: (localStorageUserData && localStorageUserData !== 'false') ? localStorageUserData : false };
    }
    setUserData = (userData) => {
        localStorage.setItem('userData', userData);
        this.setState({ userData });
    }
    render() {
        return (
            <div>
                <Navbar userData={this.state.userData} setUserData={this.setUserData}/>
                <BrowserRouter>
                    <div>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={(props) => <Login {...props} setUserData={this.setUserData}/>} />
                        <Route path="/add-poll" component={AddPoll} />
                        <Route path="/poll/:id" component={Poll} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;