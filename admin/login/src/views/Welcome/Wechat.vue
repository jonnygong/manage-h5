<template>
    <div class="content">
        <h3>第一步：选择公众号</h3>
        <p>请先在下方选择<strong style="color: red"> 公众号 </strong>进入。</p>


        <!--列表-->
        <el-table :data="list" highlight-current-row v-loading="listLoading"
                  style="width: 100%;">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" width="60"></el-table-column>
            <el-table-column prop="name" label="公众号名称" width="150">
            </el-table-column>
            <el-table-column prop="desc" label="描述" min-width="120">
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
                <template scope="scope">
                    <el-button type="success" size="small" @click="handleSelect(scope.$index, scope.row)">选择此公众号</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [
                    {
                        id: 1,
                        name: '快房案例公众号',
                        desc: '快房案例'
                    },
                    {
                        id: 2,
                        name: '快房问答公众号',
                        desc: '快房问答'
                    },
                    {
                        id: 3,
                        name: '楼市爆料公众号',
                        desc: '楼市爆料'
                    }
                    ],
                listLoading: false
            }
        },
        methods: {
            handleSelect(index, row) {
                this.$store.dispatch('set_wechat', row);
                this.$router.push('/project');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
