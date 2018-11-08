<template>
    <ul id="left-nav">
        <li v-for="item,index in nav" :key="index" :class="{active: item.isActive}" @click="tab(index)">
            <i :class="['iconfont', item.icon]"></i>
            <span>{{item.title}}</span>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'leftNav',
    data() {
        return {
            nav: [
                {
                    title: '收银',
                    icon: 'icon-trade-assurance',
                    isActive: true,
                    path: '/cashier'
                },
                {
                    title: '店铺',
                    icon: 'icon-cart',
                    isActive: false,
                    path: '/shop'
                },
                {
                    title: '商品',
                    icon: 'icon-viewlist',
                    isActive: false,
                    path: '/goods'
                },
                {
                    title: '会员',
                    icon: 'icon-account',
                    isActive: false,
                    path: '/member'
                },
                {
                    title: '统计',
                    icon: 'icon-box',
                    isActive: false,
                    path: '/statistics'
                }
            ]
        }
    },
    methods: {
        tab(index) {
            this.nav.forEach((ele, key) => {
                ele.isActive = false;
                if (key === index) {
                    ele.isActive = true;
                    this.$router.push(ele.path);
                }
            })
        }
    }
}
</script>

 <style lang="scss" scoped>
    #left-nav {
        width: 120px;
        height: 100%;
        text-align: center;
        background: #409EFF;
        span, i {
            display: block;
        }
        span {
            margin-top: 15px;
        }
        .iconfont {
            font-size: 22px;
        }
        li {
            height: 65px;
            padding: 15px;
            color: #fff;
            &:hover {
                background: rgb(42, 131, 221);
            }
        }
        .active {
            background:rgb(42, 131, 221);
        }
    }
 </style>
 