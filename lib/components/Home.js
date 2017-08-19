import React from 'react';
import { homeStyle as style } from './styles';
import { Button } from 'react-bootstrap';

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
                  existing polls, or add your own polls. {
                    !sessionStorage.getItem('userData') && 
                      <span>Sign up to get access to all features.</span>
                }</p>
                {!sessionStorage.getItem('userData') && <Button bsStyle="default" href='/login' style={style.btn}>Sign up</Button>}
                <Button bsStyle="default" href='/all-polls' style={style.btn}>All Polls</Button>
            </div>
        );
    }
}

export default Home;