<template>
    <div id="admin">
        <div class="navigator">
            <router-link to="/" class="img">
                <img class="logo" src="../assets/logo.png" alt="logo" @click="backTohome">
            </router-link>
            <div class="user">
                <img src="../assets/use.jpeg" alt="" @mouseover="showOptions" @mouseleave="hideOptions">
                <ul :class="show?'show':'hide'">
                    <li 
                        @mouseover="showOptionss" 
                        @mouseleave="hideOptionss" 
                        @click="backTohome">
                        退出
                    </li>
                </ul>
            </div>
        </div>
        <div class="content">
            <ul class="nav">
                <router-link :to="{name:'project'}" tag="li">我的项目</router-link>
                <router-link :to="{name:'workbench'}"  tag="li">我的工作台</router-link>
                <router-link :to="{name:'document'}" tag="li">我的文档</router-link>
            </ul>
        </div>
        <div class="main">
            <transition name="enter" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            timer: ''
        }
    },
    methods: {
        backTohome() {
            window.localStorage.removeItem('token')
            this.$router.push('/');
        },
        showOptions() {
            this.show = true;
        },
        hideOptions() {
            this.timer = setTimeout(() => {
                this.show = false;
            }, 200)
        },
        showOptionss() {
            window.clearTimeout(this.timer)
        },
        hideOptionss() {
            this.show = false;
        }
    }
}
</script>

<style scoped>

</style>
