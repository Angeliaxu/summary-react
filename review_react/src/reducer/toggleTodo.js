
const deepFreeze = require('deep-freeze');
const expect = require('expect');

/* 
    toggleTodo这个函数里面做了两件事，一件是怎么更新todo数组，一件是更新Todo item，如果一个函数里面处理了很多不同的逻辑，你得
    把部分逻辑抽离出到一个函数，每个函数只专注的做一件事。
*/
const toggleTodo = (state = [], action) => {
    const { type } = action;
    switch (type) {
        case 'ADD_TODO':
            return [...state, {
                id: action.id,
                text: action.text,
                compeleted: false
            }];
        case 'TOOGLE_TODO':
            const toogle = state.map(todo => {
                if (todo.id === action.id) {
                    return {
                        ...todo,
                        compeleted: !todo.compeleted
                    }
                }
                return todo;
            })
            console.log(toogle)
            return toogle;
        default:
            return state;
    }
}

const testAddTest = () => {
    const startBefore = [
        {
            id: 0,
            text: 'Learn Redux',
            compeleted: false
        },
        {
            id: 1,
            text: 'Go Shopping',
            compeleted: false
        }
    ];
    const action = {
        type: 'TOOGLE_TODO',
        id: 1
    }
    const startAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            compeleted: false
        },
        {
            id: 1,
            text: 'Go Shopping',
            compeleted: true
        }
    ]
    deepFreeze(startBefore)
    deepFreeze(action)
    expect(
        toggleTodo(startBefore, action)
    ).toEqual(startAfter)
}
testAddTest()

/* function compose(...funcs) {
    // 返回一个函数
    if (funcs.length === 0) {
        return arg => arg
    }
    // 返回参数中第一个
    if (funcs.length === 1 ){
        return funcs[0]
    }
    return funcs.reduce((a, b) => (...args) =>a(b(...args)))
} */