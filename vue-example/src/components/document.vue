<template>
  <div id="document">
    <h3>我是一个document组件</h3>
    <p id="current">使用hash导航到当前位置</p>
  </div>
</template>

<script>
export default {
    name: 'document',
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
    #document {
      display: inline-block;
    }
</style>
