
const deepFreeze = require('deep-freeze');
const expect = require('expect');

//  专注处理创建item，专注处理逻辑的reducer
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
// 最顶层的reducer
const todos = (state = [], action) => {
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
// 测试断言
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
        todos(startBefore, action)
    ).toEqual(startAfter)
}
testAddTest()