let price = 2;
let quantity = 5;
let total = 0;
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
function watcher(myfn) {
    target = myfn;
    dep.depend();
    target();
    target = null;
}
// 收集行为
watcher(()=> {
    total = price * quantity;
})
console.log(total);
price = 10;
dep.notify();
console.log(total)

// 使用Object.defineProperty()
let data ={
    price: 5,
    quantity: 2
}
let internalValue = data.price;
Object.defineProperty(data, 'price', {
    get() {
        return internalValue;
    },
    set(newVlaue) {
        if (newVlaue !== internalValue) {
            internalValue = newVlaue;
        }
    }
})

total = data.price * data.quantity;
data.price = 20;
console.log(total)
// 循环对象下的所有key
function inital (obj) {
    Object.keys(obj).forEach((key) => {
        let internalValue = obj[key];
        Object.defineProperty(obj, key, {
            get() {
                return internalValue;
            },
            set(newValue) {
                internalValue = newValue;
            }
        })
    })

}
