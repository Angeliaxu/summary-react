function Promise(fn) {
    var state = 'pending',
        value = null,
        callbacks = [];

    this.then = function (onFulfilled) {
        if (state === 'pending') {
            callbacks.push(onFulfilled);
            return this;
        }
        onFulfilled(value);
        return this;
    };

    function resolve(newValue) {
        value = newValue;
        state = 'fulfilled';
        setTimeout(function () {
            callbacks.forEach(function (callback) {
                callback(value);
            });
        }, 0);
    }

    fn(resolve);
}
const makeApiCall = () => {
    return new Promise((resolve, reject) => {
        // setTimeout(() => {
        //     const apiResponse = fakeApiBakend();
        //     if (apiResponse.statusCode >= 400) {
        //         reject(apiResponse)
        //     } else {
        //         resolve(apiResponse.data)
        //     }
        // }, 5000)
        const user = {
            username: 'xuchang',
            num : 42,
            profile: 'http://www.baidu.com'
        }
        resolve(user);
    })
}
makeApiCall().then(user => {
    console.log('in the first .then()')
    return user;
}).then(user => {
    console.log(`User ${user.username}'s favorite number is ${user.num}`);
    return user;
}).then(user => {
    console.log(`the previous .then() told you the num`);
    return user.profile
}).then(profile => {
    console.log(`the profile URL is ${profile}`)
}).then(() => {
    console.log(`this is the last then()`)
}).catch(()=> {
    console.log(err.message)
})