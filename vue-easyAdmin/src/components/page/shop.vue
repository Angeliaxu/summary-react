<template>
    <div id="shop">
        <div class="make-order">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="点餐" name="first">
                    <el-table
                        :data="goodsList"
                        border
                        style="width: 100%">
                        <el-table-column prop="name" label="商品" width="120"></el-table-column>
                        <el-table-column prop="quantity" label="量" width="40"></el-table-column>
                        <el-table-column prop="price" label="金额" width="60"></el-table-column>
                        <el-table-column fixed="right" label="操作" width="100">
                            <template slot-scope="scope">
                                <!-- {{scope}} -->
                                <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                                <el-button @click="handleClick(scope.row)" type="text" size="small">增加</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="挂单" name="second">2</el-tab-pane>
                <el-tab-pane label="外卖" name="third">3</el-tab-pane>
            </el-tabs>
            <p class="buttons">
                <el-button type="warning">挂单</el-button>
                <el-button type="danger">删除</el-button>
                <el-button type="success">结账</el-button>
            </p>
        </div>
        <div class="menue">
            <div class="top">
                <h3>发布商品</h3>
                <ul></ul>
            </div> 
            <div class="bottom"></div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            activeName: 'first',
            goodsList: [
                {
                    name: '香辣鸡腿堡',
                    quantity: 1,
                    price: 10
                },
                {
                    name: '炸薯条',
                    quantity: 1,
                    price: 6
                }
            ]
        }
    },
    created() {},
    methods: {
        handleClick(ev) {
            console.log(ev);
            
        }
    }
}
</script>

 <style scoped lang="scss">
 #shop {
     width: 321px;
     .el-tabs {
         display: inline-block;
     }
     .buttons {
         margin-top: 30px;
         text-align: center;
     }
     .make-order, .menue {
         display: inline-block;
     }
 }
 </style>
 