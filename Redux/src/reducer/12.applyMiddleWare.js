import React from 'react';
import ReactDOM from 'react-dom'
import { createStore, combineReducers, bindActionCreators} from 'redux';
import { Provider, connect} from 'react-redux';
import { throttle } from 'lodash';
import thunk from 'redux-thunk';
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

const store = createStore(reducers, persistedState, applyMiddleware(logger, logger));

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

// 部分源码
function compose(...funcs) {
    if (funcs.length === 0) {
      return arg => arg
    }
  
    if (funcs.length === 1) {
      return funcs[0]
    }
  
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

export default function applyMiddleware(...middlewares) {
    return next => (reducer, initialState) => {
      const store = next(reducer, initialState)
      let dispatch = () => {
        throw new Error(
          `Dispatching while constructing your middleware is not allowed. ` +
            `Other middleware would not be applied to this dispatch.`
        )
      }
    // store 的初始化初始reducer中返回回来的state，此时的store和顶部的store里面的东西一样吗？
      const middlewareAPI = {
        // 先获取当前store中存储的state，和外部store初始化获取得到的state是一致的
        getState: store.getState,
        dispatch: (...args) => dispatch(...args)
      }
      const chain = middlewares.map(middleware => middleware(middlewareAPI))
      dispatch = compose(...chain)(store.dispatch);
      console.log(dispatch)
      console.log(chain)
      return {
        ...store,
        dispatch
      }
    }
  }
/* 
    自定义一个Middleware
*/
 function logger (store) { 
     return (next) => (action) => {
        console.log(next);
        console.log('will dispatch', action);
        console.log(store.dispatch)
        let returnValue = next(action);
        console.log('finish', action)
        console.log(store.getState());
        console.log(returnValue)
        // return returnValue;
    }
 }


// logger(logger(store.dispatch))

// function a(next) {
//     return function(action) {
//         let res = next(action)
//     }
// }
// function b(next) {
//     return function(action) {
//         let res = store.dispatch(action)
//     }
// }
// function (action) {
//     let res = function() {}(action)
// }
// a(b(store.dispatch))
/* function logger({ getState }) {
    return (next) => (action) => {
        console.log('will dispatch', action);
        let returnValue = next(action);
        console.log('state after dispatch', getState());
        console.log(returnValue)
        return returnValue;
    }
} */

/* function F() {}
F.prototype.say = function () {
    console.log(3333333333)
}
function O() {}
var obj = new O();
console.log(obj.constructor); // O
console.log(O.prototype.constructor) // O
console.log(obj.constructor === O.prototype.constructor) // True
O.prototype = new F();
console.log(obj.constructor) // O
console.log(O.prototype.constructor) // F */

/* function a() {}
var a1 = new a();
var a2 = new a();
// a.prototype = {};
a1.__proto__.constructor = 111
console.log(a.prototype.constructor)
console.log(a1.constructor)
console.log(a2.constructor) */

/* function a (next) {
    return function(action) {
        console.log(next)
        let resulta = next(action);
        console.log(resulta)
        return resulta;
    };
}
function b (next) {
    return function (action) {
        let resultb = next(action);
        console.log(resultb)
        return resultb;
    };
}
function c (next) {
    return function (action) {
        let resultc = next(action);
        console.log(resultc)
        return resultc;
    }
} 
function rr (...funcs) {
    return funcs.reduce((a, b) => {
        return (...args) => a(b(...args))
    })
}
function e(e) {
    let a = 'a';
    console.log(a)
    console.log(e)
}
function f (f) {
    console.log(f)
    return 333;
}
rr(e,f)(4) */

/* // compose 基础举例
function combine(x, y) {
    return function (data) {
        return x(y(data))
    }
}

function a (x) {
    console.log(x);
    return x;
}
function b(x) {
    console.log(x);
    return x;
}
console.log(combine(a,b)(8)) */