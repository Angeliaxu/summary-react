<template>
    <div class="foo">
        <h3>i m bar</h3>
    </div>
</template>

<script>
    export default{
        name:'bar',
        data(){
            return{}
        },
        created() {
            // console.log(window.history.length)
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
