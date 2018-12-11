import React from 'react';

// 根据温度判断返回内容
function Content(props) {
    if(props.celsius >= 100) {
        return (<p>水会烧开</p>)
    } else {
        return (<p>水不会烧开</p>)
    }
}
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9
}
function toFahrenheit(celius) {
    return (celius * 9 / 5) +32
}
function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString()
}

const scaleNmaes = {
    c: 'Celsius',
    f: 'Fahrenheit'
}
class StatusLifting extends React.Component {
    constructor(pops) {
        super(pops)
    }
    render() {
        let {scale} = this.props;
        return(
            <div>
                <legend>Enter temperature in {scaleNmaes[scale]}:</legend>
                <input value ={ this.props.temperature } placeholder="请输入温度" onChange={this.handleChange}/>
            </div>
        )
    }
    handleChange = (event) => {
        this.props.onTemperatureChange(event.target.value);
    }
}
export default class Calculator extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            scale: 'c',
            temperature: ''
        }
    }
    handleCelsiusChange(temperature) {
        this.setState({
            scale: 'c',
            temperature
        })
    }
    handleFahrenheitChange(temperature) {
        this.setState({
            scale: 'f',
            temperature
        })
    }
    render() {
        const { scale, temperature } = this.state;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
        return (
            <div>
                <StatusLifting scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange.bind(this)}/>
                <StatusLifting scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange.bind(this)}/>
                <Content celsius = {parseFloat(celsius)}/>
            </div>
        )
    }
}