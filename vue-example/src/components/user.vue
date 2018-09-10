<template>
    <div>
        <router-link 
            v-for="(item, index) in userList" 
            :key="index"
            :to="{path:'/user/'+item.id, query:{info:'follow'}}"
        >{{ item.name }}</router-link>
        <div v-if="isShow">
            <p>姓名：{{ userInfo.name }}</p>
            <p>性别：{{ userInfo.sex }}</p>
            <p>年龄：{{ userInfo.age }}</p>
            <hr/>
            <!-- <router-link exact to="?infor=follow">他的关注</router-link>
            <router-link exact to="?infor=share" >它的分享</router-link> -->
            <router-link exact :to="{path:'',query:{info:'follow'}}">他的关注</router-link>
            <router-link exact :to="{path:'',query:{info:'share'}}">它的分享</router-link>
        </div>
    </div>
</template>

<script>
    import data from '../assets/data';

    export default {
        data () {
            return {
                userList: data,
                userInfo: {},
                bool:false
            }
        },
        computed:{
            isShow(){
                if(JSON.stringify(this.userInfo) === '{}'){
                    return false  
                }else{
                    return true
                }
            }
        },
        watch:{
            $route(news) {
                let id = this.$route.params.id;
                if(id) {
                    this.userInfo = this.userList.filter((item) => {
                        return item.id === id;
                    })[0];  
                } else {
                    this.userInfo = {};
                }    
            }
        },
        created() {
            document.title = this.$route.meta.title;
            let id = this.$route.params.id;
            if(id) {
                this.userInfo = this.userList.filter((item) => {
                    return item.id === id;
                })[0];  
            } else {
                this.userInfo = {};
            }
        },
    }
</script>

<style>

 
</style>
