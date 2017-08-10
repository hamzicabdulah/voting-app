import React from 'react';
import axios from 'axios';
import { MdDelete, MdAddCircle } from 'react-icons/lib/md';
import { Chart } from 'react-google-charts';
import { pollStyle as style } from './styles';

class Poll extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        question: '',
        username: '',
        data: [],
        optionIds: []
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
                username: response.data.username,
                data: [['Option', 'Number of Votes']].concat(response.data.options.map((option) => {
                    return [option.name, option.voters.length];
                })),
                optionIds: response.data.options.map((option) => {
                    return option._id;
                })
            });
        })
        .catch((err)=> {
            console.log(err);
        })
    }
  }

  vote(pollId, optionId) {
    axios.post('/api/vote', { pollId, optionId })
    .then((response) => {
        console.log(response.data);
        this.setState({ 
            data: [['Option', 'Number of Votes']].concat(response.data.options.map((option) => {
                return [option.name, option.voters.length];
            }))
        });
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
                    {this.state.data.map((pair, index) => {
                        if (index > 0)
                            return <button key={pair[0] + index} style={style.voteBtn} onClick={() => this.vote(this.id, this.state.optionIds[this.state.data.indexOf(pair) - 1])}>{pair[0]}</button>;
                    })}
                </div> 
                <div className="iconBtns">
                    {(localStorage.getItem('userData') !== 'false') && 
                        (JSON.parse(localStorage.getItem('userData')).local.username === this.state.username) &&
                        <MdDelete style={style.trash} onClick={() => this.deletePoll(this.id)} />}
                    <MdAddCircle style={style.add} />
                </div>
            </div>
            <div className="Results" style={style.results}>
                <Chart
                    chartType="PieChart"
                    data={this.state.data}
                    options={{}}
                    width="100%"
                    height="400px"
                />
            </div>
        </div>
    );
  }
}

export default Poll;