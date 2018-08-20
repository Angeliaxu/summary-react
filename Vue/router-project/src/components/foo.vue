<template>
    <div class="foo">
        <h3>i m foo</h3>
    </div>
</template>

<script>
    export default{
        name:'foo',
        data(){
            return{}
        },
        created() {
            console.log(window.history.length)
        },
    }
</script>

<style>
    .foo{
        height:200px;
        width: 200px;
        background: yellowgreen;
    }
</style>
