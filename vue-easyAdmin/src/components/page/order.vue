<template>
    <div id="main">
        <div class="left">
            <leftNav></leftNav>
        </div>
        <div class="right">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import leftNav from '../common/nav.vue';

export default {
    components: {
        leftNav,
    },
    data() {
        return {}
    },
    created() {},
    methods: {}
}
</script>

 <style scoped lang="scss">
    #main {
        max-width: 1140px;
        margin: 0 auto;
        padding-top: 25px;
        .left {
            width: 11%;
            float: left;
        }
        .right {
            width: 80%;
            height: 100%;
            float: left;
        }
    }
 </style>
 