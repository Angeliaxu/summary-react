<template>
    <div id="login">
        <h3>登录</h3>
        <div>
            <input type="text" placeholder="请输入你的用户名" v-model="account"/>
            <input type="password" placeholder="请输入你的密码" v-model="password"/>
            <button type="button" @click="login">一键进入</button>           
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            account: '',
            password: ''
        }
    },
    methods: {
        login() {
            if (this.account && this.password) {
                this.$util.save('token', {
                    account: this.account,
                    login: true
                });
                let redirect = this.$route.query.redirect;
                if (!redirect) {
                    redirect = 'project'
                }
                this.$router.push('/'+ redirect);
            }
        },
    }
}
</script>