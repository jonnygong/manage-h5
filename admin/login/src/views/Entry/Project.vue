<template>
    <div class="content">
        <h3>第二步：选择项目</h3>
        <p>请先在下方选择<strong style="color: red"> 项目 </strong>进入。</p>


        <!--列表-->
        <el-table :data="projectList" highlight-current-row v-loading="listLoading"
                  style="width: 100%;">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="name" label="项目名称" width="150"></el-table-column>
            <el-table-column prop="adminurl" label="URL"></el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
                <template scope="scope">
                    <el-button type="primary" size="small" @click="handleSelect(scope.$index, scope.row)">进入此项目</el-button>
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
                projectList: [],
                listLoading: false
            }
        },
        methods: {
            handleSelect(index, row) {
                this.$store.dispatch('set_project', row);
                window.location.href = row.adminurl;
            },
            getListData() {
                this.listLoading = true;
                let params = {
                    id: window.sessionStorage.getItem('WECHAT_ID')
                };
                api.getProjectList(params).then(res => {
                    this.listLoading = false;
                    if (res.data.status === 200) {
                        this.projectList = res.data.param;
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
