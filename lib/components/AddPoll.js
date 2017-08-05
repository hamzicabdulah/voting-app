import React from 'react';
import axios from 'axios';
import { formStyle as style } from './styles';

class AddPoll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            option: '',
            options: []
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
        axios.post('/api/poll', {
             question: this.state.question,
             options: this.state.options
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
        event.preventDefault();
    }
    handleOptionAdd() {
        this.setState({ 
            options: this.state.options.concat([this.state.option]), 
            option: ''
        }, () => {
        });
    }
    render() {
        return (
            <div className="AddPoll" style={style.form}>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label style={style.label}>Question</label>
                        <input style={style.input} type="text" name="question" onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        <label style={style.label}>Options</label>
                        <div style={style.options}>
                            <input value={this.state.option} style={style.optionsInput} type="text" name="option" onChange={this.handleInputChange}/>
                            <p style={style.optionsBtn} onClick={this.handleOptionAdd}>Add</p>
                        </div>
                        <div>
                            {this.state.options.map((option, index) => {
                                return <h4 key={index}>{option}</h4>;
                            })}
                        </div>
                    </div>
                    <button style={style.submit} type="submit">Submit Poll</button>
                </form>
            </div>
        );
    }
}

export default AddPoll;