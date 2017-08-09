import React from 'react';
import axios from 'axios';
import { MdDelete, MdAddCircle } from 'react-icons/lib/md';
//import { Doughnut } from 'react-chartjs-2';
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
                userId: response.data.userId
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
                <h2>{this.state.question}</h2>
                <div className="Options">
                    {Object.keys(this.state.options).map((option, index) => {
                        return <button key={option + index} style={style.voteBtn} onClick={() => this.vote(this.id, option)}>{option}</button>;
                    })}
                </div> 
                <div className="iconBtns">
                    {(JSON.parse(localStorage.getItem('userData'))._id === this.state.userId) &&
                        <MdDelete style={style.trash} onClick={() => this.deletePoll(this.id)} />}
                    <MdAddCircle style={style.add} />
                </div>
            </div>
            {/*<div className="Results" style={style.results}>
                <Doughnut data={{
                    labels: Object.keys(this.state.options),
                    datasets: [{
                        label: '# of Votes',
                        data: Object.values(this.state.options),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                }} />
            </div>*/}
        </div>
    );
  }
}

export default Poll;