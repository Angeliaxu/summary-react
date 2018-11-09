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
        // margin-top: 25px;
        overflow: hidden;
        background: #409EFF;
        .left {
            width: 105px;
            float: left;
        }
        .right {
            width: 1033px;
            height: 100%;
            float: left;
            border: 1px solid #eee;
            background: #fff;
            min-height: 475px;
        }
    }
 </style>
 