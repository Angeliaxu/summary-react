<template>
    <div id="home">
        <div class="navigator">
            <img src="../assets/logo.png" alt="logo" @click="backTohome">
            <router-link to="/login" class="login">登录</router-link>  
        </div>
        <h1>欢迎来到小屁格餐厅</h1>
        <div>
            <router-link to="/project" class="link">我的项目</router-link>
            <router-link to="/document" class="link">我的文档</router-link>
        </div>
        <i class="iconfont icon-rou"></i>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        backTohome() {
            this.$router.push('/')
        }
    },
    created() {
        this.$util.save(1);
    },
}
</script>

<style scoped>

</style>
