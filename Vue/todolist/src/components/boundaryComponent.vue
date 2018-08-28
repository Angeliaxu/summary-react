<template>
    <div id="app">
        <h1>处理边界情况</h1>
        <childComponent ref="child" ></childComponent>
        <div>
            <button @click="focus">点击父组件聚焦子组件的input框</button>
        </div>
    </div>
</template>

<script>
    /* 
        在绝大多数情况下，最好不要触达另一个组件实例内部或手动操作DOM元素。但是也存在某些情况下是合理的
    
    */
   import Vue from 'vue';
   import childComponent from './childComponent';
   Vue.component(childComponent.name, childComponent);
   
   export default{
        name: 'boundarycomponent',
        data() {
            return {
                initdata: '33333',
                arr: [1, 2, 3, 4, 5, 6]
            }
        },
        created() {
            console.log(this);
        },
        methods: {
            focus() {
                // ref 和 v-for一起使用，得到的引用是一个包含对应数据源的子组件的数组
                this.$refs.child.focus();
                console.log(this.$refs);
            }
        },
        mounted() {
            // 父组件访问子组件实例或者元素，给子组件或者元素赋予一个ref属性
            /* 给子组件一个ref，再给子组件的input框给个ref，在子组件内部定义好方法
                来给input框聚焦。
                控制子组件的ref再控制方法
            */
            // this.$refs.child.focus();
        },
    }
</script>
<style>
    h1{
        text-align: center;
    }
</style>
