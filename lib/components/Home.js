import React from 'react';
import axios from 'axios';

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
      })
  }
  render() {
    return (
        <div className="Homepage">
            {this.state.polls.map((poll) => {
              return (
                <div className="Poll" key={poll._id}>
                  <h1>{poll.question}</h1>
                </div>
              );
            })}
        </div>
    );
  }
}

export default Home;