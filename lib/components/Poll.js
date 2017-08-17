import React from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import { Button } from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';
import { pollStyle as style } from './styles';

class Poll extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        question: '',
        username: '',
        voters: [],
        data: [],
        optionIds: [],
        newOption: '',
        addOptionInput: 'none'
    };
    this.id = this.props.match.params.id;
    this._notificationSystem = null;
    this.vote = this.vote.bind(this);
    this.deletePoll = this.deletePoll.bind(this);
    this.toggleAddOptionElement = this.toggleAddOptionElement.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOptionAdd = this.handleOptionAdd.bind(this);
    this._addNotification = this._addNotification.bind(this);
  }

  componentDidMount() {
    if (this.id.match(/^[0-9a-fA-F]{24}$/)) {
        axios.get('/api/poll/' + this.id)
        .then((response) => {
            this.setState({ 
                question: response.data.question,
                username: response.data.username,
                voters: response.data.voters,
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
    if (localStorage.getItem('userData') !== 'false') {
        axios.post('/api/vote', { pollId, optionId })
        .then((response) => {
            if (response.data.options) {
                this.setState({ 
                    voters: response.data.voters,
                    data: [['Option', 'Number of Votes']].concat(response.data.options.map((option) => {
                        return [option.name, option.voters.length];
                    }))
                });
                this._addNotification('Your vote has been submitted.', 'success');
            } else {
                this._addNotification('You have already voted on this poll.', 'error');
            }
        })
        .catch((err)=> {
            console.log(err);
        })
    } else {
        this._addNotification('You have to be logged in in order to vote.', 'error');
    }
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

  toggleAddOptionElement() {
    this.setState({ addOptionInput: (this.state.addOptionInput === 'none') ? 'block' : 'none' });
  }

  handleInputChange(event) {
    this.setState({
        newOption: event.target.value
    });
  }

  handleOptionAdd(event) {
    if (this.state.newOption.length > 0) {
        let pollId = this.id;
        axios.post('/api/addOption', {
            pollId,
            option: this.state.newOption
        })
        .then((response) => {
            this.setState({
                data: [['Option', 'Number of Votes']].concat(response.data.options.map((option) => {
                    return [option.name, option.voters.length];
                })),
                optionIds: response.data.options.map((option) => {
                    return option._id;
                }),
                newOption: '',
                addOptionInput: 'none'
            });
            this._addNotification('Your option has been added.', 'success');
        })
        .catch((err) => {
            console.log(err);
        });
    } else {
        this._addNotification('Please insert an option first.', 'error');
    }
    event.preventDefault();
  }

  _addNotification(message, level) {
    if (this._notificationSystem) {
      this._notificationSystem.addNotification({
        message,
        level
      });
    }
  }

  render() {
    return (this.state.data.length) > 0 && (
        <div className="Container">
            <div className="Poll" style={style.pageContainer}>
                <div style={{ marginBottom: "2em" }}>
                    <div style={style.poll} className="PollCard">
                        <div style={style.question}>{this.state.question}</div>
                        <div className="Options" style={style.options}>
                            {this.state.data.map((pair, index) => {
                                if (index > 0)
                                    return <Button key={pair[0] + index} style={style.voteBtn} onClick={() => this.vote(this.id, this.state.optionIds[this.state.data.indexOf(pair) - 1])}>{pair[0]}</Button>;
                            })}
                        </div> 
                    </div>
                    <div className="iconBtns">
                        {(localStorage.getItem('userData') !== 'false') && 
                            (JSON.parse(localStorage.getItem('userData')).local.username === this.state.username) &&
                            <Button bsStyle="primary" style={style.button} onClick={() => this.deletePoll(this.id)}>Delete</Button>}
                        {(localStorage.getItem('userData') !== 'false') &&
                            <Button bsStyle="primary" style={style.button} onClick={this.toggleAddOptionElement}>Add Option</Button>}
                    </div>
                    <form onSubmit={this.handleOptionAdd} style={{ ...style.inputContainer, display: this.state.addOptionInput }}>
                        <input value={this.state.newOption} onChange={this.handleInputChange} style={ style.input } placeholder='Option'/>
                        <Button type="submit" bsStyle="primary" style={style.submit}>Submit</Button>
                    </form>
                </div>
                {this.state.voters.length > 0 &&
                    <div className="Results" style={style.results}>
                        <Chart
                            chartType="PieChart"
                            data={this.state.data}
                            options={{ title: 'Number of Votes' }}
                            width="100%"
                        />
                    </div>
                }
            </div>
            <NotificationSystem ref={n => this._notificationSystem = n} style={style.notification} />
        </div>
    );
  }
}

export default Poll;