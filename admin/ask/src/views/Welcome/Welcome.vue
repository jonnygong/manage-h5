<template>
    <div class="content">
        <h3>使用说明：</h3>
        <p>本后台仅适用于杭州快房传媒有限公司案例活动展示系统的管理与维护。</p>
        <p>请先在下方选择项目进入。</p>


        <!--列表-->
        <el-table :data="projectList" highlight-current-row v-loading="listLoading"
                  style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="项目ID" width="150">
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


        <h3>其他注意事项：</h3>
        <p>如遇到任何问题，请反馈至：52admin（ismrwang+kfw@gmail.com）</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                projectList: [
                    {
                        id: 'case',
                        name: '快房案例',
                        desc: '快房案例'
                    },
                    {
                        id: 'qa',
                        name: '快房问答',
                        desc: '快房问答'
                    },
                    {
                        id: 'build',
                        name: '楼市爆料',
                        desc: '楼市爆料'
                    }
                    ],
                listLoading: false
            }
        },
        methods: {
            handleSelect(index, row) {
                let param = {
                    name: row.name,
                    id: row.id
                };
                this.$store.dispatch('set_project', param);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
