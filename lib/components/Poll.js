import React from 'react';
import axios from 'axios';

class Poll extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        question: '',
        options: {}
    };
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        axios.get('/api/poll/' + id)
        .then((response) => {
            this.setState({ 
                question: response.data.question,
                options: response.data.options
            });
        })
        .catch((err)=> {
            console.log(err);
        })
    }
  }
  render() {
    return (
        <div className="Poll">
            <h2>{this.state.question}</h2>
            <div className="Options">
                {Object.keys(this.state.options).map((option, index) => {
                        return <p key={option + index}>{option + ': ' + this.state.options[option]}</p>;
                })}
            </div>
        </div>
    );
  }
}

export default Poll;