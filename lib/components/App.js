import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Router history={browserHistory}>
            </Router>
        );
    }
}

export default App;