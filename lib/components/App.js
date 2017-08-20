import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './Navbar';
import Home from './Home';
import AllPolls from './AllPolls';
import UserPolls from './UserPolls';
import Login from './Login';
import NewPoll from './NewPoll';
import Poll from './Poll';

class App extends React.PureComponent {
    constructor() {
        super();
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navbar/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/all-polls" component={AllPolls} />
                        {!sessionStorage.getItem('userData') && <Route path="/login" component={Login} />}
                        <Route path="/user/:username" component={UserPolls} />
                        {sessionStorage.getItem('userData') && <Route path="/new-poll" component={NewPoll} />}
                        <Route path="/poll/:id" component={Poll} />
                        <Route path="*" render={() => <Redirect to="/" />} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;