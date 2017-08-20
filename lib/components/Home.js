import React from 'react';
import { homeStyle as style } from './styles';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Home extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
      document.querySelector('#root').className = 'root-styled';
    }
    render() {
        return (
            <div className="Home">
                <h1 style={style.header}>Pollo</h1>
                <p style={style.paragraph}>See poll results, vote for your favorite options, add new options to
                  existing polls, or create your own polls. {
                    !sessionStorage.getItem('userData') && 
                      <span>Sign up to get access to all features.</span>
                }</p>                                                   
                {!sessionStorage.getItem('userData') && 
                    <Link to='/login'><Button bsStyle="default" style={style.btn}>Sign up</Button></Link>}
                <Link to='/all-polls'><Button bsStyle="default" style={style.btn}>All Polls</Button></Link>
            </div>
        );
    }
}

export default Home;