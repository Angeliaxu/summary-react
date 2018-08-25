<template>
    <div class="bar">
        <h3>i m bar</h3>
        <p>{{username}}</p>
        <p>{{$route.params.id}}</p>
        <button @click="goback">回退</button>
    </div>
</template>

<script>
    export default{
        name:'bar',
        data(){
            return{}
        },
        created() {
            // console.log(this.$router);
            // console.log(this.$route.params);
            // console.log(window.history)
        },
        computed:{
            username(){
                return this.$route.params.id
            }
        },
        methods:{
            goback(){
                window.history.length>1? this.$router.go(-5):this.$router.push('/')
            }
        },
        watch:{
            '$route'(to,from){
                // console.log(to);
                // console.log(from);
            }
        },
        beforeRouteUpdate (to, from, next) {
            // ...
            console.log(to,from);
            next();
            
        },
        mounted() {
            console.log('挂载乐');
        },
        beforeDestroy() {
            console.log('销毁了？')
        },
    }
</script>

<style>
    .bar{
        height:200px;
        width: 200px;
        background: pink;
    }
</style>
