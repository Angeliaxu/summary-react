class Promise{
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
let p = new Promise((resolve, reject)=>{
    // setTimeout(() => {
    //     resolve(5)
    // }, 1000);

    resolve(6666)
})
p.then(value => {
    return new Promise((resolve) => {
        resolve(555)
    })
    // return 1
}).then(value1 => {
    console.log('value1', value1)
})

/* .then((value2)=>{
    console.log(value2)
}).then((value3)=>{
    console.log(value3)
}) */
/* then(successfn, errfn) {
    if(this.status === 'resolve') {
      return new Promise1((res, rej) => {
        successfn(this.data)
      })
    }
    if(this.status === 'reject') {
      console.log('reject')
    }
    if(this.status === 'pending') {
      const that = this
      return new Promise1((res, rej)=>{
        that.resolveCallback.push(function(value) {
          var x = successfn(value)
          if(x instanceof Promise1) {
            x.then(res, rej)
          } else {
            res(x)
          } 
        })
       
      })
    } */

//   }
