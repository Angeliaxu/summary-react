<template>
  <div id="app">
    <!-- <h1>study axios</h1> -->
    <!-- <hr/>
    <div>
      <h1>study encrept</h1> 
      <input type="text" v-model="value" placeholder="please text something" style="width:150px;height:25px;padding-left:10px;font-size:14px;"/> 
      <button type="button" @click="encreptVal">encrept</button>
      <p>加密：{{ before }}</p>
      <button type="button" @click="decreptVal">decrept</button>
      <p>解密：{{ after }}</p>
    </div> -->
    <!-- <hr/> -->
    <div>
      <h3>取消Promise请求</h3>
      <p>
        <button @click="requestAxios">axios request</button>
        <button @click="cancelAxios">cancel axios request</button>
      </p>
      <p>
        <button @click="cancelPromise">cancel promise request</button>
      </p>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
// import './libs/axios.js'
import {service, source} from './libs/cancelToken/axios'
import {encrept, decrept} from './libs/encrept.js'
// import  './libs/promise-track';

export default {
  name: 'App',
  data() {
    return {
      before: '',
      after: '',
      value: '',
      http: null
    }
  },
  methods:{
    encreptVal() {
      this.before = encrept(this.value)
    },
    decreptVal(){
      this.after = decrept(this.before)
    },
    requestAxios() {
      /* service.get('/api')
      .then(resolved => {
        console.log(resolved)      
      })  
      .catch(error => {
        console.log(error)
      })  */
      let promise = new Promise((resolved, reject) => {
        this.http = new XMLHttpRequest();
        this.http.open('get', '/api');
        this.http.send();
        this.http.onreadystatechange = () => {
          if (this.http.readyState === 4 ) {
            if (this.http.status === 200) {
              resolved(this.http.responseText)
            }else {
              reject('error');
            }
          } 
        }
      })  
      promise
      .then(resolved => {
        console.log(resolved)
      })
      .catch()
    },
    cancelAxios() {
      // source.cancel('用户取消')
      this.http.abort();
    },
    cancelPromise() {

    },
    divide(numerator, denominator) {
      return new Promise((resolve, reject) => {
        if (typeof numerator !== 'number' || typeof denominator !== 'number' ) {
          reject(new TypeError('Must be number!'));
        }
        console.log('After validating type...');
        if (denominator === 0) {
          reject(new Error("Cannot divide by 0!"));
        }
        console.log('After validating non-zero denominator...');
        resolve(numerator / denominator);
      });
    }
  },
  created() {
    // this.divide(3, 0);
  },
}
</script>

<style>
  #app{
    text-align: center;
    padding: 50px 0;
  }
</style>
