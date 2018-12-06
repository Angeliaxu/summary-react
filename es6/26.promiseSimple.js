class PromiseSimple {
    constructor(fn) {
        this.promiseChain = [];
        this.handleError = ()=>{};

        this.onResolve = this.onResolve.bind(this);
        this.onReject = this.onReject.bind(this);

        fn(this.onResolve, this.onReject)
    }
    then(onResolve){
        this.promiseChain.push(onResolve);
        return this;
    }
    catch(handleError){
        this.handleError = handleError;
        return this;
    }
    onResolve(value){
            let storeValue = value;
            try {
                this.promiseChain.forEach((nextFunction) => {
                    storeValue = nextFunction(storeValue)
                })
            } catch (error) {
                this.promiseChain = [];
                this.onReject(error)
            }
    }
    onReject(error) {
        this.handleError(error)
    }
}

fakeApiBakend = () => {
    const user = {
        username: 'xuchang',
        num : 42,
        profile: 'http://www.baidu.com'
    }
    if (Math.random() > .05) {
        return {
            data: user,
            statusCode: 200
        }
    } else {
        const error = {
            statusCode: 404,
            message: 'not exist',
            error: 'not found'
        }
        return error;
    }
}

const makeApiCall = () => {
    return new PromiseSimple((resolve, reject) => {
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