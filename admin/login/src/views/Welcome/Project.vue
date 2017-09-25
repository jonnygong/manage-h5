<template>
    <div class="content">
        <h3>第二步：选择项目</h3>
        <p>请先在下方选择<strong style="color: red"> 项目 </strong>进入。</p>


        <!--列表-->
        <el-table :data="projectList" highlight-current-row v-loading="listLoading"
                  style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="name" label="项目名称" width="150">
            </el-table-column>
            <el-table-column prop="desc" label="描述" min-width="120">
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
                <template scope="scope">
                    <el-button type="primary" size="small" @click="handleSelect(scope.$index, scope.row)">进入此项目</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                projectList: [
                    {
                        id: 1,
                        url: '/case',
                        name: '快房案例',
                        desc: '快房案例'
                    },
                    {
                        id: 2,
                        url: '/qa',
                        name: '快房问答',
                        desc: '快房问答'
                    },
                    {
                        id: 3,
                        url: '/building',
                        name: '楼市爆料',
                        desc: '楼市爆料'
                    }
                    ],
                listLoading: false
            }
        },
        methods: {
            handleSelect(index, row) {
                this.$store.dispatch('set_project', row);
                window.location.href = row.url;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
