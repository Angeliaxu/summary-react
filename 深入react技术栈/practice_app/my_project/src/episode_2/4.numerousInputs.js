import React, {Component} from 'react';

export default class NumerousInputs extends Component {
    constructor(props){
        super(props);
        this.state = {
            phoneNumber: '',
            userName: ''
        }
    }
    handleChange = (e) => {
        let { name, value} = e.target;
        this.setState({
            [name]: value
        })
    }
    render() {
        return (
            <div>
                <input 
                    type="text" 
                    name="phoneNumber" 
                    value={this.state.phoneNumber}
                    onChange={this.handleChange}
                />
                <input 
                    type="text" 
                    name="userName" 
                    value={this.state.userName}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
} 