import React from 'react';
import axios from 'axios';
import { homeStyle as style } from './styles';

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
          <table style={style.table}>
            <tbody>
              <tr>
                <th style={style.questionTh}>Question</th>
                <th style={style.totalVotes}>Total Votes</th>
              </tr>
              {this.state.polls.map((poll) => {
                return (
                  <tr className="Poll" key={poll._id} style={style.row}>
                    <td><a href={'/poll/' + poll._id} style={style.question}>{poll.question}</a></td>
                    <td style={style.totalVotes}>{Object.keys(poll.options).reduce(function(totalVotes, option) {
                      return totalVotes + poll.options[option].length;
                    }, 0)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
    );
  }
}

export default Home;