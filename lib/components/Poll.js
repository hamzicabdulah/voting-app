import React from 'react';
import axios from 'axios';
import { pollStyle as style } from './styles';

class Poll extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        question: '',
        options: {},
        userId: ''
    };
    this.id = this.props.match.params.id;
    this.vote = this.vote.bind(this);
    this.deletePoll = this.deletePoll.bind(this);
  }

  componentDidMount() {
    if (this.id.match(/^[0-9a-fA-F]{24}$/)) {
        axios.get('/api/poll/' + this.id)
        .then((response) => {
            this.setState({ 
                question: response.data.question,
                options: response.data.options,
                userData: response.data.userId
            });
        })
        .catch((err)=> {
            console.log(err);
        })
    }
  }

  vote(id, option) {
    axios.post('/api/vote', { id, option })
    .then((response) => {
        console.log(response.data.options);
        this.setState({ options: response.data.options });
    })
    .catch((err)=> {
        console.log(err);
    })
  }
  deletePoll(id) {
    axios.delete('/api/poll/' + id)
    .then((response) => {
        window.location.href = '/';
    })
    .catch((err)=> {
        console.log(err);
    })
  }
  render() {
    return (
        <div className="Poll" style={style.pollDiv}>
            <div style={style.voteDiv}>
                <h1>{this.state.question}</h1>
                <div className="Options">
                    {Object.keys(this.state.options).map((option, index) => {
                        return <button key={option + index} onClick={() => this.vote(this.id, option)}>{option}</button>;
                    })}
                </div>
                {(localStorage.getItem('userData')) && <button onClick={() => this.deletePoll(this.id)}>Delete</button>}
            </div>
            <div className="Results" style={style.results}>
                <div className="Options">
                    {Object.keys(this.state.options).map((option, index) => {
                        return <p key={option + index}>{option + ': ' + this.state.options[option].length}</p>;
                    })}
                </div>
            </div>
        </div>
    );
  }
}

export default Poll;