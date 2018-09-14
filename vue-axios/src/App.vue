<template>
  <div id="app">
    <h1>study axios</h1>
    <hr/>
    <div>
      <h1>study encrept</h1> 
      <input type="text" v-model="value" placeholder="please text something" style="width:150px;height:25px;padding-left:10px;font-size:14px;"/> 
      <button type="button" @click="encreptVal">encrept</button>
      <p>加密：{{ before }}</p>
      <button type="button" @click="decreptVal">decrept</button>
      <p>解密：{{ after }}</p>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import './libs/axios.js'
import {encrept, decrept} from './libs/encrept.js'

export default {
  name: 'App',
  data() {
    return {
      before: '',
      after: '',
      value: ''
    }
  },
  methods:{
    encreptVal() {
      this.before = encrept(this.value)
    },
    decreptVal(){
      this.after = decrept(this.before)
    }
  }
}
</script>

<style>
  #app{
    text-align: center;
    padding: 50px 0;
  }
</style>
