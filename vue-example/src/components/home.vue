<template>
  <div id="home">
    <h3>我是home组件</h3>
  </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {

        }
    },
    methods: {

    },
    created() {
      document.title = this.$route.meta.title;
    },
}
</script>

<style scoped>

</style>
