import React from 'react';
import axios from 'axios';
import { pollListStyle as style } from './styles';

class UserPolls extends React.Component {
  constructor(props) {
    super(props);
    this.state = { polls: [] };
    this.id = this.props.match.params.id;
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
        <div className="Polls">
          <div style={style.table}>
            {this.state.polls.map((poll) => {
              return (
                <div className="Poll" key={poll._id} style={style.poll}>
                  <a href={'/poll/' + poll._id} style={style.question}>{poll.question}</a>
                  <span style={style.totalVotes}>{Object.keys(poll.options).reduce(function(totalVotes, option) {
                    return totalVotes + poll.options[option].length;
                  }, 0)}</span>
                </div>
              );
            })}
          </div>
        </div>
    );
  }
}

export default UserPolls;