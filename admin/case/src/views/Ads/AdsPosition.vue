<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="primary" v-on:click="getAdPosition">刷新</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="adPositions" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="80" sortable>
            </el-table-column>
            <el-table-column prop="name" label="名称">
            </el-table-column>
            <el-table-column prop="width" label="宽度">
            </el-table-column>
            <el-table-column prop="height" label="高度">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
                <template scope="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : scope.row.status === -1 ? 'gray' : 'danger'">
                        {{ scope.row.status === 1 ? '可用' : scope.row.status === -1 ? '已删除' : '不可用' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="create_time"
                             label="创建时间"
                             :formatter="formateDate"
                             width="200">
            </el-table-column>
            <el-table-column prop="pid" label="上级">
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pagesize" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
                <el-form-item label="广告位ID" prop="id">
                    <el-input v-model="editForm.id" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="宽度(单位px)" prop="width">
                    <el-input v-model.number="editForm.width" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="高度(单位px)" prop="height">
                    <el-input v-model.number="editForm.height" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="上级" prop="pid">
                    <el-select v-model.number="editForm.pid" placeholder="选择广告位所属上级">
                        <el-option :label="position.title"
                                   :value="position.id"
                                   v-for="(position, index) in positionsSelect"
                                   :key="position.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select v-model.number="editForm.status" placeholder="请选择状态">
                        <el-option label="可用" :value="1"></el-option>
                        <el-option label="不可用" :value="0"></el-option>
                        <el-option label="已删除" :value="-1"></el-option>
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
                <el-form-item label="名称" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="宽度(单位px)" prop="width">
                    <el-input v-model.number="addForm.width" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="高度(单位px)" prop="height">
                    <el-input v-model.number="addForm.height" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="上级" prop="pid">
                    <el-select v-model.number="addForm.pid" placeholder="选择广告位所属上级">
                        <el-option :label="position.title"
                                   :value="position.id"
                                   v-for="(position, index) in positionsSelect"
                                   :key="position.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select v-model="addForm.status" placeholder="请选择状态">
                        <el-option label="可用" :value="1"></el-option>
                        <el-option label="不可用" :value="0"></el-option>
                        <el-option label="已删除" :value="-1"></el-option>
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
                adPositions: [],
                positionsSelect: [],
                total: 0,
                page: 1,
                pagesize: 0,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        {required: true, message: '请输入广告位置名称', trigger: 'blur'}
                    ],
                    width: [
                        {type: 'number', required: true, message: '请输入广告位置宽度', trigger: 'blur'}
                    ],
                    height: [
                        {type: 'number', required: true, message: '请输入广告位置高度', trigger: 'blur'}
                    ],
                    pid: [
                        {type: 'number', required: true, message: '请选择所属上级', trigger: 'blur'}
                    ],
                    status: [
                        {type: 'number', required: true, message: '请选择状态', trigger: 'blur'}
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    width: 0,
                    height: 0,
                    status: 1,
                    pid: ''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        {required: true, message: '请输入广告位置名称', trigger: 'blur'}
                    ],
                    width: [
                        {type: 'number', required: true, message: '请输入广告位置宽度', trigger: 'blur'}
                    ],
                    height: [
                        {type: 'number', required: true, message: '请输入广告位置高度', trigger: 'blur'}
                    ],
                    pid: [
                        {type: 'number', required: true, message: '请选择所属上级', trigger: 'blur'}
                    ],
                    status: [
                        {type: 'number', required: true, message: '请选择状态', trigger: 'blur'}
                    ]
                },
                //新增界面数据
                addForm: {
                    name: '',
                    width: 0,
                    height: 0,
                    status: 1,
                    pid: ''
                }
            }
        },
        methods: {
            // 格式化创建时间
            formateDate(row, column) {
                return util.formatDate.format(new Date(row.create_time * 1000), 'yyyy-MM-dd hh:mm:ss')
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getAdPosition();
            },
            //获取广告位置列表
            getAdPosition() {
                let para = {
                    page: this.page
                };
                this.listLoading = true;
                api.getAdspaceList(para).then((res) => {
                    this.listLoading = false;
                    if (res.data.status === 200) {

                        this.total = res.data.param.pages.total;
                        this.pagesize = res.data.param.pages.pagesize;
                        this.adPositions = res.data.param.list;
                    }
                });
            },
            // 获取分类
            getSelect () {

                api.getAdspaceSelect()
                    .then((res) => {

                        let select = [{
                            id: 0,
                            pid: 0,
                            title: '│顶级分类'
                        }];

                        res.data.param.forEach((item, index) => {

                            if(item.dep === 0){
                                let tempObj = {
                                    id: item.id,
                                    pid: item.pid,
                                    title: '│--' + item.title
                                };
                                select.push(tempObj)
                            } else if(item.dep === 1){
                                let tempObj = {
                                    id: item.id,
                                    pid: item.pid,
                                    title: '│----' + item.title
                                };
                                select.push(tempObj);
                            }

                        });
                        this.positionsSelect = select.slice(0);

                    })
            },
            //删除
            handleDel(index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let para = {id: row.id};
                    api.delAdspace(para).then((res) => {
                        this.listLoading = false;
                        if (res.data.status === 200) {
                            this.$message({
                                message: res.data.info,
                                type: 'success'
                            });
                            this.getAdPosition();
                        }
                    });
                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit(index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //显示新增界面
            handleAdd() {
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    width: 0,
                    height: 0,
                    status: 1,
                    pid: ''
                };
            },
            //编辑
            editSubmit() {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let para = Object.assign({}, this.editForm);
                            api.editAdspace(para)
                                .then((res) => {
                                    this.editLoading = false;
                                    if (res.data.status === 200) {
                                        this.$message({
                                            message: res.data.info,
                                            type: 'success'
                                        });
                                        this.$refs['editForm'].resetFields();
                                        this.editFormVisible = false;
                                        this.getAdPosition();
                                        this.getSelect();
                                    }
                                })
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
                            api.addAdspace(para)
                                .then((res) => {
                                    this.addLoading = false;
                                    if (res.data.status === 200) {
                                        this.$message({
                                            message: res.data.info,
                                            type: 'success'
                                        });
                                        this.$refs['addForm'].resetFields();
                                        this.addFormVisible = false;
                                        this.getAdPosition();
                                        this.getSelect();
                                    }


                                })

                        });
                    }
                });
            },
            selsChange(sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove() {
                let ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {ids: ids};
                    batchRemoveUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getAdPosition();
                    });
                }).catch(() => {

                });
            },
        },
        mounted() {
            this.getAdPosition();
            this.getSelect();
        }
    }

</script>

<style scoped>

</style>