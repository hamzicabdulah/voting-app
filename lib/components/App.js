import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';

class App extends React.PureComponent {
    constructor() {
        super();
        this.state = { userData: {} };
    }
    componentDidMount() {
        axios.get('/api/userData')
            .then((response) => {   
                this.setState({userData: response.data});
            })
            .catch((err) => {
                console.log(err);
            });
    }
    render() {
        return (
            <div>
                <Navbar userData={this.state.userData}/>
                <BrowserRouter>
                    <div>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;