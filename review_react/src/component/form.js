import React from 'react';

// 受控组件
export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            selected: 'Coconut'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        return (
            <form>
                <label>
                    Name:
                    <input type="text" name="name" value={this.state.value} onChange={this.handleChange} placeholder="请输入内容"/>
                </label>
                <input type="submit" value="submit" onClick={this.handleSubmit}/>
                <select value={this.state.selected} onChange={this.handleChange1.bind(this)}>
                    <option value="Grapefruit">Grapefruit</option>
                    <option value="Lime">Lime</option>
                    <option value="Coconut">Coconut</option>
                    <option value="Mango">Mango</option>
                </select>
            </form>
        )
    }
    handleChange(event) {
        this.setState({
            value: event.target.value.toUpperCase()
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        
    }
    handleChange1(event) {
        // console.log(event.target.value)
        this.setState({
            selected: event.target.value
        })
        // 从这儿可以看出this.setState()是异步更新的
        console.log(this.state.selected)
    }
}