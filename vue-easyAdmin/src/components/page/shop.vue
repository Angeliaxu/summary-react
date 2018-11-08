<template>
    <div id="shop">
        <div class="">
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
        </div>
        <div class="">
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
     .el-tabs {
         display: inline-block;
     }
 }
 </style>
 