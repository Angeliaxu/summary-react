<template>
    <div>
        <ul>
            <router-link to="/home">Home</router-link>
            <router-link to="/document" active-class="anotherColor">Document</router-link>
            <router-link to="/About">About</router-link>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'navigator'
    }
</script>

<style scoped>
    ul,li {
        list-style: none;
    }
    .anotherColor {
        color: yellowgreen;
    }
</style>
