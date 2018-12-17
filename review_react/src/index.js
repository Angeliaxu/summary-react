import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

// import Stopcomponent from './component/stopcomponent';
// import List from './component/listandkeys';
// import Form from './component/form';
// import MultipleInput from './component/multipleInput';
// import StatusLifting from './component/statusLifting';
// import CombineAndInherit from './component/combineAndInherit';
// import CheckTypes from './component/checkType';
// import CreateRefs from './component/createRefs';
// import NotControllForm from './component/10.notControllForm';
// import Performance from './component/11.performance';
// import Todo from './component/13.todo';
// import './reducer/counter'
// import './reducer/avoidArrayMutation'
// import './reducer/todoReducer'
// import './reducer/todoReducer'
// import './reducer/toggleTodo'
// import './reducer/1.reducerCompostionObject'
// import './reducer/2.combineReducer'
// import './reducer/4.todoAppExample'
// import './reducer/5.refactorTodoApp'
// import './reducer/6.extractingContainner'
// import './reducer/7.useContext'
// import './reducer/8.useReactRedux';
import './reducer/9.writeMapActionAndMapstate'


// function Clock(props) {
//     return (
//         <div>
//             <h1>hello, world</h1>
//             <h2>it is {props.date.toLocaleTimeString()}.</h2>
//         </div>
//     )
// }
// 登录
function LoginButton(props) {
    return (
        <button onClick = {props.onClick}>login</button>
    )
}
// 退出
function LoginoutButton(props) {
    return (
        <button onClick = {props.onClick}>logout</button>
    )
}

class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            isLogin: false
        }
        // this.buttonClick = this.buttonClick.bind(this)
    }
    render() {
        const {isLogin} = this.state;
        let Buttons= null;
        if (isLogin) {
            Buttons = <LoginoutButton onClick = {this.handleLogoutClick.bind(this)}/>
        } else {
            Buttons = <LoginButton onClick = {this.handleLoginClick.bind(this)}/>
        }
        return (
            <div>
                <h1>hello, world</h1>
                <h2>it is {this.state.date.toLocaleTimeString()}.</h2>
                <hr/>
                <button onClick = {(e) => this.buttonClick(1,e)}>事件传递参数第一种方法</button>
                <button onClick = {this.secondButtonClick.bind(this, 3)}>事件传递参数第二种方法</button>
                {Buttons}
            </div>
        )
    }
    componentDidMount() {
        this.timerID = setInterval(()=>{
            this.tick()
        }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.timerID)
    }
    tick() {
        // this.setState({
        //     date: new Date()
        // })
    }
    // buttonClick() {
    //     console.log(this)
    // }
    buttonClick = ($1,e) => {
        console.log($1)
        console.log(e)
    }
    secondButtonClick($1, e) {
        console.log($1)
        console.log(e)
    }
    handleLoginClick() {
        this.setState({
            isLogin: true
        })
    }
    handleLogoutClick() {
        this.setState({
            isLogin: false
        })
    }
}

// ReactDOM.render(<Todo />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
