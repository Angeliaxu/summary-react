import axios from 'axios'
import queryString from 'querystring'
// axios({
//     method: 'get',
//     url: 'https://www.easy-mock.com/mock/5b98b9fa7d22f221e9ec9601/user/userInfo',
//     timeout: 2000
// })
// .then((response) => {
//     console.log(response)
// })
// .catch((error) => {
//     // 捕获错误
//     console.log(error)
// })

// axios({
//     method: 'post',
//     url: 'https://www.easy-mock.com/mock/5b98b9fa7d22f221e9ec9601/user/login',
//     timeout: 2000
// })
// .then((response) => {
//     console.log(response)
// })
// .catch((error) => {
//     // 捕获错误
//     console.log(error)
// })


// axios.get('https://www.easy-mock.com/mock/5b98b9fa7d22f221e9ec9601/user/userInfo', {
//     // 给地址加上queryString，https://www.easy-mock.com/mock/5b98b9fa7d22f221e9ec9601/user/userInfo?id=1&server=pc
//     params: {
//         id:1,
//         server:'pc'
//     },
//     timeout: 2000
// })
// .then((response) => {
//     console.log(response)
// })
// .catch((error) => {
//     // 捕获错误
//     console.log(error)
// })
// // axions第二个参数是传递到后端的data，第三个参数是请求的基本配置项
// axios.post('https://www.easy-mock.com/mock/5b98b9fa7d22f221e9ec9601/user/login', {
//     phone: 18513121797,
//     smsCode: 25955
// })
// .then((response) => {
//     console.log(response)
// })
// .catch((error) => {
//     // 捕获错误
//     console.log(error)
// })

/* // 执行并发请求
function getUserInfo(){
    return axios.get('https://www.easy-mock.com/mock/5b98b9fa7d22f221e9ec9601/user/userInfo',{},{
        timeout:5000
    })
}
function getLogin(){
    return axios.post('https://www.easy-mock.com/mock/5b98b9fa7d22f221e9ec9601/user/login', {
        phone: 18513121797,
        smsCode: 25955
    },{
        timeout:5000
    })
}
// 只有两个请求都成功了，才会进入then函数
axios.all([getUserInfo(), getLogin()])
// .then((response) => {
//     // 包含两个请求结果的数组
//     console.log(response)
// })
.then(axios.spread((result, $result) => {
    // 把请求结果数组展开
    console.log(result)
    console.log($result)
}))
.catch((error) => {
    console.log(error)
}) */
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 创建axios实例
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 创建axios实例
const service = axios.create({
    baseURL: 'https://www.easy-mock.com/mock/5b98b9fa7d22f221e9ec9601/user',
    timeout: 60000,
    headers:{
        // 'content-type': 'application/x-www-form-urlencoded'
    },
    // 只对post、patch、put方法有效，允许在向服务器发送前，修改请求数据
    transformRequest:[function(data){
        // console.log(data)
        // 必须要return data，如果不return 请求的时候参数会没有
        return queryString.stringify(data)
    }],
    // 对服务器端在传入then或者catch之前对数据进行处理
    transformResponse: [function (data) {
        // 对 data 进行任意转换处理
        // console.log(data)
        // 必须要return data，如果不return 返回的data是undefined
        return data
    }],
})
// 全局配置axios默认项和在实例里面配置默认项
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// service.request({
//     url: '/userInfo',
//     params:{
//         id:123
//     }
// }).then((response) => {
//     console.log(response)
// }, (error) => {
//     console.log(error)
// })

// service.request({
//     url: '/login',
//     data:{
//         id:123
//     },
//     method: 'POST'
// }).then((response) => {
//     console.log(response)
// }, (error) => {
//     console.log(error)
// })


// 拦截请求
service.interceptors.request.use((config) => {
    const randomaeskey = 'F8kdJSEgoN8EYWG41cN8HgAT';
    config.randomaeskey = randomaeskey;
    // console.log(config)
    return config
})

service.interceptors.response.use((config) => {
    console.log(config)
    return config
})

service.get('/userInfo', {
    params:{
        id: 132
    }
})
.then((res) => {
    console.log(res)
}, (error) => {
    console.log(error)
})

service.post('/login', {
    phone: 18513121797,
    smsCode: 25955
})
.then((res) => {
    console.log(res)
}, (error) => {
    console.log(error)
})