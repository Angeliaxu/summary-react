const uuidv4 = require('uuid/v4');
// 箭头函数如果返回的是一个对象，请记得使用（）把对象包裹起来
export const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
})
let nextTodoId = 0;
export const addTodo = (value) => ({
    type: 'ADD_TODO',
    id: uuidv4(),
    text: value,
})
export const tabTodo = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter,
})