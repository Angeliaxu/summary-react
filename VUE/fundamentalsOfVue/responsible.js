
// 响应式系统的依赖收集追踪原理

/* 
    订阅者

*/
class Dep {
    constructor() {
        this.subs = []
    }
    addSub (sub) {
        this.subs.push(sub)
    }
    notify () {
        this.subs.forEach((sub) => {
            sub.update()
        })
    }
}

/* 
    观察者watcher
*/
class Watcher {
    constructor() {
        Dep.target = this
        console.log(this)
    }
    update() {
        console.log(this)
        console.log('视图更新了')
    }
}

Dep.target = null;

function cb (newVal){
    console.log(newVal)
}

// 数据绑定,使用存取描述符
function defineReactive(obj, key, val){
    let dep = new Dep();
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter(){
            dep.addSub(Dep.target)
            return val
        },
        set: function reactiveSetter(newVal){
            if (newVal == val) return;
            dep.notify()
            // cb(newVal)
        }
    })
    console.log(obj)
}

// 封装一个observer
function observer(value){
    if(!value || (typeof value !== 'object')){
        return;
    }
    Object.keys(value).forEach((key) => {
        defineReactive(value, key, value[key])
    })
}

// Vue构造函数
class Vue{
    constructor(options) {
        this._data = options.data;
        observer(this._data)
        new Watcher();
    }
}

let o = new Vue({
    data: {
        test: 'i am test'
    }
})
o._data.test = 'test'