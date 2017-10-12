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
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="100" sortable></el-table-column>
            <el-table-column prop="email" label="用户名" width="80"></el-table-column>
            <el-table-column prop="realname" label="真名" width="80"></el-table-column>
            <el-table-column prop="tel" label="联系电话" width="100"></el-table-column>
            <el-table-column prop="thumb" label="头像" width="120">
                <template scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <div class="ad-img">
                            <img :src="scope.row.thumb" :alt="scope.row.realname" width="200" height="auto"
                                 v-if="scope.row.thumb !== ''">
                            <p v-else>暂无图片</p>
                        </div>
                        <div slot="reference" class="name-wrapper">
                            <el-tag>查看图片</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="update_time" label="更新时间" width="200" :formatter="formateDate"></el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="200" :formatter="formateDate"></el-table-column>
            <el-table-column prop="status" label="状态" width="100">
                <template scope="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : scope.row.status === -1 ? 'gray' : 'danger'">
                        {{ scope.row.status === 1 ? '可用' : scope.row.status === -1 ? '已删除' : '不可用' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="300" fixed="right">
                <template scope="scope">
                    <el-button size="small" @click="statusSubmit(scope.$index, scope.row)"
                               :disabled="scope.row.status === -1">
                        {{ scope.row.status === 1 ? '停用' : scope.row.status === 0 ? '启用' : '已删除' }}
                    </el-button>
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                    <el-button size="small" @click="handleAuth(scope.$index, scope.row)">设置权限</el-button>
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
                <el-form-item label="用户名" prop="email">
                    <el-input v-model="editForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="真名" prop="realname">
                    <el-input v-model="editForm.realname" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="editForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="tel">
                    <el-input v-model="editForm.tel" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户头像" prop="thumb">
                    <i-uploader v-model="editForm.thumb"></i-uploader>
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
                <el-form-item label="用户名" prop="email">
                    <el-input v-model="addForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="真名" prop="realname">
                    <el-input v-model="addForm.realname" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="tel">
                    <el-input v-model="addForm.tel" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户头像" prop="thumb">
                    <i-uploader v-model="addForm.thumb"></i-uploader>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--设置权限-->
        <el-dialog title="设置权限" v-model="authFormVisible" :close-on-click-modal="false">
            <el-form :model="authForm" label-width="80px" ref="authForm">
                <!--列表-->
                <el-table :data="authList" highlight-current-row v-loading="authListLoading" @selection-change="selsAuthChange" style="width: 100%;">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="name" label="模块名称" width="150"></el-table-column>
                    <el-table-column prop="url" label="模块路由" width="150"></el-table-column>
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="authFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="authSubmit" :loading="authLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import util from '@/common/js/util'
    import api from '@/api'
    import Uploader from '@/components/Uploader'

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

                authFormVisible:false,
                authLoading: false,
                authListLoading: false,
                authList: [],
                authSels: [],
                authForm: {

                },


                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    email: [{required: true, message: '请输入内容', trigger: 'blur'}],
                    realname: [{required: true, message: '请输入内容', trigger: 'blur'}],
                    password: [{required: true, message: '请输入内容', trigger: 'blur'}],
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    email: '',
                    realname: '',
                    tel: '',
                    thumb: '',
                    password: ''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    email: [{required: true, message: '请输入内容', trigger: 'blur'}],
                    realname: [{required: true, message: '请输入内容', trigger: 'blur'}],
                    password: [{required: true, message: '请输入内容', trigger: 'blur'}],
                },
                //新增界面数据
                addForm: {
                    email: '',
                    realname: '',
                    tel: '',
                    thumb: '',
                    password: ''
                }

            }
        },
        methods: {
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
                this.listLoading = true;
                api.getAdminList(para).then((res) => {
                    this.listLoading = false;
                    if (res.data.status === 200) {
                        this.total = res.data.param.pages.total;
                        this.pagesize = res.data.param.pages.pagesize;
                        this.list = res.data.param.list;
                    }
                });
            },
            //获取用户列表
            getAuthData(id) {
                this.authListLoading = true;
                api.getAdmintModules({id: id}).then((res) => {
                    this.authListLoading = false;
                    if (res.data.status === 200) {
                        this.authList = res.data.param.list;
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

                    api.getAdmintDelete(para).then((res)=> {
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
                api.getAdmintInfo(param)
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
                    email: '',
                    realname: '',
                    tel: '',
                    thumb: '',
                    password: ''
                };

            },
            //显示设置权限界面
            handleAuth(index, row) {
                this.authFormVisible = true;
                this.getAuthData(row.id);
            },
            //编辑
            editSubmit() {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let params = Object.assign({}, this.editForm);
                            api.getAdmintUpdate(params)
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
                            let params = Object.assign({}, this.addForm);

                            api.getAdminAdd(params)
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
            authSubmit() {
                this.$refs.authForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.authLoading = true;
                            let params = Object.assign({}, this.authForm);

                            api.getAdmintModule(params)
                                .then((res) => {

                                    this.authLoading = false;
                                    if (res.data.status === 200) {
                                        this.$message({
                                            message: res.data.info,
                                            type: 'success'
                                        });

                                        this.$refs['addForm'].resetFields();
                                        this.authFormVisible = false;
//                                        this.getListData();

                                    }
                                });
                        });
                    }
                });
            },
            selsChange(sels) {
                this.sels = sels;
            },
            selsAuthChange(sels) {
                this.authSels = sels;
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
                        api: `getAdmintStatus`,
                        status: 0
                    },
                    'active': {
                        tip: '启用',
                        api: `getAdmintStatus`,
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

                api.getAdmintStatus(para).then((res)=> {
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
        },
        components: {
            'i-uploader': Uploader
        }
    }

</script>

<style lang="scss" scoped>
    .line {
        text-align: center;
    }
    .link {
        color: #1f2d3d;
        text-decoration: none;
    }
</style>