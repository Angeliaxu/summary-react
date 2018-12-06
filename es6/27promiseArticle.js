// 抛出问题
/* doSomething(function(value) {
    console.log(`got a value ${value}`)
})
doSomething().then(function(value) {
    console.log(`got a value ${value}`)
})

function doSomething(callback) {
    var value = 42;
    callback(value)
}

function doSomething() {
    return {
        then: function (callback) {
            var value = 42;
            callback(value)
        }
    }
} */

// 雏形，存在的问题：resolve会比then先执行，then里面注册的回调不会执行。
/* function Promise(fn) {
    var callback = null;
    this.then = function (cb) {
        callback = cb;
    }
    function resolve (value) {
        // setTimeout(function() {
        //     callback(value);
        // });
        callback(value);
    }
    fn(resolve)
}
let fn = new Promise((resolve, reject)=>{
    resolve(1)
})
fn.then(()=> {
    console.log(1)
}) */

// 进一步实施我们的promise
function Promise (fn) {
    var state = 'pending';
    var value ;
    var deferred = null;
    // 实现resolve函数并传给传入进来的fn的第一个参数
    function resolve(newValue) {
        console.log(this)
        value = newValue;
        state = 'resolved'

        // deferred 存的是then注册的回调函数，promise处于pending那种，resolve之后就会调用注册函数
        if(deferred) {
            handle(deferred)  
        }
        // console.log('进resolved')
    }
    // 实现reject函数并传入给进来的fn的第二个参数
  /*   function reject(error) {
        value = error;
        state = 'reject';
    } */
    // 观察者：处理then函数注册回调函数
    function handle(handler) {
        /*  
            如果new promise中存在异步，那么then注册的函数不能马上执行，必须得等resolve之后才能执行
            如果new promise中是同步，那么then注册的函数会立即在resolve之后执行
        */
        if (state === 'pending') {
            deferred = handler;
            return;
        }
        let nextValue = handler.onResolved(value);
        handler.resolve(nextValue);
    }

    // onResolved是then注册的回调函数
    this.then = function (onResolved){
        return new Promise(function(resolve){
            handle({
                onResolved,
                resolve
            })
        })
        // // 把then注册的回调交给handle处理
        // handle(onResolved);
    }
    fn(resolve)
    // function fn(resolve){
    //     handle({
    //         onResolved,
    //         resolve
    //     })
    // }
}
let p = new Promise((resolve) => {
    // setTimeout(()=>{
    //     resolve(2)
    // }, 1000)
    resolve(2)
});
// then 总是返回promise
let p2 = p.then((value)=>{
    console.log(value)
    return 4;
})

