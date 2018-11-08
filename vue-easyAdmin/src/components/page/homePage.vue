<template>
    <div id="page">
        <div class="top-bar">
            <i class="iconfont icon-huojian"></i>
        </div>
        <h1>欢迎来到屁格餐厅</h1>
        <h2>Yummy Food</h2>
        <form>
            <el-input v-model="username" placeholder="请输入用户名"></el-input>
            <el-input v-model="password" placeholder="请输入密码" type="password"></el-input>
            <el-button @click="username&&password&&login()">登录</el-button>
        </form>
    </div>
</template>

<script>

export default {
    data() {
        return {
            username: '',
            password: '',
        }
    },
    created() {},
    methods: {
        login() {
            this.$router.push('/main')
        },
    }
}
</script>

 <style scoped lang="scss">
    #page {
        text-align: center;
        max-width: 1140px;
        margin: 0 auto;
        // padding: 50px 0;
        .iconfont {
            font-size: 24px;
            // color: 
        }
        .top-bar {
            height: 60px;
            background: peru;
            border-radius: 20px;
            padding: 20px 0;
        }
        form {
            width: 200px;
            height: 150px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
    }
 </style>
 