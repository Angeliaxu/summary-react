<template>
    <div id="login">
        <input type="text" placeholder="请输入账户" v-model="name">
        <input type="password" placeholder="请输入密码" v-model="password">
        <p>
            <button type="button" @click="login">登录</button>
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            password: ''
        }
    },
    methods: {
        login() {
            if (this.name && this.password) {
                localStorage.setItem('token', '登录了');
                this.$router.replace('/user');
            }
        }
    },
    components: {

    }
}
</script>

<style scoped>

</style>
