<template>
  <div id="app">
    <navigator></navigator>
    <router-view></router-view>
  </div>
</template>

<script>
import navigator from '@/components/navigator';

export default {
  name: 'App',
  components:{
    navigator
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
.is-active {
  color: red;
}
a {
  text-decoration: none;
  color:#000;
  display:inline-block;
  margin: 0 15px;
}
</style>
