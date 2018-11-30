
let target = null;
class Dep {
    constructor() {
        this.subscriber = [];
    }
    depend() {
        // 订阅模式，订阅行为
        if (target && !this.subscriber.includes(target)) {
            this.subscriber.push(target);
        }
    }
    notify() {
        // 发布模式，发布消息
        this.subscriber.forEach(sub => sub());
    }
}
const dep = new Dep();
// 观察者
function watcher(myfn) {
    target = myfn;
    target();
    target = null;
}
// 使用Object.defineProperty()
function inital (obj) {
    // 循环对象下的所有key
    Object.keys(obj).forEach((key) => {
        let internalValue = obj[key];
        Object.defineProperty(obj, key, {
            get() {
                dep.depend();
                return internalValue;
            },
            set(newValue) {
                internalValue = newValue;
                dep.notify();
            }
        })
    })
}
let data ={
    price: 5,
    quantity: 2
}
inital(data);
watcher(()=> {
    data.total = data.price * data.quantity;
})
console.log(data.total)