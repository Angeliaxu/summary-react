

export default function combineReducers(reducers) {
    let reducersKey = Object.keys(reducers);
    return function(state= {}, action) {
        // let nextState = {};
        // reducersKey.forEach(reducersKey => {
        //     nextState[reducersKey] = reducers[reducersKey](state[reducersKey], action);
        // })
        // return nextState;
        return reducersKey.reduce((prev,curr) => {
            prev[curr] = reducers[curr](state[curr], action)
            return prev;
        }, {})  
    }
}