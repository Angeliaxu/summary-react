<template>
    <div id="app">
        <p>命名视图</p>
        <router-view class="view one"></router-view>
        <router-view class="view two" name="a"></router-view>
        <router-view class="view three" name="b"></router-view>
    </div>
</template>

<script>
    
</script>

<style>
    p {
        text-align:center;
    }
</style>