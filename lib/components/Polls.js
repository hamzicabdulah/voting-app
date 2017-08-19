import React from 'react';
import axios from 'axios';
import { pollListStyle as style } from './styles';
import { Button } from 'react-bootstrap';

class Polls extends React.Component {
  constructor(props) {
    super(props);
    this.state = { polls: [] };
    this.username = this.props.match.params.username;
  }
  componentDidMount() {
    if (this.username) {
      axios.get('/api/polls/' + this.username)
        .then((response) => {
          this.setState({ polls: response.data });
        })
        .catch((err)=> {
          console.log(err);
        });
    } else {
      axios.get('/api/polls')
        .then((response) => {
          this.setState({ polls: response.data });
        })
        .catch((err)=> {
          console.log(err);
        });
    }
  }
  render() {
    return (
        <div className="Polls">
          <div style={style.table}>
            {this.state.polls.map((poll) => {
              return (
                <div className="Poll" key={poll._id} style={
                    (poll.question.length > 60) ? {...style.poll, minHeight: "15.5em"} : {...style.poll, minHeight: "12.5em"}
                }>
                  <div style={style.question}>{poll.question}</div>
                  <div style={style.footer}>
                    <Button bsStyle="default" href={'/poll/' + poll._id} style={style.voteBtn}>Vote</Button>
                    <p style={style.footerChild}>
                      Added by: <a href={'/user/' + poll.username}>{poll.username}</a>
                    </p>
                    <p style={style.footerChild}>
                      Total votes: {poll.voters.length}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    );
  }
}

export default Polls;