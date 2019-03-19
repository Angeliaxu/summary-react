import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Child from './child';
import Refexample from './ref';

export default class Parent extends Component {
    constructor() {
        super()
        this.state = {
            word: '徐畅'
        }
    }
    change = () => {
        this.setState ({
            word: '张欢'
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.change}>点击改变</button>
                <p>{this.state.word}</p>
                <hr/>
                <Child {...this.state}/>
                <Refexample/>
            </div>
        )
    }
    componentDidMount() {
        const dom = ReactDOM.findDOMNode(this);
        console.log(dom)
    }
    
}