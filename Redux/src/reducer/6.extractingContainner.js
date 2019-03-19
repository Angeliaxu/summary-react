import { createStore, combineReducers } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom'

//  props传递的层级太多，导致一些没有必要使用props的组件为了子组件的使用也需要接受props并传递下去
//  同时在一个真正的项目当中，我们是不可能把store当做一个top-level变量，为了改变这个做法，我们把store作为props从上至下依次传递给组件
/* 
    这种写法违背了组件的封装性，因为父组件需要知道子组件需要什么数据
        解决办法：抽离一些容器组件。
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

let nextTodoId = 0;


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
class VisibleTodo extends React.Component {
    render() {
        const { store } = this.props;
        const {todoReducer, visibilityFilter} = store.getState();
        const todoArr = getVisibleTodos(todoReducer, visibilityFilter)
         return (
            <TodoList 
                todos={todoArr} 
                onTodoClick={id => store.dispatch({
                    type: 'TOGGLE_TODO',
                    id
                })}
            />
        )
    }
    componentDidMount() {
        const { store } = this.props;
        this.unsubscrible = store.subscribe(()=> {
            this.forceUpdate()
        })
    }
    componentWillUnmount() {
        this.unsubscrible()
    }
}
// add todo
const AddTodo = ({ store }) => {
    let input;
    return (
        <div>
            <input ref = {(node) => input = node}/>
            <button onClick={()=> {
                store.dispatch({
                    type: 'ADD_TODO',
                    id: nextTodoId ++,
                    text: input.value,
                })
                input.value = ''
            }}>Add todo</button>
        </div>
    )
}



// footer
const Footer = ( { store }) => {
    return (
        <div>
            <FilterLink filter='SHOW_ALL' store ={ store }>show all</FilterLink>
            <FilterLink filter='SHOW_COMPLETED'  store ={ store }>show compeleted</FilterLink>
            <FilterLink filter='SHOW_ACTIVE'  store ={ store }>show active</FilterLink>
        </div>
    )
}
/* 
    let's recap the relationship between the FilterLink container component and Link presentational component:
        组件Link指定link的在页面上渲染是否是active的效果，但是不知道behavior，组件FilterLink 是容器组件，提供了Link组件需要的data和behavior。

*/
const Link = ({active, children, onClick}) => {
    /* 
        专注于渲染样式
    */
    if (active) {
        return <span style={{color: 'red'}}>{children}</span>
    }
    return (
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                onClick()
            }}
        >
            {children}
        </a>
    )
}
class FilterLink extends React.Component {
    /*
        专注于行为，数据 
     */
    render() {
        const props = this.props;
        const { store } = props;
        const state = store.getState();
        return (
            <Link
                active = {props.filter === state.visibilityFilter}
                onClick = { () => {
                    store.dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        filter: props.filter
                    })
                }}
            >
                {props.children}
            </Link>
        )
    }
    componentDidMount() {
        const { store } = this.props;
        this.unsubscrible = store.subscribe(() => {
            // component instances to force re-rendering
            this.forceUpdate()
        })
    }
    componentWillUnmount() {
        this.subscribe()
    }
}


const TodoApp = ({ store }) => {
    return (
        <div>
            <AddTodo store = {store}/>
            <VisibleTodo store = {store}/>
            <Footer store = {store}/>
        </div>
    )
}

ReactDOM.render(<TodoApp store = {createStore(reducers)}/>, document.getElementById('root'));

