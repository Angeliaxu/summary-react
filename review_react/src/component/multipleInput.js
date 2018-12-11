import React from 'react';

export default class MultipleInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        }
    }
    render() {
        return (
            <form>
                <label>
                    Is going:
                    <input name="isGoing" type="checkbox" checked={this.state.isGoing} onChange={this.handleChange.bind(this)}/>
                </label>
                <br/>
                <label>
                   Number of guests:
                    <input name="numberOfGuests" type="number" value={this.state.numberOfGuests} onChange={this.handleChange.bind(this)}/>
                </label>
            </form>
        )
    }
    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }
}