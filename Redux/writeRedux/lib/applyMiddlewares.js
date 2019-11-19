

export default function applyMiddlewares(...middleware) {
    return (createStore) => (reducer, initalState) => {
        const store = createStore(reducer, initalState);
        // 在中间件里面使用dispatch报错
        let dispatch = () => {
            throw Error('不能在此执行dispatch')
        }
        const middlewareApi = {
            getState: store.getState,
            dispatch: (...agrs) => dispatch(...agrs)
        }
        const chain = middleware.map(middleware => middleware(middlewareApi));
        dispatch = compose(...chain)(store.dispatch);
        // dispatch是一个被重写的函数
        return {
            ...store,
            dispatch
        }
    }
}
/* 
    写一个middleware的签名函数是({getState, dispatch}) => next => action 
    
    next代表是compose里面组合的下一个中间件函数，
    store.dispatch是一个被重写的函数，发起action之后传递action至最里层中间件，
    最里层中间件函数使用真正的store.dispatch触发reducer。然后一层一层向外返回，
    store.dispatch的返回值是action
    以下面logger为例，来看看到底中间件返回的的到底是什么

*/

 (action) => {
    console.log('will dispatch', action)

    // 调用 middleware 链中下一个 middleware 的 dispatch。
    let returnValue = ((action) => {
        console.log('will dispatch', action)
    
        // 调用 middleware 链中下一个 middleware 的 dispatch。
        let returnValue = store.dispatch(action)
    
        console.log('state after dispatch', getState())
    
        return returnValue
    })(action)

    console.log('state after dispatch', getState())

    // 一般会是 action 本身，除非
    // 后面的 middleware 修改了它。
    return returnValue
  }

