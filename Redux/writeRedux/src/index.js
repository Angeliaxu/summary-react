import createStore from '../lib/redux.js';
import countReducer from '../lib/countReducer';
import devidReducer from '../lib/devidReducer';
import combineReducers from '../lib/combineReducer';
// import applyMiddlewares from '../lib/applyMiddlewares';

const store = createStore(combineReducers({
    devidReducer,
    countReducer
}));

console.log(store.getState());

store.dispatch({
    type: 'add',
    param: {
        count: 0
    }
})
// let dispatch = store.dispatch;

// store.dispatch =  (action) => {
//     console.log('改变之前的值', action);
//     dispatch(action)
//     console.log('改变之后的值', store.getState().devidReducer);
// }
// let prevDispatch = store.dispatch;
// store.dispatch = (action) => {
//     console.log('---------', action);
//     prevDispatch(action)
//     console.log('--------------', store.getState().devidReducer);
// }
// store.dispatch( {
//     type: 'devid'
// } )


function logger(store) {
    let oldDispatch = store.dispatch;
    return (action) => {
        console.log('改变之前的值', action);
        oldDispatch(action)
        console.log('改变之后的值', store.getState().devidReducer);
    }
}

function infog(store) {
    let oldDispatch = store.dispatch;
    //  此时的dispatch是logger的返回函数
    return (action) => {
        console.log('---------', action);
        oldDispatch(action)
        console.log('--------------', store.getState().devidReducer);
    }
}

function applyMiddlewares(store, middlewares) {
    middlewares.forEach(middleware => {
        store.dispatch = middleware(store)
    });
}
applyMiddlewares(store, [logger, infog])
store.dispatch( {
    type: 'devid'
} )
