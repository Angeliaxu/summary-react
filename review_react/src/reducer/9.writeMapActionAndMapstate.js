import { createStore, combineReducers} from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

/* 
    实现mapStateToProps、mapDispatchtoProps

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
        const { store } = this.context;
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
        const { store } = this.context;
        this.unsubscrible = store.subscribe(()=> {
            this.forceUpdate()
        })
    }
    componentWillUnmount() {
        this.unsubscrible()
    }
}
VisibleTodo.contextTypes = {
    store: PropTypes.object
};
// add todo
const AddTodo = (props, { store }) => {
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
AddTodo.contextTypes = {
    store: PropTypes.object
};


// footer
const Footer = () => {
    return (
        <div>
            <FilterLink filter='SHOW_ALL' >show all</FilterLink>
            <FilterLink filter='SHOW_COMPLETED'  >show compeleted</FilterLink>
            <FilterLink filter='SHOW_ACTIVE'  >show active</FilterLink>
        </div>
    )
}

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
        const { store } = this.context;
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
FilterLink.contextTypes = {
    store: PropTypes.object
};


const TodoApp = () => {
    return (
        <div>
            <AddTodo />
            <VisibleTodo/>
            <Footer />
        </div>
    )
}

class Provider extends React.Component {
    getChildContext() {
        return {
            store: this.props.store
        }
    }
    render() {
        return this.props.children
    }
}

Provider.childContextTypes = {
    store: PropTypes.object
};
const store = createStore(reducers);
ReactDOM.render(
<Provider store = {store}>
    <TodoApp />
</Provider>, document.getElementById('root'));

/* 
    实现mapStateToProps,接受store的state作为参数，并且把组件需要用到的props暴露出来
*/
function mapStateToProps(state) {
    return {
        todos: getVisibleTodos(state.todoReducer, state.visibilityFilter)
    }
}
/* 
    
*/
function mapDispatchToProps(dispatch) {
    return {
        onTodoClick: (id) => {
            dispatch({
                type: 'TOGGLE_TODO',
                id
            })
        }
    }
}

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

