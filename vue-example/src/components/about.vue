<template>
  <div id="about">
    <h3>我是about组件</h3>
    <hr/>
    <div>
        <!-- 
            /about /about/study /aboyt/hobby 默认是全包含匹配模式
            设置exact表示精确匹配模式
         -->
        <router-link :to="{name: 'about'}" exact>work</router-link>
        <router-link :to="{name: 'study'}">study</router-link>
        <router-link :to="{name: 'hobby'}">hobby</router-link>
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
