<template>
    <div>
        <h4>子组件</h4>
        <input type="text" placeholder="请输入你的姓名" ref="username">
        <button @click="getRootData">获取根组件的数据</button>
        <button @click="getParentData">获取父组件的数据</button>
    </div>
</template>

<script>
    export default{
        name:'childComponent',
        created() {
        },
        methods:{
            getRootData() {
                // 获取实例根组件的信息
                console.log(this.$root.foo); // 1
            },
            getParentData() {
                // 获取父组件的信息
                console.log(this.$parent.initdata); // 1
            },
            focus() {
                this.$refs.username.focus();
            }
        },
        mounted() {
            // this.focus();
        },
    }
</script>

<style>
    #app{
        text-align: center;
    }
</style>
