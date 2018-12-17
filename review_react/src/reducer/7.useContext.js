import { createStore, combineReducers } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

/* 
    当数据需要传递很多层的时候，会经过很多的中间层，这时候你需要考虑使用React的context API。

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
            // component instances to force re-rendering
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
/* 
    组件Provider使用React的context feature使store能在每个组件当中能使用，
    在Provider中需要定义一个特殊方法：getChildContext，这个方法在React中会调用一次，并且返回一个对象。store会
    作为context的一部分

*/
class Provider extends React.Component {
    getChildContext() {
        return {
            store: this.props.store
        }
    }
    /* 
        不管children是什么，返回children就行
    */
    render() {
        return this.props.children
    }
}
/* 
    必须声明getChildContextTypes的类型，这样子组件才能获取context，在子组件身上也需要声明contextTypes类型，
    不声明获取不到context对象。
    在需要使用context组件上声明contextTypes，没有必要声明的组件可以不使用。
    那如果组件是函数式组件怎么办？
        解决办法：函数式组件的第二个参数接受context
    
    react-redux使用provider的思路：
        1. Provider中实现getChildContext：返回一个对象，对象里面包含子组件需要的信息。通过props取外界的值
        2. Provider的render方法渲染children，无论children是啥都渲染
        3. 声明静态属性Provider.childContextTypes为什么类型
        4. 子组件如果想访问context，需要声明组件静态属性，contextTypes类型，这样才能在组件内通过this.context取得全局环境的东西
        5. 如果是函数式组件context作为第二个参数传递给组件。

*/

// 如果你想把context传递给子组件，下面的代码是必须的
Provider.childContextTypes = {
    store: PropTypes.object
};

ReactDOM.render(
<Provider store = {createStore(reducers)}>
    <TodoApp />
</Provider>, document.getElementById('root'));

