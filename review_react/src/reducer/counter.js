import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

function Counter(props) {
    return (
        <div>
            <p>{props.state}</p>
            <span onClick = {props.increment}>+</span>
            <span onClick = {props.decrement}>-</span>
        </div>
    )
}

function counter( state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}
let store = createStore(counter);
function render () {
    ReactDOM.render(<Counter 
        state = {store.getState()} 
        decrement = {() => store.dispatch({type: 'DECREMENT'})}
        increment = {() => store.dispatch({type: 'INCREMENT'})}
        />,
        document.getElementById('root'))
}
render();
store.subscribe(render)