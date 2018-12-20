/* class Promise{
    constructor(fn) {
        this.value;
        this.status = 'pending';
        this.chain = [];
        // 使用bind返回的是一个新函数,绑定this
        const resolve = this.resolve.bind(this);
        const reject = this.reject.bind(this)
        // 处理异常错误
        try {
            fn(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    resolve(value) {
        // promise状态一旦改变不可逆
        if (this.status === 'pending') {
            this.status = 'resolve';
            this.value = value;
            // 由resolve完成执行数组里面的注册回调
            for (const {onResolvedCallback} of this.chain) {
                console.log(onResolvedCallback.toString());
               onResolvedCallback(this.value)
            }
        }
    }
    reject(error) {
        if (this.status === 'pending') {
            this.status = 'reject';
            this.value = error;
            for (const {onRejectedCallback} of this.chain) {
                onRejectedCallback(this.value)
            }
        }
    }
    then(onResolvedCallback, onRejectedCallback) {
        const _this = this;
        // 如果没传那么就要忽略
        onResolvedCallback = typeof onResolvedCallback == 'function' ? onResolvedCallback : function(value) {}
        onRejectedCallback = typeof onRejectedCallback == 'function' ? onRejectedCallback : function(error) {}
        // 返回一个新的promise
        return new Promise(function(resolve, reject) {
            const _onResolved = function(res) {
                try {
                    let a = onResolvedCallback(res);
                    if (a instanceof Promise) {
                        a.then(resolve, reject)
                    } else {
                        resolve(a)
                    }
                } catch (error) {
                    reject(error)
                }
            }
            
            const _onRejected = function(err) {
                try {
                    resolve(onRejectedCallback(err))
                } catch (error) {
                    reject(error)
                }
            }

            if (_this.status === 'resolve') {
                // 同步执行
                _onResolved(_this.value)
            } else if (_this.status === 'reject') {
                _onRejected(_this.value)
            } else {
                // 异步把回调依次进入数组
                _this.chain.push({onResolvedCallback: _onResolved, onRejectedCallback: _onRejected})
            }
        })
    }
}
let p = new Promise((resolve, reject) => {
    console.log(this)
    // setTimeout(() => {
    //     resolve(5)
    // }, 1000);

    resolve(6666)
})
p.then(value => {
    console.log(value)
    return new Promise((resolve) => {
        resolve(555)
    })
    // return 1
}).then(value1 => {
    console.log('value1', value1)
}) */

/* .then((value2)=>{
    console.log(value2)
}).then((value3)=>{
    console.log(value3)
}) */


class Promise {
    constructor(fn) {
        this.status = 'pending';
        this.value;
        this.chain = [];
        const resolve = this.resolve.bind(this);
        fn(resolve)
    }
    resolve(value) {
        this.status = 'resolve';
        this.value = value;
        // return promise后的then回调在这里
        for(let {_onResolved} of this.chain) {
            _onResolved(this.value)
        }
    }
    then(onResolvedCallback) {
        return new Promise((resolve) => {
            const _onResolved = function(res) {
                let result = onResolvedCallback(res);
                if (result instanceof Promise) {
                    result.then(resolve);
                } else {
                    resolve(result);
                    
                }  
            }
            if(this.status === 'resolve') {
                _onResolved(this.value)
            }else {
                this.chain.push({
                    _onResolved
                })
            }
        })    
    }
}

let p = new Promise((resolve, reject) => {
    // resolve('success');
    setTimeout(()=> {
        resolve('33333')
    }, 5000)
})
p.then((value) => {
    console.log(value)
    return new Promise((resolve) => {
        resolve(9999)
    })
}).then((res)=>{
    console.log(res);
})