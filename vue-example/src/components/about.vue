<template>
  <div id="about">
    <h3>我是about组件</h3>
    <div>
        <router-link to="/about/work">work</router-link>
        <router-link to="/about/study">study</router-link>
        <router-link to="/about/hobby">hobby</router-link>
    </div>
    <div>
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
    name: 'about',
    data() {
        return {

        }
    },
    methods: {

    },
    components: {

    }
}
</script>

<style scoped>
    #about div{
        display: inline-block;
        vertical-align: middle;
    }
    a{
        display:block;
    }
</style>
