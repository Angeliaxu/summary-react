import React, {Component}  from 'react';

export default class Checkbox extends Component{
    constructor(props) {
        super(props);
        this.state = {
            coffee: []
        }
    }
    handleChange = (e) => {
        let { checked, value } = e.target;
        let { coffee } = this.state;
        if (checked && coffee.indexOf(value) === -1) {
            coffee.push(value);
        } else {
            coffee = coffee.filter(el => el !== value)
        }
        this.setState({
            coffee
        })
    }
    render() {
        let { coffee } = this.state;
        return(
            <div>
                <p>请选择你最喜欢的咖啡</p>
                <label>
                    <input
                        type="checkbox"
                        value="Cappuccino"
                        checked= {coffee.indexOf('Cappuccino') !== -1}
                        onChange={this.handleChange}
                    />
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="CafeMocha"
                        checked= {coffee.indexOf('CafeMocha') !== -1}
                        onChange={this.handleChange}
                    />
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="CafeLatte"
                        checked= {coffee.indexOf('CafeLatte') !== -1}
                        onChange={this.handleChange}
                    />
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Machiatto"
                        checked= {coffee.indexOf('Machiatto') !== -1}
                        onChange={this.handleChange}
                    />
                </label>
            </div>
        )
    }
}
 