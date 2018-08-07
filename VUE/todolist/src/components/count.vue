<template>
    <div id="app">
        <div>{{count}}</div>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
        <Num/>
    </div>
</template>
<script>
    import Vuex from 'vuex'
    import Vue from 'vue'
    import Num from './num.vue'

    export default{
        name:'count',
        data(){
            return{
                // count:store.state.count
            }
        },
        computed:{
            count(){
                return this.store.state.count
            }
        },
        methods:{
            increment(){
                this.store.commit('increment')
            },
            decrement(){
                this.store.commit('decrement')
            }
        },
        components:{
            Num,
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