import React from 'react';

function FancyBorder(props) {
    console.log(props.children)
    return (
        <div>
            {props.children}
        </div>
    )
}

function WelcomeDialog() {
    return (
        <FancyBorder>
            <h1>Welcome<span>Cici</span></h1>
            <p>Thank you for visiting our spacecraft</p>
        </FancyBorder>
    )
}
// 可以把组件通过属性传递
function SplitPane(props) {
    return (
        <div>
            <div>
                {props.left}
            </div>
            <div>
                {props.right}
            </div>
        </div>
    )
}
function Dialog(props) {
    return (
        <FancyBorder>
            <h1>{props.title}</h1>
            <p>{props.message}</p>
            {props.children}
        </FancyBorder>
    )
}

function Repeat(props) {
    let items = [];
    for(let i = 0; i< props.numTimes; i++) {
        console.log(props.children)
        items.push(props.children(i))
    }
    return <div>{items}</div>
}
function ListOfTenThings() {
    return(
        <Repeat numTimes={5}>
            {(index) => <div key={index}>This is item {index} in the list</div>}
        </Repeat>
    )
}
export default class CombineAndInherit extends React.Component{
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = {
            login: ''
        }
    }
    render() {
       return (
           <div>
                <Dialog title="Welcome" message="Thank you for visiting our spacecraft">
                    <input value={this.state.login} onChange={this.handleChange}/>
                    <button onClick={this.handleSignUp}>Sign Me Up!</button>
                </Dialog>
                <ListOfTenThings></ListOfTenThings>
           </div>
       )
    }
    handleChange(e) {
        this.setState({
            login: e.target.value
        })
    }
    handleSignUp() {
        alert(`Welcome aboard, ${this.state.login}`)
    }

}

/* 
    react传递属性：如果传递属性没值得情况下，默认为true
    react传递扩展属性：<Greeting {...props} />
    条件渲染确保&&前面始终为布尔值，javascript中有一些falsy值，比如数字0
    JSX是为React.createElement()提供的语法糖
*/