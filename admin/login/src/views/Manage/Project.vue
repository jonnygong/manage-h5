<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <!--<el-form-item>-->
                <!--<el-select v-model="filters.pid" placeholder="选择广告位置">-->
                <!--<el-option :label="position.title"-->
                <!--:value="position.id"-->
                <!--:key="position.id"-->
                <!--v-for="(position, index) in filters.options"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="getListData">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="list" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="模型名称" width="100"></el-table-column>
            <el-table-column prop="adminurl" label="路由地址" min-width="100"></el-table-column>
            <el-table-column prop="info" label="模型描述" min-width="100"></el-table-column>
            <el-table-column prop="mb_url" label="展示端url" min-width="100"></el-table-column>
            <el-table-column prop="update_time" label="更新时间" width="200" :formatter="formateDate"></el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="200"
                             :formatter="formateDate"></el-table-column>
            <el-table-column prop="status" label="状态" width="100">
                <template scope="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : scope.row.status === -1 ? 'gray' : 'danger'">
                        {{ scope.row.status === 1 ? '可用' : scope.row.status === -1 ? '已删除' : '不可用' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="230" fixed="right">
                <template scope="scope">
                    <el-button size="small" @click="statusSubmit(scope.$index, scope.row)"
                               :disabled="scope.row.status === -1">
                        {{ scope.row.status === 1 ? '停用' : scope.row.status === 0 ? '启用' : '已删除' }}
                    </el-button>
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchAction('remove')" :disabled="this.sels.length===0">批量删除
            </el-button>
            <el-button type="warning" @click="batchAction('disable')" :disabled="this.sels.length===0">批量禁用
            </el-button>
            <el-button type="primary" @click="batchAction('active')" :disabled="this.sels.length===0">批量启用
            </el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pagesize"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="模型名称" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="路由地址" prop="adminurl">
                    <el-input v-model="editForm.adminurl" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="展示端url" prop="mb_url">
                    <el-input v-model="editForm.mb_url" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="模型描述" prop="info">
                    <el-input type="textarea" v-model="editForm.info" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="模型名称" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="路由地址" prop="adminurl">
                    <el-input v-model="addForm.adminurl" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="展示端url" prop="mb_url">
                    <el-input v-model="addForm.mb_url" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="模型描述" prop="info">
                    <el-input type="textarea" v-model="addForm.info" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import util from '@/common/js/util'
    import api from '@/api'

    export default {
        data() {
            return {
                filters: {
                    options: [],
                    pid: ''
                },
                list: [], // 列表
                total: 0,
                page: 1,
                pagesize: 0,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [{required: true, message: '请输入内容', trigger: 'blur'}],
                    adminurl: [{required: true, message: '请输入内容', trigger: 'blur'}],
                    info: [{required: true, message: '请输入内容', trigger: 'blur'}],
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    adminurl: '',
                    info: '',
                    mb_url: '',

                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [{required: true, message: '请输入内容', trigger: 'blur'}],
                    adminurl: [{required: true, message: '请输入内容', trigger: 'blur'}],
                    info: [{required: true, message: '请输入内容', trigger: 'blur'}],
                },
                //新增界面数据
                addForm: {
                    name: '',
                    adminurl: '',
                    info: '',
                    mb_url: '',
                }

            }
        },
        methods: {
            // 格式化投放时间
            formateDate(row, column) {
                return ` ${util.formatDate.format(new Date(row[column.property] * 1000), 'yyyy-MM-dd hh:mm:ss')}`
            },
            // 分页
            handleCurrentChange(val) {
                this.page = val;
                this.getListData();
            },
            //获取用户列表
            getListData() {
                this.listLoading = true;
                let para = {
                    page: this.page
                };
                api.geModuleList(para).then((res) => {
                    this.listLoading = false;
                    if (res.data.status === 200) {
                        this.total = res.data.param.pages.total;
                        this.pagesize = res.data.param.pages.pagesize;
                        this.list = res.data.param.list;
                    }
                });
            },
            //删除
            handleDel(index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let para = {id: row.id};

                    api.getModuleDelete(para).then((res) => {
                        if (res.data.status === 200) {
                            this.listLoading = false;
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getListData();
                        }
                    })

                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit(index, row) {
                this.editFormVisible = true;
                let param = {
                    id: row.id
                };
                api.getModuleInfo(param)
                    .then((res) => {
                        if (res.data.status === 200) {
                            this.editForm = Object.assign({}, res.data.param);
                        }
                    });
            },
            //显示新增界面
            handleAdd() {
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    adminurl: '',
                    info: '',
                    mb_url: '',
                };
            },
            //编辑
            editSubmit() {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let para = Object.assign({}, this.editForm);
                            api.getModuleUpdate(para)
                                .then((res) => {
                                    if (res.data.status === 200) {
                                        this.editLoading = false;
                                        //NProgress.done();
                                        this.$message({
                                            message: '修改成功',
                                            type: 'success'
                                        });
                                        this.$refs['editForm'].resetFields();
                                        this.editFormVisible = false;
                                        this.getListData();
                                    }
                                });
                        });
                    }
                });
            },
            //新增
            addSubmit() {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            let para = Object.assign({}, this.addForm);
                            api.geModuleAdd(para)
                                .then((res) => {

                                    this.addLoading = false;
                                    if (res.data.status === 200) {
                                        this.$message({
                                            message: res.data.info,
                                            type: 'success'
                                        });

                                        this.$refs['addForm'].resetFields();
                                        this.addFormVisible = false;
                                        this.getListData();

                                    }
                                });
                        });
                    }
                });
            },
            selsChange(sels) {
                this.sels = sels;
            },
            //批量删除
            batchAction(action) {
                // 三种操作：remove disable active
                let ids = this.sels.map(item => item.id).toString();
                const actions = {
                    'remove': {
                        tip: '删除',
                        api: `getAdmintDelete`
                    },
                    'disable': {
                        tip: '停用',
                        api: `getModuleStatus`,
                        status: 0
                    },
                    'active': {
                        tip: '启用',
                        api: `getModuleStatus`,
                        status: 1
                    }
                };
                this.$confirm(`确认${actions[action].tip}选中记录吗？`, '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    // 非批量删除，带上 status
                    let params = (action !== 'remove' ? Object.assign({
                        id: ids + '',
                        status: actions[action].status
                    }, params) : {id: ids + ''});
                    api[actions[action].api](params).then((res) => {
                        this.listLoading = false;

                        if (res.data.status === 200) {
                            this.$message({
                                message: res.data.info,
                                type: 'success'
                            });

                            this.getListData();

                        }
                    });
                });
            },
            // 修改状态
            async statusSubmit(index, row) {
                let para = {
                    id: row.id,
                    status: 1 - row.status
                };

                api.getModuleStatus(para).then((res) => {
                    if (res.data.status === 200) {
                        this.listLoading = false;
                        this.$message({
                            message: '状态修改成功',
                            type: 'success'
                        });
                        row.status = 1 - row.status;
                    }
                })


            },
        },
        mounted() {
            this.getListData();
        }
    }

</script>

<style lang="scss" scoped>
</style>