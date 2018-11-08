<template>
  <div id="home">
    <h3>我是home组件</h3>
    <button @click="add()">button</button>
    <p>{{num}}</p>
    <p>{{test.ll}}</p>
  </div>
</template>

<script>
/* 
  钩子函数：混入同名的钩子函数，构造器的钩子函数比混入的后执行
  数据data：同名不是key-value形式的报错。key-value形式对象同名采用浅合并，发生冲突时，以构造器的数据为优先

*/
const mixins = {
  // add(){
  //   console.log('数据:'+ this.num + '更新了')
  // }
  updated(){
    // this.num ++
    console.log('数据:'+ this.num + '更新了')
  },
  decrease() {
    console.log(2222, this.num)
  },
  data(){
    return {
      test: {
        ll: 555
      }
    }
  }
}
export default {
    name: 'home',
    data() {
        return {
          num: 1,
          test: {
            ll: 44
          }
        }
    },
    methods: {
      add(){
        this.num++;
        console.log(this.num)
      }
    },
    created() {
      // document.title = this.$route.meta.title;
    },
    updated(){
      console.log('构造器里的数据:'+ this.num + '更新了')
    },
    mixins:[mixins]
}
</script>

<style scoped>

</style>
