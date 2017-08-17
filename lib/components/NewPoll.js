import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { MdClear } from 'react-icons/lib/md';
import NotificationSystem from 'react-notification-system';
import { formStyle as style } from './styles';

class NewPoll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            option: '',
            options: [],
        };
        this._notificationSystem = null;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOptionAdd = this.handleOptionAdd.bind(this);
        this.removeOption = this.removeOption.bind(this);
        this._addNotification = this._addNotification.bind(this);
    }
    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        if (this.state.option.length > 0) {
            this.handleOptionAdd();
        } else if (this.state.question.length < 10) {
            this._addNotification('Your question must be at least 10 characters long.', 'error');
        } else if (this.state.options.length < 2) {
            this._addNotification('Your poll must contain at least two different options.', 'error');
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
    removeOption(option) {
        let indexOfOption = this.state.options.indexOf(option);
        let updatedOptions = this.state.options.slice(0, indexOfOption).concat(this.state.options.slice(indexOfOption + 1));
        this.setState({ options: updatedOptions });
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
        return (
            <div className="NewPoll" style={style.form}>
                <form onSubmit={this.handleSubmit}>
                    <h2 style={style.header}>Create a new poll</h2>
                    <div>
                        <label style={style.label}>Question</label>
                        <input style={style.input} type="text" name="question" placeholder="What's the crappiest name for a voting app?" onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        <label style={style.label}>Options</label>
                        <input value={this.state.option} style={style.input} type="text" name="option" placeholder="Pollo" onChange={this.handleInputChange}/>
                        <div>
                            {this.state.options.map((option, index) => {
                                return (<p style={style.option} key={index}>{option}
                                    <MdClear style={style.removeIcon} onClick={() => this.removeOption(option)} />
                                </p>);
                            })}
                        </div>
                    </div>
                    <Button bsStyle="primary" onClick={this.handleOptionAdd} style={style.submit}>Add Option</Button>
                    <Button bsStyle="primary" type="submit" style={style.submit}>Submit Poll</Button>
                    <NotificationSystem ref={n => this._notificationSystem = n} style={style.notification} />
                </form>
            </div>
        );
    }
}

export default NewPoll;