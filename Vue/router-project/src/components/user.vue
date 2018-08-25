<template>
    <div id="app">
        <h1>{{$route.params.id}}</h1>
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

</style>

