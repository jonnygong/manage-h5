<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="primary" v-on:click="getListData">刷新</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="sources" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="80" sortable>
            </el-table-column>
            <el-table-column prop="title" label="分享标题" min-width="120">
            </el-table-column>
            <el-table-column prop="desc" label="分享描述" min-width="120">
            </el-table-column>
            <el-table-column prop="link" label="分享链接" min-width="120">
            </el-table-column>
            <el-table-column prop="imgUrl" label="分享图标" width="120">
                <template scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <div class="ad-img">
                            <img :src="scope.row.imgUrl" :alt="scope.row.title" width="200" height="auto"
                                 v-if="scope.row.imgUrl !== ''">
                            <p v-else>暂无分享图标</p>
                        </div>
                        <div slot="reference" class="name-wrapper">
                            <el-tag>查看分享图标</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="update_time" label="添加时间" width="200" :formatter="formateDate">
            </el-table-column>
            <el-table-column prop="update_time" label="更新时间" width="200" :formatter="formateDate">
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
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pagesize"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
                <el-form-item label="客户ID" prop="id">
                    <el-input v-model="editForm.id" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="分享标题" prop="title">
                    <el-input v-model="editForm.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="分享描述" prop="desc">
                    <el-input type="textarea" v-model="editForm.desc"></el-input>
                </el-form-item>
                <el-form-item label="分享链接" prop="link">
                    <el-input v-model="editForm.link" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="分享图标" prop="imgUrl">
                    <el-upload
                            class="avatar-uploader"
                            action="https://api.kfw001.com/Caseadmin/img/upload"
                            :http-request="customEditUpload"
                            :show-file-list="false"
                            :before-upload="beforeImageUpload">
                        <img v-if="editForm.imgUrl" :src="editForm.imgUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select v-model.number="editForm.status" placeholder="请选择状态">
                        <el-option label="可用" :value="1"></el-option>
                        <el-option label="不可用" :value="0"></el-option>
                        <el-option label="已删除" :value="-1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="更新时间" prop="update_time">
                    <el-date-picker type="date"
                                    :readonly="true"
                                    v-model.date="editForm.update_time"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    style="width: 100%;"
                    ></el-date-picker>
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
                <el-form-item label="分享标题" prop="title">
                    <el-input v-model="addForm.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="分享描述" prop="desc">
                    <el-input type="textarea" v-model="addForm.desc"></el-input>
                </el-form-item>
                <el-form-item label="分享链接" prop="link">
                    <el-input v-model="addForm.link" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="分享图标" prop="imgUrl">
                    <el-upload
                            class="avatar-uploader"
                            action="https://api.kfw001.com/Caseadmin/img/upload"
                            :http-request="customAddUpload"
                            :show-file-list="false"
                            :before-upload="beforeImageUpload">
                        <img v-if="addForm.imgUrl" :src="addForm.imgUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
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
    import util from '@/common/js/util'
    import api from '@/api'

    export default {
        data() {
            return {
                sources: [],
                total: 0,
                page: 1,
                pagesize: 0,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    title: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                    imgUrl: [
                        {required: true, message: '请上传图标', trigger: 'blur'}
                    ],
                    link: [
                        {required: true, message: '请输入链接', trigger: 'blur'}
                    ],
                    desc: [
                        {required: true, message: '请输入描述', trigger: 'blur'}
                    ],
                    status: [
                        {type: 'number', required: true, message: '请输入顺序', trigger: 'blur'}
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    title: '',
                    desc: '',
                    link: '',
                    imgUrl: '',
                    status: 0,
                    update_time: ''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    title: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                    imgUrl: [
                        {required: true, message: '请上传图标', trigger: 'blur'}
                    ],
                    link: [
                        {required: true, message: '请输入链接', trigger: 'blur'}
                    ],
                    desc: [
                        {required: true, message: '请输入描述', trigger: 'blur'}
                    ],
                    status: [
                        {type: 'number', required: true, message: '请输入顺序', trigger: 'blur'}
                    ]
                },
                //新增界面数据
                addForm: {
                    title: '',
                    desc: '',
                    link: '',
                    imgUrl: ''
                }

            }
        },
        methods: {
            // 格式化更新时间
            formateDate(row, column) {
                return ` ${util.formatDate.format(new Date(row.update_time * 1000), 'yyyy-MM-dd hh:mm:ss')}`
            },
            // 图片上传前限制条件
            beforeImageUpload(file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getListData();
            },
            //获列表
            getListData() {
                this.listLoading = true;
                let para = {
                    page: this.page,
//                    status: this.filters.status // 可选参数查询
                };

                api.getShareConfigList(para).then((res) => {
                    this.listLoading = false;
                    console.log(res);
                    if (res.data.status === 200) {
                        this.total = res.data.param.pages.total;
                        this.pagesize = res.data.param.pages.pagesize;
                        this.sources = res.data.param.list;
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

                    api.delShareConfig(para).then((res) => {
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
            handleAddCancel() {
                this.addFormVisible = false;
            },
            handleEditCancel() {
                this.editFormVisible = false;
            },
            //显示编辑界面
            handleEdit(index, row) {
                this.editFormVisible = true;
                let param = {
                    id: row.id
                };
                api.getShareConfigDetail(param)
                    .then((res) => {
                        if (res.data.status === 200) {
                            this.editForm = Object.assign({}, res.data.param);
                            this.editForm.update_time = new Date(this.editForm.update_time * 1000);
                        }
                    });
            },
            //显示新增界面
            handleAdd() {
                this.addFormVisible = true;
                this.addForm = {
                    title: '',
                    desc: '',
                    link: '',
                    imgUrl: ''
                };
            },
            //编辑
            editSubmit() {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let para = Object.assign({}, this.editForm);
                            api.editShareConfig(para)
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
                            api.addShareConfig(para)
                                .then((res) => {
                                    if (res.data.status === 200) {
                                        this.addLoading = false;
                                        this.$message({
                                            message: '新建成功',
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
            // 修改客户状态
            statusSubmit(index, row) {
                let param = {
                    id: row.id,
                    status: 1 - row.status
                };
                api.changeShareConfigState(param)
                    .then((res) => {
                        if (res.data.status === 200) {
                            this.$message({
                                message: '状态修改成功',
                                type: 'success'
                            });
                            row.status = 1 - row.status;
                        }
                    })
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
                        this.getUsers();
                    });
                }).catch(() => {

                });
            },
            // 处理新增页面上传
            customAddUpload(file) {
                this._uploadImage(file, this.addForm, 'imgUrl')
            },
            // 处理编辑页面上传
            customEditUpload(file) {
                this._uploadImage(file, this.editForm, 'imgUrl')
            },
            /**
             * 统一上传接口
             * @param file 接收文件对象
             * @param type 区分新增和删除， this.addForm 和 this.editForm
             * @private
             */
            _uploadImage(file, type, key) {
                // 将文件转为 base64 上传至服务器
                let reader = new FileReader();
                reader.readAsDataURL(file.file);
                reader.onload = function () {
                    // 拿到 base64 代码
                    let param = {
                        uploadimg: reader.result
                    };
                    api.imageUpload(param)
                        .then((res) => {
                            if (res.data.status === 200) {
                                type[key] = res.data.param.path;
                            }
                        })
                };
            }
        },
        mounted() {
            this.getListData();
        }
    }

</script>

<style lang="scss">
    .code-img, .logo-img {
        text-align: center;
    }

    .logo-img img {
        max-width: 150px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        min-width: 178px;
        min-height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        max-width: 200px;
        display: block;
    }
</style>