<template>
    <div id="app">
        <div>{{count}}</div>
        <ul>
            <li v-for="(item, index) in item" :key="index">{{item.name}}</li>
        </ul>
        <p>这是通过数组方式映射的数组长度：{{itemLen}}</p>
        <p>这是通过对象另取属性名的方式：{{length}}</p>
        <p>有没有这个人：{{havePerson[0].name}}</p>
        <button @click="increment({n:2})">+</button>
        <button @click="decrement">-</button>
        <button @click="pushItem">像数组里面添加元素</button>
        <button @click="incrementAction({n:2})">异步加载dispatch</button>
        <button @click="payload({n:2})">dispatch的载荷</button>
        <button>使用promise来返回action</button>
        <Num/>
    </div>
</template>
<script>
    import Vuex from 'vuex'
    import Vue from 'vue'
    import Num from './num.vue'
    import { mapState ,mapGetters,mapMutations,mapActions} from 'vuex'

    export default{
        name:'count',
        data(){
            return{
                // count:store.state.count
            }
        },
        computed:{
            // 获取state值
            ...mapState(['count','item']),
            // 获取处理好的state值，getter在通过属性访问时作为vue的响应式系统一部分缓存其中的
            ...mapGetters(['itemLen']),
            // 通过对象形式访问getter可以给getter属性另取属性名。
            ...mapGetters({
                length:'itemLen'
            }),    
            // 通过方法访问getter属性 
            havePerson(){
               return this.$store.getters.lookInto('angelo')
            }
        },
        methods:{
            // 手动的去调用mutation里面的回调函数
           /*  increment(){
                let n = 2;
                this.$store.commit({
                    type:'increment',
                    n
                })
            },
            decrement(){
                this.$store.commit('decrement')
            },
            pushItem(){
                this.$store.commit('pushItem')
            } */

            // 使用辅助函数mapMutations

            ...mapMutations(['decrement','pushItem','increment']),
            // 问题：怎么办increment映射出来并传入值,嘻嘻 解决了 如上，调用次方法的时候传入参数
            // increment(n){
            //     console.log(n);
            //     // let n = 2;
            //     // this.$store.commit({
            //     //     type:'increment',
            //     //     n
            //     // })
            // }
            /* 
                分发dispatch，
            */

        //    dispatch(){
        //        this.$store.dispatch('incrementAction')
        //    },
           /* dispatchPayload(){
                //第一种写法    
            //    this.$store.dispatch('payload',{name:'payload'})
                // 第二种写法,通过对象的方式
                this.$store.dispatch({
                    type:'payload',
                    name:'payload'
                })
           } */
            /* 
                使用mapAction 辅助函数将this.$store.dispatch('incrementAction'）
                映射为this.incrementAction()
            
            */

            ...mapActions(['incrementAction','payload']),

            // 分发dispatch，并作为promise对象返回

            async dispatch(){
                console.log(1)
                await this.$store.dispatch('testAsync',{
                    n:2
                });
                console.log(2)
            },
        },
        components:{
            Num,
        },
        async created(){
            await this.dispatch()
        }
        
    }
</script>
<style>
    #app{
        width: 100px;
        height:100px;
        margin:100px auto 0;
        text-align: center;
    }
    #app button{
        display: inline-block;
    }
</style>