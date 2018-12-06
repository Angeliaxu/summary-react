function Promise(executor) {
    this.status = 'pending';
    this.data;
    this.onResolvedCallback = [];
    this.onRejectedCallback = [];

    // resolve 函数
    function resolve(value) {
        if (this.status === 'pending') {
            this.status = 'resolved'
            this.data = value;
            this.onResolvedCallback.forEach(fn => {
                fn(value)
            });
        }
    }

    //reject函数 
    function reject(error) {
        if (this.status === 'pending') {
            this.status = 'rejected';
            this.data = error;
            this.onRejectedCallback.forEach(fn => {
                fn(error)
            })
        }
    }
    try {
        executor(resolve, reject)  
    } catch (error) {
        reject(error)
    }
}

Promise.prototype.then = function(onResolved, onRejected) {
    var promise2;

    onResolved = typeof onResolved === 'function' ? onResolved : function(v) {}
    onRejected = typeof onRejected === 'function' ? onRejected : function(r) {}

    if(this.status === 'resolved') {
        return promise2 = new Promise(function(resolve, reject) {
            try {
                var x = onResolved
            } catch (error) {
                reject(error)
            }
        })
    }
    if(this.status === 'rejected') {
        return promise2 = new Promise(function(resolve, reject) {})
    }
    if(this.status === 'pending') {
        return promise2 = new Promise(function(resolve, reject) {})
    }
}
new Promise((resolve, reject) => {
    resolve(1)
})