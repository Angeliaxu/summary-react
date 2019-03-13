export default function applyMiddleware(...middlewares) {
    return next => (reducer, initialState) => {
      const store = next(reducer, initialState)
      let dispatch = () => {
        throw new Error(
          `Dispatching while constructing your middleware is not allowed. ` +
            `Other middleware would not be applied to this dispatch.`
        )
      }
    // store 的初始化初始reducer中返回回来的state，此时的store和顶部的store里面的东西一样吗？
      const middlewareAPI = {
        // 先获取当前store中存储的state，和外部store初始化获取得到的state是一致的
        getState: store.getState,
        dispatch: (...args) => dispatch(...args)
      }
      const chain = middlewares.map(middleware => middleware(middlewareAPI))
      dispatch = compose(...chain)(store.dispatch);
      console.log(dispatch)
      console.log(chain)
      return {
        ...store,
        dispatch
      }
    }
  }

function compose(...funcs) {
    if (funcs.length === 0) {
      return arg => arg
    }
  
    if (funcs.length === 1) {
      return funcs[0]
    }
  
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

/* 
    自定义一个Middleware
*/
function logger (store) { 
    return (next) => (action) => {
       console.log(next);
       console.log('will dispatch', action);
       console.log(store.dispatch)
       let returnValue = next(action);
       console.log('finish', action)
       console.log(store.getState());
       // return returnValue;
   }
}