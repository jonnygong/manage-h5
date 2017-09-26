<template>
    <div class="content">
        <h3>第一步：选择公众号</h3>
        <p>请先在下方选择<strong style="color: red"> 公众号 </strong>进入。</p>


        <!--列表-->
        <el-table :data="list" highlight-current-row v-loading="listLoading"
                  style="width: 100%;">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="id" width="60"></el-table-column>
            <el-table-column prop="name" label="公众号名称"></el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
                <template scope="scope">
                    <el-button type="success" size="small" @click="handleSelect(scope.$index, scope.row)">选择此公众号</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import api from '@/api'
    export default {
        data() {
            return {
                list: [],
                listLoading: false
            }
        },
        methods: {
            handleSelect(index, row) {
                this.$store.dispatch('set_wechat', row);
                this.$router.push('/project');
            },
            getListData() {
                this.listLoading = true;
                api.getWechatList().then(res => {
                    this.listLoading = false;
                    if (res.data.status === 200) {
                        this.list = res.data.param;
                        console.log(res.data.param);
                    }
                })
            }
        },
        mounted() {
            this.getListData();
        }
    }
</script>

<style lang="scss" scoped>

</style>
