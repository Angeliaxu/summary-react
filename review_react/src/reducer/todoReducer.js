
const deepFreeze = require('deep-freeze');
const expect = require('expect');

/* 
    what a reducer is: it's a pure function you write to implement update logic
*/

const todo = (state = [], action) => {
    const { type } = action;
    switch (type) {
        case 'ADD_TODO':
            return [...state, {
                id: action.id,
                text: action.text,
                compeleted: false
            }];
            // return state.push({  
            //     id: action.id,
            //     text: action.text,
            //     compeleted: false    
            // })
        // add a default case to switch statement cauz every reducer has to return the current state for any unkown action
        default:
            return state;
    }
}

// writing a test to test whether the todo reducer is correct

const testAddTest = () => {
    const startBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    }
    const startAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            compeleted: false
        }
    ]
    deepFreeze(action)
    deepFreeze(startBefore)
    expect(
        todo(startBefore, action)
    ).toEqual(startAfter)
}
testAddTest()