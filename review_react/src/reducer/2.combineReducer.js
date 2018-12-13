import { combineReducers, createStore } from "redux";

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
    console.log(111)
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

// const todoApp = (state = {}, action) => {
//     return {
//         todos: todos(state.todos, action),
//         visibilityFilter: visibilityFilter(
//             state.visibilityFilter,
//             action
//         )
//     }
// }


/* 
  上面这样组合不同的子reducer在项目里面非常常见，因此进一步优化上面的代码  
  combineReducers 返回 的函数我们叫做 Reducer function，这个函数和我们
  上面手动写的reducer function非常相似。

  combineReducer 初始化了子reducer

*/


const todoApp = combineReducers({
    todos,
    visibilityFilter
})
console.dir(todoApp)
const store = createStore(todoApp);