import { createStore, combineReducers } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom'

//  改造todolist这个组件，目标是让每个组件尽可能合理的灵活。
/* 
    尽可能的使你的子组件与redux解耦，子组件presentational component。
    下面的这种写法有一个缺点： props一层一层的向下传递
    This approach also has downsides, such as that you have to thread 
    a lot of props through the components to get them to the leaf components, including the callbacks.
    也可以有解决办法：使用中间容器组件
*/
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
const TodoList = ({todos, onTodoClick}) => {
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
// add todo
const AddTodo = ({onAddClick}) => {
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
// footer
const Footer = ({ visibilityFilter, onFilterClick}) => {
    return (
        <div>
            <FilterLink filter='SHOW_ALL' currentFilter = {visibilityFilter} onClick={onFilterClick}>show all</FilterLink>
            <FilterLink filter='SHOW_COMPLETED' currentFilter = {visibilityFilter} onClick={onFilterClick}>show compeleted</FilterLink>
            <FilterLink filter='SHOW_ACTIVE' currentFilter = {visibilityFilter} onClick={onFilterClick}>show active</FilterLink>
        </div>
    )
}

const FilterLink = ({ filter, children, currentFilter, onClick }) => {
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
                onClick(filter)
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
const TodoApp = ({ todos, visibilityFilter }) => {
    const visibleTodo = getVisibleTodos(todos, visibilityFilter);
    return (
        <div>
            <AddTodo
                onAddClick={(value) => {
                    console.log(value)
                    store.dispatch({
                        type: 'ADD_TODO',
                        id: nextTodoId ++,
                        text: value,
                    })
                }}
            />
            <TodoList 
                todos={visibleTodo} 
                onTodoClick={id => store.dispatch({
                    type: 'TOGGLE_TODO',
                    id
                })}
            />
            <Footer 
                visibilityFilter = {visibilityFilter} 
                onFilterClick={(filter) => {
                    store.dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        filter
                    })
                }}
            />
        </div>
    )
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
