import React from 'react';
import { bindActionCreators} from 'redux';
import { connect} from 'react-redux';
import { toggleTodo, addTodo, tabTodo} from '../action/actionCreator';

/* 
    createStore的第二个参数是给redux的state赋默认值
        赋值流程：
            当子reducer被调用之前，先赋值。如果子reducer调之前，state是为undefined，那么调用reduce
            之后才会走reducer里面的赋值流程。
        注意：
            如果给state一个默认的null，那么子reducer不会认为state是undefined，并且不会自动默认赋值
            所以区别undefined 和 null 非常重要。
*/


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
export default TodoApp
/* function applyMiddleware(...middlewares) {
    return function(createStore) {
        return function(...agrs) {
            const store = createStore(...agrs);
            let dispatch = function() {
                throw new Error(
                    `Dispatching while constructing your middleware is not allowed. ` +
                      `Other middleware would not be applied to this dispatch.`
                )
            }
            const middlewareAPI = {
                getState: store.getState,
                dispatch: (...args)=> dispatch(...args)
            }
            const chain = middlewares.map(middleware => middleware(middlewareAPI));
            dispatch = compose(...chain)(store.dispatch)
            return {
                ...store,
                dispatch
            }
        }
    }
} */


