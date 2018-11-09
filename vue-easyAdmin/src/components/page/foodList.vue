<template>
     <div class="food">
        <dl v-for="item in food" :key="item.goodsId" @click="pickFood(item)">
            <dt>
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541679860589&di=d9fbb971ec45f7ca83b96c5a0dc30594&imgtype=0&src=http%3A%2F%2Fimg.91jm.com%2F2016%2F08%2F591270N9oS8h.png" alt="">
            </dt>
            <dd>
                <span>{{item.goodsName}}</span>
                <span>{{item.price}} 元</span>
            </dd>
        </dl>    
    </div>
</template>
<script>
export default {
    name: 'foodList',
    data() {
        return {

        }
    },
    props: {
        food: Array
    },
    methods: {
        pickFood(item) {
            this.$emit('click', item)
        }
    }
}
</script>

<style scoped lang="scss">
.food {
    dl {
        width: 170px;
        height: 60px;
        background: #f3f3f3;
        display: inline-block;
        margin-right: 20px;
        margin-bottom: 15px;
        border: 1px solid #f3f3f3;
        dt,dd {
            display: inline-block;
            vertical-align: top;
        }
        dt {
            width: 80px;
            height: 60px;
            img {
                width: 80px;
                height: 60px;
            }
        }
        dd {
            width: 80px;
            span {
                width: 80px;
                display: block;
                font-size: 12px;
                line-height: 18px;
                margin-top: 8px;
                text-align: center;
            }
        }
    }
}
 </style>
 

