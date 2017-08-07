import React from 'react';
import axios from 'axios';

class Home extends React.Component {
  constructor() {
    super();
    this.state = { polls: [] };
    this.deletePoll = this.deletePoll.bind(this);
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
  deletePoll(id) {
    axios.delete('/api/poll/' + id)
      .then((response) => {
        let polls = this.state.polls.filter((poll) => poll._id !== id);
        this.setState({ polls });
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
                  <a href={'/poll/' + poll._id}>{poll.question}</a>
                  <p onClick={() => this.deletePoll(poll._id)}>X</p>
                </div>
              );
            })}
        </div>
    );
  }
}

export default Home;