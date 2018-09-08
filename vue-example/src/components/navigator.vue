<template>
    <div>
        <ul>
            <!-- 
                router-link通过to属性来绑定跳转的路由地址，通过tag属性来改变其显示的元素
                标签，通过event属性来改变触发路由跳转的方式，通过active-class属性来改变
                路由生效的当前class名或者可以直接使用linkActiveClass。
                exact代表精确匹配
             -->
            <router-link to="/home" tag="li">Home</router-link>
            <router-link to="/document#current" active-class="anotherColor" tag="li">Document</router-link>
            <router-link :to="{name: 'about'}" tag="li">About</router-link>
            <router-link to="/user" tag="li">User</router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'navigator'
    }
</script>

<style scoped>
    ul,li {
        list-style: none;
    }
    .anotherColor {
        color: yellowgreen;
    }
    li {
        display: inline-block;
    }
</style>
