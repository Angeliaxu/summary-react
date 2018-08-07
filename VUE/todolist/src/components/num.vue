<template>
    <p>{{count}}</p>
</template>
<script>
    export default{
        name:'Num',
        computed:{
            count(){
                return this.store.state.count
            }
        }
    }
</script>