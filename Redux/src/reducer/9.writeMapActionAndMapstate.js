import { createStore, combineReducers } from 'redux';
import { Provider, connect} from 'react-redux';
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
const store = createStore(reducers)

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

// 以下代码是把dispatch抽离出来，在大型项目中，为了更好的管理
const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    }
}
let nextTodoId = 0;
const addTodo = (value) => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId ++,
        text: value,
    }
}
const tabTodo = (filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter,
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
AddTodo = connect(null, (dispatch) => {
    return {
        onAddClick: (value) => {
            dispatch(addTodo(value))
        }
    }
})(AddTodo)

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
const mapDispatchToLinkProps =(dispatch, ownProps) => {
    return {
        onVisiblityClick: () => {
            dispatch(tabTodo(ownProps.filter))
        }
    }
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

/* 
    connect 是一个柯里化函数（curried function），使用connect来传递props和dispatch。这样组件就可以不用声明
    contextTypes来取context中的store。connect的作用就是使组件不用声明contextTypes就可以直接取props和dispatch
*/
