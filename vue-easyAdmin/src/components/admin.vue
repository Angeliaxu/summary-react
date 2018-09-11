<template>
    <div id="admin">
        <div class="navigator">
            <router-link to="/" class="img">
                <img class="logo" src="../assets/logo.png" alt="logo" @click="backTohome">
            </router-link>           
            <div class="user" v-if="isLogin">
                <img src="../assets/use.jpeg" alt="" @mouseover="showOptions" @mouseleave="hideOptions">
                <p>{{account}}</p>
                <ul :class="show?'show':'hide'">
                    <li 
                        @mouseover="showOptionss" 
                        @mouseleave="hideOptionss" 
                        @click="backTohome">
                        退出
                    </li>
                </ul>
            </div>
             <router-link to="/login" class="login" v-else>登录</router-link>
        </div>
        <div class="content">
            <ul class="nav">
                <router-link :to="{name:'project'}" tag="li">我的项目</router-link>
                <router-link :to="{name:'workbench'}"  tag="li">我的工作台</router-link>
                <router-link :to="{name:'document'}" tag="li">我的文档</router-link>
            </ul>
        </div>
        <p class="breadNav">首页/{{flag}}</p>
        <div class="main">
            <transition name="enter" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
const flags = {
    'project': '项目',
    'workbench': '工作台',
    'document' : '文档'
}
export default {
    data() {
        return {
            show: false,
            timer: '',
            isLogin: false,
            account: '',
            flag: ''
        }
    },
    methods: {
        backTohome() {
            this.$util.clear('token');
            this.$router.push('/');
        },
        showOptions() {
            this.show = true;
        },
        hideOptions() {
            this.timer = setTimeout(() => {
                this.show = false;
            }, 500)
        },
        showOptionss() {
            window.clearTimeout(this.timer)
        },
        hideOptionss() {
            this.show = false;
        }
    },
    created() {
        let {account, login} = this.$util.fetch('token');
        this.account = account;
        this.isLogin = login;
    },
    beforeRouteEnter (to, from, next) {
        next((vm) => {
            console.log(to.path.slice(1))
            vm.flag = flags[to.path.slice(1)]
        })
    },
    watch:{
        $route() {
            this.flag = flags[this.$route.path.slice(1)]
        }
    }

}
</script>

<style scoped>

</style>
