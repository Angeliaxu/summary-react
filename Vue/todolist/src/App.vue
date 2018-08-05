<template>
  <div id="app">
    <h3>TODOLIST</h3>
    <div>
      <span class="check-all" @click="checkAll">
        <img src="./assets/font-8193.png"/>
      </span>
      <input 
        class="input" 
        type="text" 
        v-model="detail" 
        :placeholder="placeholder" 
        @keyup.enter="addItem"
      />
    </div>
    <ul>
      <TodoItem 
        v-for="(todo,index) in list" 
        :key="index" 
        :todo="todo"
        @change-status="changeBool"
        @changevalue="changemsg" 
      />
    </ul>
    
  </div>
</template>

<script>
import TodoItem from './components/todoItem.vue'

export default {
  name: 'todo',
  components: {
    TodoItem
  },
  data(){
    return{
      list:[],
      placeholder:'请输入待办事项',
      detail:''
    }
  },
  methods:{
    addItem(){
      this.list.push({
        msg:this.detail,
        id:Math.random(),
        bool:false
      })
      this.detail='';
    },
    changeBool(id){
      this.list.forEach(function(element) {
          if(element.id === id ){
            element.bool = !element.bool;
          }
      });
    },
    checkAll(){
      if(!this.list) return;
      this.list.forEach(element=>
          element.bool = ! element.bool
      ,this)
    },
    changemsg($event,id){
      this.list.forEach(element=>{
        if(element.id === id){
          element.msg = $event.target.value
        }
      },this)
    }
  }
}
</script>

<style scope>
#app {
  width:400px;
  margin:100px auto 0;
  padding:25px;
  text-align:center;
}
.input{
  margin:25px auto;
  width:60%;
  height:25px;
  font-size:14px;
  padding-left:10px;
  vertical-align:middle;
}
.check-all{
  display:inline-block;
  width:30px;
  height:30px;
  vertical-align:middle;
  background:#efefef;
  
}
img{
    width:30px;
    height:30px;
  }
</style>
