import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import AddPoll from './AddPoll';
import NotFound from './NotFound';

class App extends React.PureComponent {
    constructor() {
        super();
        this.state = { userData: false };
    }
    setUserData = (userData) => {
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
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;