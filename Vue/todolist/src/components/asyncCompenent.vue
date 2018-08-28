<template>
    <div id="app">
        <h1>异步加载组件</h1>
        <button @click="changeCondition">点击我异步加载子组件</button>
        <div v-if="condition" >
            <async-example></async-example>
            <!-- <Asynccomponent></Asynccomponent> -->
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import child from './childComponent';
    import Loadingcomponent from './loadingComponent';
    // 异步加载组件
    Vue.component('async-example', function(resolve, reject) {
        setTimeout(() => {
            resolve(child);
        }, 5000)
    })

    // 处理加载状态
    const AsyncComponent = () => ({
        // 需要加载的组件 (应该是一个 `Promise` 对象)
        component: import('./childComponent.vue'),
        // 异步组件加载时使用的组件
        loading: Loadingcomponent,
        // 加载失败时使用的组件
        // error: ErrorComponent,
        // 展示加载时组件的延时时间。默认值是 200 (毫秒)
        delay: 200,
        // 如果提供了超时时间且组件加载也超时了，
        // 则使用加载失败时使用的组件。默认值是：`Infinity`
        timeout: 3000
    })
    Vue.component('Asynccomponent', AsyncComponent);

    export default{
        name:'asyncComponent',
        data() {
            return {
                condition: false
            }
        },
        methods: {
            changeCondition() {
                this.condition = !this.condition;
            }
        }
    }
</script>

<style>
    #app{
        text-align: center;
    }
</style>
