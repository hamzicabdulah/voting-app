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
        userId: '',
        data: []
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
                userId: response.data.userId,
                data: [['Option', 'Number of Votes']].concat(response.data.options.map((option, index) => {
                    return [option, response.data.votes[index].length];
                }))
            });
        })
        .catch((err)=> {
            console.log(err);
        })
    }
  }

  vote(id, optionIndex) {
    axios.post('/api/vote', { id, optionIndex })
    .then((response) => {
        console.log(response.data);
        this.setState({ 
            data: [['Option', 'Number of Votes']].concat(response.data.options.map((option, index) => {
                return [option, response.data.votes[index].length];
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
                            return <button key={pair[0] + index} style={style.voteBtn} onClick={() => this.vote(this.id, this.state.data.indexOf(pair))}>{pair[0]}</button>;
                    })}
                </div> 
                <div className="iconBtns">
                    {(JSON.parse(localStorage.getItem('userData'))._id === this.state.userId) &&
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