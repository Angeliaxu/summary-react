import React from 'react';
import ReactDOM from 'react-dom'
import { createStore, combineReducers, bindActionCreators} from 'redux';
import { Provider, connect} from 'react-redux';
import { throttle } from 'lodash';
import {saveState, loadState} from './lib/util/localStorage';
const uuidv4 = require('uuid/v4');

const todoReducer = (state = [], action) => {
    const { type } = action;
    switch (type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    text: action.text,
                    id: action.id,
                    compeleted: false
                }
            ];
        case 'TOGGLE_TODO':
            return state.map(item => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        compeleted: !item.compeleted
                    }
                }
                return item;
            })
        default:
            return state;
    }
} 
const visibilityFilter = (state = 'SHOW_ALL', action) => {
    const { type } = action;
    switch (type) {
        case 'SET_VISIBILITY_FILTER': 
            return action.filter;
        default:
            return state;
    }
}
const reducers = combineReducers({
    todoReducer,
    visibilityFilter
})
/* 
    createStore的第二个参数是给redux的state赋默认值
        赋值流程：
            当子reducer被调用之前，先赋值。如果子reducer调之前，state是为undefined，那么调用reduce
            之后才会走reducer里面的赋值流程。
        注意：
            如果给state一个默认的null，那么子reducer不会认为state是undefined，并且不会自动默认赋值
            所以区别undefined 和 null 非常重要。
*/
const persistedState = loadState();

const store = createStore(reducers, persistedState);

// 节流
store.subscribe(throttle(() => {
    saveState({
        todoReducer: store.getState().todoReducer
    })
}, 10000))

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':       
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.compeleted)
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.compeleted)
    }
}

// 箭头函数如果返回的是一个对象，请记得使用（）把对象包裹起来
const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
})
let nextTodoId = 0;
const addTodo = (value) => ({
    type: 'ADD_TODO',
    id: uuidv4(),
    text: value,
})
const tabTodo = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter,
})
// todo
const Todo = ({ text, compeleted, onClick}) => {
    return (
        <li 
            onClick={onClick}
            style={{textDecoration: compeleted ? 'line-through' : 'none'}}
        >
            {text}
        </li> 
    )
}

// todos
let TodoList = ({todos, onTodoClick}) => {
    return (
        <ul>
           {
            todos.map(t => 
                    <Todo
                        key = {t.id}
                        {...t}
                        onClick={() => onTodoClick(t.id)}
                    />
                )
            }
        </ul>
    )
}
const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(state.todoReducer, state.visibilityFilter)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id))
        }
    }
}
TodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

// add todo
let AddTodo = ({onAddClick}) => {
    let input;
    return (
        <div>
            <input ref = {(node) => input = node}/>
            <button onClick={()=> {
                onAddClick(input.value)
                input.value = ''
            }}>Add todo</button>
        </div>
    )
}
AddTodo = connect(null, (dispatch) => bindActionCreators({onAddClick: (value) => addTodo(value)}, dispatch))(AddTodo)

// footer
let Link = ({active, children, onVisiblityClick}) => {
    if (active) {
        return <span style={{color: 'red'}}>{children}</span>
    }
    return (
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                onVisiblityClick()
            }}
        >
            {children}
        </a>
    )
}
const mapStateToLinkProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    }
}
/* const mapDispatchToLinkProps =(dispatch, ownProps) => {
    return {
        onVisiblityClick: () => {
            dispatch(tabTodo(ownProps.filter))
        }
    }
} */
const mapDispatchToLinkProps =(dispatch, ownProps) => {
    return bindActionCreators({onVisiblityClick:() => tabTodo(ownProps.filter)}, dispatch)
}

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link)

const Footer = () => {
    return (
        <div>
            <FilterLink filter='SHOW_ALL'>show all</FilterLink>
            <FilterLink filter='SHOW_COMPLETED'>show compeleted</FilterLink>
            <FilterLink filter='SHOW_ACTIVE'>show active</FilterLink>
        </div>
    )
}

// todoApp
const TodoApp = () => {
    return (
        <div>
            <AddTodo /> 
            <TodoList/>
            <Footer />
        </div>
    )
}

ReactDOM.render(
<Provider store = {store}>
    <TodoApp />
</Provider>, document.getElementById('root'));
