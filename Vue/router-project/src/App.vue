<template>
  <div id="app">
    <h1>hello app</h1>
    <p>
      <router-link to="/foo" >go to foo</router-link>
      <router-link to="/bar/456">go to bar</router-link>
      <router-link to="/bar/123">go to bar 二级导航</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
