<template>
    <li>
        <span 
            :class="['same-style', todo.bool?'compelete':'uncompelete']"
            @click="$emit('change-status',todo.id)"
            
        ></span>
        <span class="info">
            <span  
                :class="todo.bool?'delete':'undelete'"
                @dblclick="inputShow"
            >{{todo.msg}}</span>
            <input 
                v-if="visible"
                type="text" 
                :class="visible?'show':'hide'"
                :placeholder="todo.msg"
                @keyup="closeInput"
                ref="inputFocus"           
            />
        </span>
    </li>
</template>
<script>
    export default{
        name:'todoItem',
        props:{
            todo:Object
        },
        data(){
            return{
                 visible:false
            }
    
        },
        methods:{
            inputShow($event){
                this.visible=true;
                this.$nextTick(function(){
                     this.$refs.inputFocus.focus();
                })
            },
            closeInput($event){
                if($event.which === 13){
                    this.visible=false;
                    this.$emit('changevalue',$event,this.todo.id)
                }
                if($event.which === 27){
                    this.visible=false;
                } 
            }
        },
        
    }
</script>
<style>
    li{
        list-style:none;
        border-bottom:1px solid #eee;
        color:#000;
        line-height:35px;
        text-align:left;
        margin-left:20px;
        width:290px;
    }
    .same-style{
        width:20px;
        display:inline-block;
        height:20px;
        border-radius:50%;
        border:1px solid #eee;
        vertical-align:middle;
        margin-right:15px;
    }
    .info{
        display: inline-block;
        position: relative;
        /* width: 100%; */
        width:252px;
        height:36px;
        vertical-align: bottom;
    }
    .info span,.info input{
        position: absolute;
        left: 0;
        top:0;
    }
    .info input{
        height:24px;
        width:230px;
        padding-left:10px;
    }
    .compelete{
        background:yellowgreen;
    }
    .uncompelete{
        background:none;
    }
    .delete{
        text-decoration:line-through;
        font-style:italic;
    }
    .undelete{
        text-decoration: none;
    }
    .show{
        display: inline-block;
    }
    .hide{
        display: none;
    }
</style>