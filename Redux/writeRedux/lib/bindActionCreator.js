


function bindActionCreator(actionCreator, dispatch) {
    return (...agrs) => {
        return dispatch(actionCreator(...agrs));
    }
}

export default function bindActionCreators (actionCreator, dispatch) {
    if (typeof actionCreator === 'function') {
        return bindActionCreator(actionCreator, dispatch);
    }
    let list = {}
    Object.keys(actionCreator).forEach((key) => {
        if (typeof actionCreator[key] === 'function') {
            list[key] = bindActionCreator(actionCreator[key], dispatch);
        }
    })
    return list;
}
