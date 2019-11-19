import React, {Component} from 'react';

export default class SelectComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'apple'
        }
    }
    handleChange = (e) =>{
        console.log(e.target.value)
        this.setState({
            selected: e.target.value
        })
    }
    render() {
        let { selected } = this.state;
        return (
            <div>
                <select value={selected} onChange={this.handleChange} >
                    <option value=""></option>
                    <option value="apple">apple</option>
                    <option value="pear">pear</option>
                    <option value="peach">peach</option>
                    <option value="watermelon">watermelon</option>
                </select>
            </div>
        )
    }
}