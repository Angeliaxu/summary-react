// 响应式系统
function cb() {
    console.log('视图更新了');
}
function defineReactive(obj, key, value) {
    const dep = new Dep();
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        get() {
            dep.addSubs(Dep.target)
            return value
        },
        set(newVal) {
            if(value !== newVal) {
                value = newVal;

                // cb(newVal)
                dep.notify();
            }
        }
    }) 
}

function observer(obj) {
    const keys = Object.keys(obj);
    keys.forEach(key => {
        defineReactive(obj, key, obj[key]);
    });
}

class vue{
    constructor(option) {
        this.data = option.data;
        observer(this.data);
        new Watcher();
        console.log('render', this.data.age)
    }
}
// 依赖收集

class Dep {
    constructor(){
        this.subscribe = [];
    }
    addSubs(fn){
        this.subscribe.push(fn);
    }
    notify() {
        this.subscribe.forEach(sub => sub.update());
    }
}
// watcher
class Watcher {
    constructor() {
        Dep.target = this;
        console.log(this);
    }
    update(){
        console.log('视图更新');
    }
}
Dep.target = null;

let ins = new vue({
    data: {
        age: 99,
        name: 'Alice'
    }
})
ins.data.age = 77;