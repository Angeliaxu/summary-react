import React,{Component} from 'react';

export default class Refexample extends Component{
    constructor(props) {
        super(props)
        this.bindText = React.createRef();
        this.tradition = React.createRef();
        // 使用callback声明ref的最好的方式
        this.boundRef = (ref) => this.inputtext = ref;
    }
    focus = () => {
        if (this.inputtext) {
            this.inputtext.focus();
        }
    }
    bindFocus = () => {
        console.log(this.tradition.current)
        this.bindText.current.focus();
    }
    focusInputRef = () => {
        this.inputRef.focus();
    }
    render() {
        return (
            <div>
                {/* 使用callback方式声明的ref并不好，组件更新的时候会执行两次 */}
                <input type="text" ref={(refs) => {
                    console.log(refs)
                    return this.inputtext = refs
                }}/>
                <input type="text" ref={this.boundRef}/>
                <input 
                    type="button"
                    value="facus on input"
                    onClick={this.focus}
                />
                <hr/>
                <input type="text" ref={this.bindText}/>
                <input 
                    type="button"
                    value="facus on input"
                    onClick={this.bindFocus}
                />
                <hr/>
                <TraditionComponent ref={this.tradition}/>
                <hr/>
                <PassRef inputRef = {(el) => this.inputRef = el}/>
                <button onClick={this.focusInputRef}>聚焦子组件</button>
            </div>
        )
    }
}

class TraditionComponent extends Component {
    render() {
        return (
            <div>
                我是一个class声明的组件
            </div>
        )
    }
}

function NotATrandition() {
    return (
        <div>我是一个函数式组件</div>
    )
}

function PassRef(props) {
    return (
        <div>
            <input type="text" ref={props.inputRef}/>
        </div>
    )
}