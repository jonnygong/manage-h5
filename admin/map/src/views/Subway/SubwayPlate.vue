<template>
    <section>

        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="primary" @click="getListData">刷新</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">添加站点</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click.native="handleRedirect('/subway')">返回上层</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="list" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="name" label="名称" width="100" sortable>
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" min-width="120" :formatter="formateDate">
            </el-table-column>
            <el-table-column prop="update_time" label="更新时间" min-width="120" :formatter="formateDate">
            </el-table-column>
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
            <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
                <el-form-item label="线路名称" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="handleEditCancel">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
                <el-form-item label="线路名称" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="handleAddCancel">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import util from '@/utils/js'
    import Uploader from '@/components/Uploader';

    export default {
        data() {
            return {
                list: [],

                total: 0,
                page: 1,
                pagesize: 10,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        {required: true, message: '请输入站点名称', trigger: 'blur'}
                    ],
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        {required: true, message: '请输入站点名称', trigger: 'blur'}
                    ],
                },
                //新增界面数据
                addForm: {
                    name: '',
                }
            }
        },
        methods: {
            handleRedirect(path) {
                this.$router.push(path);
            },
            // 格式化更新时间
            formateDate(row, column) {
                return ` ${util.formatDate.format(new Date(row.update_time * 1000), 'yyyy-MM-dd hh:mm:ss')}`
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getListData();
            },
            //获列表
            async getListData() {
                this.listLoading = true;
                let params = {
                    id: this.$route.params.id,
                    page: this.page,
                };

                const res = await this.$http.post(`mapadminSubwaySlist`, params);
                this.listLoading = false;
                if (res === null) return;
                this.total = res.param.count;
                this.list = res.param.list;
            },
            //删除
            handleDel(index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(async () => {
                    let params = {
                        ids: row.id,
                        status: -1
                    };

                    const res = await this.$http.post(`mapadminSubwayStatus`, params);
                    if (res === null) return;
                    this.$message({
                        message: '状态修改成功',
                        type: 'success'
                    });
                    row.status = -1;
                    this.getListData();
                }).catch(() => {

                });
            },
            handleAddCancel() {
                this.addFormVisible = false;
            },
            handleEditCancel() {
                this.editFormVisible = false;
            },
            //显示编辑界面
            async handleEdit(index, row) {
                this.editFormVisible = true;
                let params = {
                    id: row.id,
                    name: this.editForm.name
                };
                const res = await this.$http.post(`mapadminSubwaySedit`, params);
                if (res === null) return;
                this.editForm = Object.assign({}, res.param);
            },
            //显示新增界面
            handleAdd() {
                this.addFormVisible = true;
                this.addForm = {
                    pid: this.$route.params.id,
                    name: '',
                };
            },
            //编辑
            editSubmit() {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(async () => {
                            this.editLoading = true;
                            let params = Object.assign({}, this.editForm);
                            const res = await this.$http.post(`mapadminSubwaySeditsave`, params);
                            this.editLoading = false;
                            if (res === null) return;
                            //NProgress.done();
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.$refs['editForm'].resetFields();
                            this.editFormVisible = false;
                            this.getListData();
                        });
                    }
                });
            },
            //新增
            addSubmit() {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(async () => {
                            this.addLoading = true;

                            let params = Object.assign({}, this.addForm);
                            const res = await this.$http.post(`mapadminSubwaySaddsave`, params);
                            this.addLoading = false;
                            if (res === null) return;
                            this.$message({
                                message: '新建成功',
                                type: 'success'
                            });
                            this.$refs['addForm'].resetFields();
                            this.addFormVisible = false;
                            this.getListData();

                        });
                    }
                });
            },
            // 修改状态
            async statusSubmit(index, row) {
                let params = {
                    ids: row.id,
                    status: 1 - row.status
                };

                const res = await this.$http.post(`mapadminSubwayStatus`, params);
                if (res === null) return;
                this.$message({
                    message: '状态修改成功',
                    type: 'success'
                });
                row.status = 1 - row.status;
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
                        api: `mapadminSubwayStatus`,
                        status: -1
                    },
                    'disable': {
                        tip: '停用',
                        api: `mapadminSubwayStatus`,
                        status: 0
                    },
                    'active': {
                        tip: '启用',
                        api: `mapadminSubwayStatus`,
                        status: 1
                    }
                };
                this.$confirm(`确认${actions[action].tip}选中记录吗？`, '提示', {
                    type: 'warning'
                }).then(async () => {
                    this.listLoading = true;
                    let params = (Object.assign({
                        ids: ids + '',
                        status: actions[action].status
                    }, params));
                    const res = await this.$http.post(actions[action].api, params);
                    this.listLoading = false;
                    if (res === null) return;
                    this.$message({
                        message: res.info,
                        type: 'success'
                    });
                    this.getListData();
                }).catch(() => {

                });
            },
        },
        mounted() {
            this.getListData();
        },
        components: {
            'i-uploader': Uploader
        },
    }

</script>

<style lang="scss">
</style>