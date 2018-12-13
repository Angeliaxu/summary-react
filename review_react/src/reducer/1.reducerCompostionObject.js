import { createStore } from 'redux';

/* 
    使用reducer composition pattern 来把控不同的reducer里的状态树。
*/
const todoApp = (state = {}, action) => {
    console.log(state)
    return {
        todos: todos(state.todos, action),
        visibilityFilter: visibilityFilter(
            state.visibilityFilter,
            action
        )
    }
}

const todos = (state = [], action) => {
    console.log('state', state)
    const { type } = action;
    switch (type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ]
        case 'TOOGLE_TODO':
            return state.map( t => todo(t, action))
        default:
            return state;

    }
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    const { type } = action;
    switch (type) {
        case 'SET_VISIBLITY_FILTER':         
            return action.filter;
        default:
            return state;
    }
}

const todo = (state, action) => {
    const { type } = action;
    switch (type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                compeleted: false
            }
        case 'TOOGLE_TODO':
            if (state.id === action.id) {
                return {
                    ...state,
                    compeleted: !state.compeleted
                }
            }
            return state;
    }
}

const store = createStore(todoApp);
console.log(store.getState())
// console.log('---initial state---')
// console.log(store.getState())
// console.log('---add todo---')
// store.dispatch({
//     type: 'ADD_TODO',
//     id: 1,
//     text: 'welcome'
// })
// console.log(store.getState())
// store.dispatch({
//     type: 'ADD_TODO',
//     id: 2,
//     text: 'home'
// })
// console.log(store.getState())


/* 
    createStore 中的state
    dispatch：其实是调用传给CreateStore 的reducer
    dispatch之后，reducer中返回的state 赋给 createStore中的state，之后再调用dispatch，再把createStore中的state传递给reducer的第一个参数
    通过getState(),取得每次返回的state
*/