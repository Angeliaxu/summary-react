import { createStore, combineReducers } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom'


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
const store = createStore(reducers);

let nextTodoId = 0;
const TodoList = (props) => {
    return (
        <ul>
            {
                props.todos.map(item => <li 
                    key={item.id} 
                    onClick={() => store.dispatch({
                        type: 'TOGGLE_TODO',
                        id: item.id
                    })}
                    style={{textDecoration: item.compeleted ? 'line-through' : 'none'}}
                >
                    {item.text}
                </li>)
            }       
        </ul>   
    )
}

const FilterLink = (props) => {
    const { filter, children, currentFilter } = props;
    let hight;
    if (filter === currentFilter) {
        hight = <span style={{color: 'red'}}>{children}</span>
    } else {
        hight = children
    }
    return (
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                store.dispatch({
                    type: 'SET_VISIBILITY_FILTER',
                    filter
                })
            }}
        >
            {hight}
        </a>
    )
}

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
class TodoApp extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { todos, visibilityFilter } = this.props;
        const visibleTodo = getVisibleTodos(todos, visibilityFilter);
        return (
            <div>
                <input ref = {(input) => this.input = input}/>
                <button onClick={()=> {
                    store.dispatch({
                        type: 'ADD_TODO',
                        text: this.input.value,
                        id: nextTodoId++
                    })
                    this.input.value = ''
                }}>Add todo</button>
                <TodoList todos={visibleTodo}/>
                <FilterLink filter='SHOW_ALL' currentFilter = {visibilityFilter}>show all</FilterLink>
                <FilterLink filter='SHOW_COMPLETED' currentFilter = {visibilityFilter}>show compeleted</FilterLink>
                <FilterLink filter='SHOW_ACTIVE' currentFilter = {visibilityFilter}>show active</FilterLink>
            </div>
        )
    }
}


const render = () => {
    ReactDOM.render(<TodoApp 
        todos={store.getState().todoReducer} 
        visibilityFilter = {store.getState().visibilityFilter}
        />,
        document.getElementById('root'));
}
render();
store.subscribe(render)
