import React from 'react';
import axios from 'axios';
import { formStyle as style } from './styles';

class AddPoll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            option: '',
            options: [],
            notification: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOptionAdd = this.handleOptionAdd.bind(this);
    }
    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        if (this.state.question.length < 10) {
            this.setState({ notification: 'Your question must be at least 10 characters long.' });
        } else if (this.state.options.length < 2) {
            this.setState({ notification: 'Your poll must contain at least two different options.' });
        } else {
            axios.post('/api/poll', {
                question: this.state.question,
                options: this.state.options
            })
            .then((response) => {
                window.location.href = '/poll/' + response.data._id;
            })
            .catch((err) => {
                console.log(err);
            });
        }
        event.preventDefault();
    }
    handleOptionAdd() {
        if (this.state.option.length > 0) {
            this.setState({ 
                options: this.state.options.concat([this.state.option]), 
                option: ''
            });
        }
    }
    render() {
        return (
            <div className="AddPoll" style={style.form}>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label style={style.label}>Question</label>
                        <input style={style.input} type="text" name="question" placeholder="What's the crappiest name for a voting app?" onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        <label style={style.label}>Options</label>
                        <div style={style.options}>
                            <input value={this.state.option} style={style.optionsInput} type="text" name="option" placeholder="Pollo" onChange={this.handleInputChange}/>
                            <p style={style.optionsBtn} onClick={this.handleOptionAdd}>Add</p>
                        </div>
                        <div>
                            {this.state.options.map((option, index) => {
                                return <p style={style.option} key={index}>{option}</p>;
                            })}
                        </div>
                    </div>
                    <button style={style.submit} type="submit">Submit Poll</button>
                    <p>{this.state.notification}</p>
                </form>
            </div>
        );
    }
}

export default AddPoll;