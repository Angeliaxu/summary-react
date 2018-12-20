import { createStore, combineReducers } from 'redux';
import { Provider, connect} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

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
const store = createStore(reducers)

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
            dispatch({
                type: 'TOGGLE_TODO',
                id
            })
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
AddTodo = connect(null, (dispatch) => {
    return {
        onAddClick: (value) => {
            dispatch({
                type: 'ADD_TODO',
                id: nextTodoId ++,
                text: value,
            })
        }
    }
})(AddTodo)


// footer
const Link = ({active, children, onClick}) => {
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
    render() {
        const props = this.props;
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
        const { store } = this.context;
        this.unsubscrible = store.subscribe(() => {
            this.forceUpdate()
        })
    }
    componentWillUnmount() {
        this.subscribe()
    }
}
const Footer = () => {
    return (
        <div>
            <FilterLink filter='SHOW_ALL' >show all</FilterLink>
            <FilterLink filter='SHOW_COMPLETED'  >show compeleted</FilterLink>
            <FilterLink filter='SHOW_ACTIVE'  >show active</FilterLink>
        </div>
    )
}


// todoApp
const TodoApp = () => {
    return (
        <div>
             <AddTodo /> 
            <TodoList/>
           {/*  <Footer />  */}
        </div>
    )
}

ReactDOM.render(
<Provider store = {store}>
    <TodoApp />
</Provider>, document.getElementById('root'));


/* 
    connect 是一个柯里化函数（curried function），使用connect来传递props和dispatch。这样组件就可以不用声明
    contextTypes来取context中的store。connect的作用就是使组件不用声明contextTypes就可以直接取props和dispatch
*/
