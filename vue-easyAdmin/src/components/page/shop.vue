<template>
    <div id="shop">
        <div class="make-order">
            <el-tabs v-model="activeName">
                <el-tab-pane label="点餐" name="order">
                    <el-table
                        :data="orderList"
                        border
                        style="width: 100%">
                        <el-table-column prop="name" label="商品" width="120"></el-table-column>
                        <el-table-column prop="quantity" label="量" width="40"></el-table-column>
                        <el-table-column prop="price" label="金额" width="60"></el-table-column>
                        <el-table-column fixed="right" label="操作" width="100">
                            <template slot-scope="scope">
                                <!-- {{scope}} -->
                                <el-button @click="deleteFood(scope.row)" type="text" size="small">删除</el-button>
                                <el-button @click="addQuantity(scope.row)" type="text" size="small">增加</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="挂单" name="hangup">2</el-tab-pane>
                <el-tab-pane label="外卖" name="takeout">
                    <el-table
                        :data="takeoutList"
                        border
                        style="width: 100%">
                        <el-table-column prop="name" label="商品" width="120"></el-table-column>
                        <el-table-column prop="quantity" label="量" width="40"></el-table-column>
                        <el-table-column prop="price" label="金额" width="60"></el-table-column>
                        <el-table-column fixed="right" label="操作" width="100">
                            <template slot-scope="scope">
                                <!-- {{scope}} -->
                                <el-button @click="deleteFood(scope.row)" type="text" size="small">删除</el-button>
                                <el-button @click="addQuantity(scope.row)" type="text" size="small">增加</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
            <p class="buttons">
                <el-button type="warning" @click="hangAll">挂单</el-button>
                <el-button type="danger" @click="deleteAll">删除</el-button>
                <el-button type="success" @click="payAll">结账</el-button>
            </p>
        </div>
        <div class="menue">
            <div class="top">
                <h3>常用商品</h3>
                <ul class="list">
                    <li v-for="food,index in commonFood" :key="index" @click="addFood(food)">{{food.goodsName}} {{food.price}}元</li>
                </ul>
            </div> 
            <div class="bottom">
                <el-tabs v-model="category">
                    <el-tab-pane  v-for="item,index in foodNav" :key="index" :label="item" :name="item">
                        <foodList :food="food[index]" @click="addFood"></foodList>    
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import foodList from './foodList'
import './list.js';
export default {
    components: {
        foodList
    },
    data() {
        return {
            activeName: 'order',
            category: '汉堡',
            orderList: [],
            takeoutList: [],
            food: [],
            commonFood: [],
            foodNav:['汉堡', '小食', '饮料', '套餐'],
            calculate: 0
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            const loading = this.$loading.service({
                target: document.getElementsByClassName('list')[0],
                // fullscreen: false
            })
            this.$fetch.get('https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/oftenGoods')
            .then(res => {
                if (res.status === 200) {
                    loading.close()
                    this.commonFood =  res.data;
                }
            })
            .catch(err => {
                loading.close()
                this.$message({
                    type: 'error',
                    message: '数据获取失败'
                })
            })

            this.$fetch.get('https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/typeGoods')
            .then(res => {
                if (res.status === 200) {
                    this.food =  res.data;
                }
            })
            .catch(err => {
                this.$message({
                    type: 'error',
                    message: '数据获取失败'
                })
            })
            this.$fetch.get('http://127.0.0.1:8081')
        },
        addFood(item) {
            let list = this.activeName === 'order' ? this.orderList : this.takeoutList;
            if (!Object.keys(list).length) {
                let data = {
                    name: item.goodsName,
                    quantity: 1,
                    price: item.price,
                    id: item.goodsId
                };
                list.push(data);
            } else {
                const isExist = list.some(ele => ele.id === item.goodsId)
                if (isExist) {
                    list.forEach(ele => {
                        if(ele.id === item.goodsId) ele.quantity++;
                    })
                } else {
                    let data = {
                        name: item.goodsName,
                        quantity: 1,
                        price: item.price,
                        id: item.goodsId
                    };
                    list.push(data);
                }
            }
        },
        addQuantity(item) {
            let list = this.activeName === 'order' ? this.orderList : this.takeoutList;
            list.forEach(ele => {
                if(ele.id == item.id) {
                    ele.quantity++;
                }
            })
        },
        deleteFood(item) {
            let list = this.activeName === 'order' ? this.orderList : this.takeoutList;
            list.forEach((ele, index, array) => {
                if(ele.id == item.id) {
                    array.splice(index, 1)
                }
            })
        },
        payAll() {
            let total = 0;
            let list = this.activeName === 'order' ? this.orderList : this.takeoutList;
            list.forEach((item) => {
                total += (item.price * item.quantity);
            })
            this.calculate = total;
            // 结账提交数据到后台，返回成功才把订单清空
            // console.log(this.calculate)
        },
        deleteAll() {
            this.activeName === 'order' ? this.orderList = [] : this.takeoutList = [];
        },
        hangAll() {
            console.log(11)
            console.log(this.activeName)
            if (this.activeName !== 'order') {
                this.$message({
                    type: 'error',
                    message: '不可挂单'
                })
                return;
            }
        }
    }
}
</script>

 <style scoped lang="scss">
 #shop {
     .el-tabs {
         display: inline-block;
     }
     .buttons {
         margin-top: 30px;
         text-align: center;
     }
     .make-order {
         width: 321px;
     }
     .make-order, .menue {
         display: inline-block;
         vertical-align: top;
     }
     .menue {
         border-left: 1px solid #eee;
         min-height: 80px;
         width: 705px;
        h3 {
            padding: 6px 15px;
        }
         .list {
            padding:  15px 30px;
            // margin-top: 10px;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
            li {
                margin-bottom: 15px;
                margin-left: 10px;
                background-color: rgba(64,158,255,.1);
                display: inline-block;
                padding: 0 10px;
                height: 32px;
                line-height: 30px;
                font-size: 12px;
                color: #409EFF;
                border-radius: 4px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                border: 1px solid rgba(64,158,255,.2);
                white-space: nowrap;
                cursor: pointer;
            }
         }
         .bottom {
             padding: 15px;
         }
     }
 }
 </style>
 