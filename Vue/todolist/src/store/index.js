import Vuex from 'vuex';
import Vue from 'vue';


Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        count:0,
        item :[
            {
                id:0,
                name:'xuchang'
            },{
                id:1,
                name:'angelo'
            }
        ]
    },
    mutations:{
        increment(state){
            state.count++
        },
        decrement(state){
            state.count--
        },
        pushItem(state){
            state.item.push({
                id:3,
                name:'sdasad'
            })
        }
    },
    getters:{
        // getter下方法第一个参数是state，第二个参数可以是getter对象
        itemAfter:state=>state.item.filter(item=>item.id>0),
        
        itemLen:(state,getters)=>{
            return getters.itemLength;
        },
        itemLength:state=>state.item.length,
        // getter可以返回一个函数，调用getter可以传参
        lookInto:state=>(id)=>state.item.map((item)=>{
            if(item.name == 'id'){
                console.log(1)
                return 'have'
            }else{
                console.log(2)
                return 'no'
            }
        })
    }
})