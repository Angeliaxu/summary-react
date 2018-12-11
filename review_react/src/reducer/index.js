
//  write counter reducer,counter must be pure function，reducer manage the state
// import { createStore } from 'redux';
function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

const store  = createStore(counter);

//  store 下有三个方法，第一个
console.log(store.getState())

// 第二个dispatch。change the state of the application
/* store.dispatch({type: 'INCREMENT'})
console.log(store.getState()) */



//  Reimplement createStore
 function createStore(reducer) {
    let state;
    let listeners = [];
    let getState = () => {
        return state;
    }
    let dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach(lister => lister())
    }
    let subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter( l => l !== listener);
        }
    }
    // initialize
    dispatch({})

    return { getState, dispatch, subscribe }
}

// 第三个subscribe,每当dispatch之后，subscribe都能监听到。
const renders= () => {
    document.body.innerHTML = store.getState();
}
const changeBG = () => {
    const arr = ['red', 'yellow', 'purple'];
    const num = Math.floor(Math.random() * arr.length)
    document.body.style.background = arr[num];
}
// renders()
const listener1 = store.subscribe(renders)
const listener2 = store.subscribe(changeBG)
document.addEventListener('click', function(){
    store.dispatch({type: 'INCREMENT'})
})

