/* 
    常规javascript的运作方式，我修改了price，但是total并不会因此改变
    问题：当price改变的时候我需要改变与他相关的计算方式得到的结果。
*/
let price = 5;
let quantity = 2;
price = 20;
// console.log(total);

/* 
    进一步优化：把即将运行的代码，存储起来，可能在另外一个时间运行它
*/
let target = null;;
target = () => {
    total = price * quantity;
}
let storage = [];
function record() {
    storage.push(target);
}
function replay() {
    storage.forEach(run => run());
}

target()
// 需要运行的代码存储
record()

console.log(total);
price = 10;
// 相关变量改变，运行存储代码
replay();
console.log(total);

/* 
    问题：我们可以根据需要继续记录目标，扩展应用，建立一个负责维护目标列表的类，当需要重新运行时，这些目标列表会得到通知
*/
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
dep.depend();
target();
console.log(total);
price = 30;
dep.notify()
console.log(total);

function watcher(myfn) {
    let target = myfn;
    target();
    dep.depend();
    target = null;
}
