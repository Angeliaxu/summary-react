import Vuex from 'vuex';
import Vue from 'vue';

// 导入mutation常量
// import * as types from './mutation_type';
import moduleA from './moduleA';

Vue.use(Vuex);

// export default new Vuex.Store({
//     state:{
//         count:0,
//         item :[
//             {
//                 id:0,
//                 name:'xuchang'
//             },{
//                 id:1,
//                 name:'angelo'
//             }
//         ]
//     },
//     mutations:{
//         // 额 ，对象的key只能是字符串，以前是不能用变量来作为对象的key，会转变为字符串，如果有一个变量需要当做key，那么用[]把变量给包起来。
//         // mutataion可以接受额外的参数，即mutation的载荷（payload）
//         [types.INCREMENT](state,payload){
//             state.count += payload.n
//         },
//         [types.DECREMENT](state){
//             setTimeout(() => {
//                 state.count--
//             }, 1000);  
//         },
//         [types.PUSHITEM](state){
//             state.item.push({
//                 id:3,
//                 name:'sdasad'
//             })
//         }
//     },
//     getters:{
//         // getter下方法第一个参数是state，第二个参数可以是getter对象
//         itemAfter:state=>state.item.filter(item=>item.id>0),
        
//         itemLen:(state,getters)=>{
//             return getters.itemLength;
//         },
//         itemLength:state=>state.item.length,
//         // getter可以返回一个函数，调用getter可以传参
//         lookInto:state=>(id)=>state.item.filter((item)=>{
//             if(item.name == id){
//                 return 'have'
//             }
//         })
//     },
//     actions:{
//         // actions用来处理异步操作，返回一个Promise
//         incrementAction({commit},payload){
//            return new Promise((resolve,reject)=>{
//                 setTimeout(() => {
//                     commit(types.INCREMENT,payload);
//                     resolve('数据修改成功');
//                 }, 5000);
//            })    
//         },
//         // actions可以接受额外的参数，即payload
//         payload({state, commit},payload){
//             console.log(payload);
//         },

//         // async函数返回promise，测试一下

//         async testAsync({dispatch},payload){
//             await dispatch('incrementAction',payload);
//             return 1
//         }
//     }
// })

/* 
    使用模块分割的方式

*/
export default new Vuex.Store({
    modules:{
        moduleA
    }
})