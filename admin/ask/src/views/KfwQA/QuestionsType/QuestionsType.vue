<template>
    <section>

        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.value" placeholder="关键词"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="filters.key" placeholder="请选择搜索字段">
                        <el-option
                                v-for="(item,index) in filters.options"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="search" @click="getList">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList">刷新</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">添加</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="list" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="name" label="分类名称">
            </el-table-column>
            <el-table-column prop="pid" label="上级分类">
                <template scope="scope">
                    {{ cat[scope.row.pid] }}
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
                <template scope="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : scope.row.status === -1 ? 'gray' : 'danger'">
                        {{ scope.row.status === 1 ? '开启' : scope.row.status === -1 ? '删除' : '关闭' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button :type="scope.row.status === 1 ? 'warning' : 'success'" size="small"
                               @click="statusSubmit(scope.$index, scope.row)">
                        {{ scope.row.status === 1 ? '关闭' : '开启' }}
                    </el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除
                    </el-button>

                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove('remover')"
                       :disabled="this.sels.length===0">批量删除
            </el-button>
            <el-button type="warning" @click="batchRemove('disable')" :disabled="this.sels.length===0">批量禁用</el-button>
            <el-button type="success" @click="batchRemove('active')" :disabled="this.sels.length===0">批量启用</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange"
                           :page-size="pagesize"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>


        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="上级分类" prop="name">
                    <el-select v-model="editForm.pid" placeholder="请选择上级分类">
                        <el-option
                                v-for="(item,index) in selectType"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
                <el-form-item label="分类名称" prop="typename">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="上级分类" prop="name">
                    <el-select v-model.number="addForm.pid" placeholder="请选择上级分类">
                        <el-option
                                v-for="(item,index) in selectType"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
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
                    value: '',
                    key: 'name',
                    options: [
                        {value: 'name', label: '分类名称'},
                    ],
                },
                selectType: [],

                list: [],
                cat: [],
                page: 1,
                total: 0,
                pagesize: 10,
                listLoading: false,
                sels: [], //列表选中列

                editFormVisible: false, //编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    pid: [
                        {type: 'number', required: true, message: '请选择上级分类', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '请输入分类名称', trigger: 'blur'}
                    ],
                },
                //编辑界面数据
                editForm: {
                    id: '',
                    name: '',
                    pid: '',
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    pid: [
                        {type: 'number', required: true, message: '请选择上级分类', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '请输入分类名称', trigger: 'blur'}
                    ],
                },
                //新增界面数据
                addForm: {
                    name: '',
                    pid: '',
                },
            }
        },
        methods: {
            // 分页切换
            handleCurrentChange(val) {
                this.page = val;
                // 获取数据
                this.getList();
            },
            // 修改单个状态
            statusSubmit(index, row) {
                let para = {
                    ids: row.id,
                    status: 1 - row.status
                };
                api.changeRebellionTypeStatus(para).then((res) => {
                    if (res.data.status === 200) {
                        this.$message({
                            message: '状态修改成功',
                            type: 'success'
                        });
                        row.status = 1 - row.status;
                    }
                    ;
                });
            },
            //获取列表
            getList() {
                this.listLoading = true;
                let para = {
                    page: this.page,
                    search: this.filters.value,
                    project_id: 2
                };
                this.listLoading = true;
                api.getRebellionTypeList(para).then((res) => {
                    if (res.data.status === 200) {
                        this.listLoading = false;
                        this.total = res.data.param.count;
                        this.list = res.data.param.list;

                    }
                });
            },
            // 获取顶级分类列表
            getTopList(index, row) {
                let para = {
                    project_id: 2
                };
                api.getRebellionTypeInfo(para).then((res) => {
                    if (res.data.status === 200) {
                        this.listLoading = false;
                        this.total = res.data.param.count;
                        this.selectType = res.data.param;
                    }
                });
            },
            // 获取顶级分类名称列表
            getTopListName(index, row) {
                let para = {
                    project_id: 2
                };
                api.getRebellionTopTypeList(para).then((res) => {
                    if (res.data.status === 200) {
                        this.listLoading = false;
                        this.total = res.data.param.count;
                        this.cat = res.data.param;
                    }
                });
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let para = {
                        ids: row.id,
                        status: -1
                    };

                    api.changeRebellionTypeStatus(para).then((res) => {
                        if (res.data.status === 200) {
                            this.listLoading = false;
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getList();
                        }
                    })

                }).catch(() => {

                });
            },
            //显示分类编辑界面
            handleEdit(index, row) {
                this.editFormVisible = true;
                this.getTopList();
                let para = {
                    id: row.id,
                };
                api.changeRebellionType(para).then((res) => {
                    if (res.data.status === 200) {
                        this.listLoading = false;
                        this.total = res.data.param.count;
                        this.editForm = res.data.param;
                    }
                });
            },

            //编辑
            editSubmit() {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let params = {
                                id: this.editForm.id,
                                name: this.editForm.name,
                                pid: this.editForm.pid,
                            };
                            api.editRebellionType(params)
                                .then((res) => {
                                    if (res.data.status === 200) {
                                        this.editLoading = false;
                                        this.$message({
                                            message: '修改成功',
                                            type: 'success'
                                        });
                                        this.$refs['editForm'].resetFields();
                                        this.editFormVisible = false;
                                        this.getList();
                                    }
                                });
                        });
                    }
                });
            },
            //显示新增界面
            handleAdd() {
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    pid: ''
                };
                this.getTopList();
            },
            //新增
            addSubmit() {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            let params = {
                                name: this.addForm.name,
                                pid: this.addForm.pid,
                                project_id: 2
                            };

                            api.addRebellionType(params)
                                .then((res) => {

                                    this.addLoading = false;
                                    if (res.data.status === 200) {
                                        this.$message({
                                            message: res.data.info,
                                            type: 'success'
                                        });

                                        this.$refs['addForm'].resetFields();
                                        this.addFormVisible = false;
                                        this.getList();

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
            batchRemove(action) {
                // 三种操作：remove disable active
                let ids = this.sels.map(item => item.id).toString();
                const actions = {
                    'remove': {
                        tip: '删除',
                        api: `changeRebellionTypeStatus`,
                        status: -1
                    },
                    'disable': {
                        tip: '停用',
                        api: `changeRebellionTypeStatus`,
                        status: 0
                    },
                    'active': {
                        tip: '启用',
                        api: `changeRebellionTypeStatus`,
                        status: 1
                    }
                };
                this.$confirm('确认修改选中项状态吗？', '提示', {
                    type: 'warning'
                }).then(() => {


                    this.listLoading = true;
                    // 非批量删除，带上 status
                    let para = (action !== 'remove' ? Object.assign({
                        ids: ids + '',
                        status: actions[action].status
                    }, para) : {id: ids + ''});
                    api.changeRebellionTypeStatus(para).then((res) => {
                        this.listLoading = false;
                        this.$message({
                            message: res.data.info,
                            type: 'success'
                        });
                        this.getList();
                    });
                }).catch(() => {

                });
            },
            // 处理新增页面上传
            customAddUpload(file) {
                this._uploadImage(file, this.addForm)
            },
            // 处理编辑页面上传
            customEditUpload(file) {
                this._uploadImage(file, this.editForm)
            },
        },
        mounted() {
            this.getList();
            this.getTopListName();
        }
    }
</script>

<style lang="scss">

</style>