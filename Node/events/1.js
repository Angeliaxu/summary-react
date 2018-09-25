/* 
    events:
        所有能触发事件的对象都是eventEmitter的实例，
        on：注册事件
            1.this指向问题与函数的形式有关
            2.异步与同步问题
                事件触发是同步有序的
                合适的时候如果要事件是异步执行，使用setImmediate或者process.nextTick

        emit(eventname, arguments)：触发事件
        once：事件只触发一次，之后再调用不触发
*/
const eventEmitter = require('events');

class MyEmitter extends eventEmitter{}

let MyEmitters =  new MyEmitter()
/* 
    this 
*/
/* MyEmitters.on('event', () => {
    console.log('register event')
    console.log(this) // {}
})
MyEmitters.on('events', function(){
    console.log(this) // MyEmitters
})
MyEmitters.emit('event')
MyEmitters.emit('events') */

/* 
    synchronous vs asynchronous
    result
        this happens synchronous
        this happens asynchronous
        eventLoop
*/

// MyEmitters.on('synchronous', () => {
//     console.log('this happens synchronous')
// })
// MyEmitters.on('asynchronous', () => {
//     setImmediate(() => {
//         console.log('this happens asynchronous')
//     })
// })
// MyEmitters.on('eventLoop', () => {
//     setTimeout(() => {
//         console.log('eventLoop')
//     }, 1000)
// })

// MyEmitters.emit('asynchronous')
// MyEmitters.emit('synchronous')
// MyEmitters.emit('eventLoop')


/* 
    触发事件一次：使用once
*/

/* MyEmitters.once('synchronous', () => {
    console.log('this happens synchronous')
})
MyEmitters.emit('synchronous')
MyEmitters.emit('synchronous') */

/* 
    错误事件：最好给eventListener添加上错误事件
*/
/* const myEmitter = new MyEmitter();
myEmitter.on('error', (err) => {
  console.error(err);
});
myEmitter.emit('error', new Error('whoops!')); */

/* 
    events的子类给每个事件默认的设置了最多能注册10个同名称的事件
        MyEmitter.defaultMaxListeners
        通过MyEmitter.defaultMaxListeners = 20设置这个类下的所有实例可接受的最多事件
        也可以通过给MyEmitter的实例单独设置emitter.setMaxListeners(n)， 获取emitter.getMaxListeners()
*/
/* console.log(MyEmitter.defaultMaxListeners = 20) // 10
console.log(MyEmitter.defaultMaxListeners) */


/* 
    events提供的方法
*/
const myEmitter = new MyEmitter();
myEmitter.on('a', function(){})
myEmitter.on('a', function(){})
myEmitter.on('b', function(){})
myEmitter.on('b', function(){})
console.log(myEmitter.eventNames()); // [ 'a', 'b' ]
console.log(myEmitter.setMaxListeners(100))
console.log(myEmitter.getMaxListeners()) // 100
console.log(myEmitter.listenerCount('a')) // 2
console.log(myEmitter.listeners('a'))
