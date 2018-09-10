<template>
  <div id="app">
    <navigator></navigator>
    <!--命名视图-->
    <!--<router-view name="slider"></router-view>-->
    <!--动画transition-->
    <!--
      mode
        in-out:新进来的元素先过渡，当前元素再过渡
        out-in:当前元素先过渡，新元素再进行过渡
    -->
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>  
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
/* 
  v-enter:过渡的开始状态
  v-enter-to:过渡的离开状态
  v-enter-active:开始到离开的持续
 */
.fade-enter {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter-active {
  transition: 2s;
}
.fade-leave {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: opacity 1s;
}
</style>
