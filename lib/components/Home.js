import React from 'react';
import axios from 'axios';
import { pollListStyle as style } from './styles';

class Home extends React.Component {
  constructor() {
    super();
    this.state = { polls: [] };
  }
  componentDidMount() {
    axios.get('/api/polls')
      .then((response) => {
        this.setState({ polls: response.data });
      })
      .catch((err)=> {
        console.log(err);
      });
  }
  render() {
    return (
        <div className="Homepage">
          <div style={style.table}>
            {this.state.polls.map((poll) => {
              return (
                <div className="Poll" key={poll._id} style={style.poll}>
                  <a href={'/poll/' + poll._id} style={style.question}>{poll.question}</a>
                  <span style={style.totalVotes}>{poll.votes.reduce(function(totalVotes, optionVotes) {
                    return totalVotes + optionVotes.length;
                  }, 0)}</span>
                </div>
              );
            })}
          </div>
        </div>
    );
  }
}

export default Home;