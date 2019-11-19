function createStore(reducer, initialState, enhancer){
    if (initialState && typeof initialState === 'function') {
        enhancer = initialState;
        initialState = undefined;
    }
    if(enhancer && typeof enhancer === 'function') {
        return enhancer(createStore)(reducer, initialState);
    }

    let currentState = {};
    let listenr= [];
    function dispatch(action) {
        currentState = reducer(currentState, action);
    }
    dispatch({})
    function subscribe(fn) {
        listenr.push(fn);
    }
    function getState() {
        return currentState;
    }
    return {
        getState,
        subscribe,
        dispatch
    }
}

export default createStore;