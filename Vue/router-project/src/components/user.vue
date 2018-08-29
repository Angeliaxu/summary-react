<template>
    <div id="user">
        <h1>欢迎来到{{$route.params.id}}的主页面</h1>
        <nav>
            <!-- 使用对象的方式绑定路径 -->
            <!-- <router-link :to="{path:'/nest/xuchang'}">用户资料</router-link> -->
            <!-- 使用命名路由的方式绑定路径 -->
            <!-- <router-link :to="{ name: 'nest', params: { id: 'xuchang' }}">用户资料</router-link> -->
            <!-- 直接使用路径的方式访问 -->
            <!-- <router-link to="nest/xuchang">用户资料</router-link> -->
            <router-link to="nest/xuchang">用户资料</router-link>
            <!-- 使用path带 params 是不生效的，只会生成/nest -->
            <!-- <router-link :to="{path: 'nest', params: { id: 'xuchang'}}">用户资料</router-link> -->
            <router-link to="/">用户发布的文章</router-link>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
    export default{
        name:'user',
        created() {
            // console.log(this.$route)
        },
    }
</script>

<style>
    #user nav {
        /* border:1px solid #bbb; */
        width:300px;
        margin: 50px auto;
        text-align: left;
        overflow: hidden;
    }
    nav a:nth-child(1){
        float: left;
        text-align: center;
        width:150px;
        color:brown;
    }
    nav a:nth-child(2){
        float: right;
        text-align: center;
        width:150px;
        color:brown;
    }
</style>

