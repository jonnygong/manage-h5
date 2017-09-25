<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="primary" @click="getCategory">刷新</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="category" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="80" sortable>
            </el-table-column>
            <el-table-column prop="title" label="标题" min-width="100">
            </el-table-column>
            <el-table-column prop="img" label="图标" width="120">
                <template scope="scope">
                    <!--<el-popover trigger="hover" placement="top">-->
                    <!--<div class="ad-img">-->
                    <!--<img :src="scope.row.img" :alt="scope.row.title" width="200" height="auto"-->
                    <!--v-if="scope.row.img !== ''">-->
                    <!--<p v-else>暂无图标</p>-->
                    <!--</div>-->
                    <div slot="reference" class="name-wrapper">
                        <el-tag>{{scope.row.img === '' ? '暂无图标' : scope.row.img}}</el-tag>
                    </div>
                    <!--</el-popover>-->
                </template>
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
            <el-table-column prop="sort" label="排序" width="100" sortable>
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
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pagesize"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
                <el-form-item label="ID" prop="id">
                    <el-input v-model="editForm.id" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="editForm.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="图标" prop="img">
                    <!--<el-upload-->
                    <!--class="avatar-uploader"-->
                    <!--action="https://api.kfw001.com/Caseadmin/img/upload"-->
                    <!--:http-request="customEditUpload"-->
                    <!--:show-file-list="false"-->
                    <!--:before-upload="beforeImageUpload">-->
                    <!--<img v-if="editForm.img" :src="editForm.img" class="avatar">-->
                    <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                    <!--</el-upload>-->
                    <el-input v-model="editForm.img" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model.number="editForm.sort" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="上级分类" prop="pid">
                    <el-select v-model.number="editForm.pid" placeholder="选择上级分类">
                        <el-option :label="cate.title"
                                   :value="cate.id"
                                   v-for="(cate, index) in categorySelect"
                                   :key="cate.id"
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
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="addForm.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="图标样式名称" prop="img">
                    <!--<el-upload-->
                    <!--class="avatar-uploader"-->
                    <!--action="https://api.kfw001.com/Caseadmin/img/upload"-->
                    <!--:http-request="customAddUpload"-->
                    <!--:show-file-list="false"-->
                    <!--:before-upload="beforeImageUpload">-->
                    <!--<img v-if="addForm.img" :src="addForm.img" class="avatar">-->
                    <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                    <!--</el-upload>-->
                    <el-input v-model="addForm.img" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model.number="addForm.sort" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="上级分类" prop="pid">
                    <el-select v-model.number="addForm.pid" placeholder="选择上级分类">
                        <el-option :label="cate.title"
                                   :value="cate.id"
                                   v-for="(cate, index) in categorySelect"
                                   :key="cate.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select v-model.number="addForm.status" placeholder="请选择状态">
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
                category: [],
                categorySelect: [],
                total: 0,
                page: 1,
                pagesize: 0,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    title: [
                        {required: true, message: '请输入分类名称', trigger: 'blur'}
                    ],
                    img: [
                        {required: true, message: '请输入图标样式名称', trigger: 'blur'}
                    ],
                    pid: [
                        {type: 'number', required: true, message: '请选择上级分类', trigger: 'blur'}
                    ],
                    status: [
                        {type: 'number', required: true, message: '请选择状态', trigger: 'blur'}
                    ],
                    sort: [
                        {type: 'number', required: true, message: '请输入顺序', trigger: 'blur'}
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    title: '',
                    img: '',
                    sort: 0,
                    status: 1,
                    pid: '',
                    update_time: ''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    title: [
                        {required: true, message: '请输入分类名称', trigger: 'blur'}
                    ],
                    img: [
                        {required: true, message: '请输入图标样式名称', trigger: 'blur'}
                    ],
                    pid: [
                        {type: 'number', required: true, message: '请选择上级分类', trigger: 'blur'}
                    ],
                    status: [
                        {type: 'number', required: true, message: '请选择状态', trigger: 'blur'}
                    ],
                    sort: [
                        {type: 'number', required: true, message: '请输入顺序', trigger: 'blur'}
                    ]
                },
                //新增界面数据
                addForm: {
                    title: '',
                    img: '',
                    sort: 0,
                    status: 1,
                    pid: ''
                }
            }
        },
        methods: {
            // 格式化创建时间
            formateDate(row, column) {
                return util.formatDate.format(new Date(row.update_time * 1000), 'yyyy-MM-dd hh:mm:ss')
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getCategory();
            },
            //获取列表
            getCategory() {
                let para = {
                    page: this.page
                };
                this.listLoading = true;
                api.getCategoryList(para).then((res) => {
                    this.listLoading = false;
                    if (res.data.status === 200) {
                        this.total = res.data.param.pages.total;
                        this.pagesize = res.data.param.pages.pagesize;
                        this.category = res.data.param.list;
                    }
                });
            },
            // 获取分类
            getSelect() {

                api.getCategorySelect()
                    .then((res) => {

                        let select = [{
                            id: 0,
                            pid: 0,
                            title: '│顶级分类'
                        }];

                        res.data.param.forEach((item, index) => {

                            if (item.dep === 0) {
                                let tempObj = {
                                    id: item.id,
                                    pid: item.pid,
                                    title: '│--' + item.title
                                };
                                select.push(tempObj)
                            } else if (item.dep === 1) {
                                let tempObj = {
                                    id: item.id,
                                    pid: item.pid,
                                    title: '│----' + item.title
                                };
                                select.push(tempObj);
                            }

                        });
                        this.categorySelect = select.slice(0);

                    })
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let para = {id: row.id};
                    api.delCategory(para).then((res) => {
                        this.listLoading = false;
                        if (res.data.status === 200) {
                            this.$message({
                                message: res.data.info,
                                type: 'success'
                            });
                            this.getCategory();
                        }
                    });
                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                let param = {
                    id: row.id
                };
                api.getCategoryDetail(param)
                    .then((res) => {
                        if (res.data.status === 200) {
                            this.editForm = Object.assign({}, res.data.param);
                            this.editForm.update_time = this.editForm.update_time * 1000;
                        }
                    });
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    title: '',
                    img: '',
                    sort: 0,
                    status: 1,
                    pid: ''
                };
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let params = {
                                id: this.editForm.id,
                                title: this.editForm.title,
                                status: this.editForm.status,
                                pid: this.editForm.pid,
                                img: this.editForm.img,
                                sort: this.editForm.sort
                            };
                            api.editCategory(params)
                                .then((res) => {
                                    this.editLoading = false;
                                    if (res.data.status === 200) {
                                        this.$message({
                                            message: res.data.info,
                                            type: 'success'
                                        });
                                        this.$refs['editForm'].resetFields();
                                        this.editFormVisible = false;
                                        this.getCategory();
                                        this.getSelect();
                                    }
                                })
                        });
                    }
                });
            },
            //新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            let para = Object.assign({}, this.addForm);
                            api.addCategory(para)
                                .then((res) => {
                                    this.addLoading = false;
                                    if (res.data.status === 200) {
                                        this.$message({
                                            message: res.data.info,
                                            type: 'success'
                                        });
                                        this.$refs['addForm'].resetFields();
                                        this.addFormVisible = false;
                                        this.getCategory();
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
                        this.getCategory();
                    });
                }).catch(() => {

                });
            }
        },
        mounted() {
            this.getCategory();
            this.getSelect();
        }
    }

</script>

<style scoped>

</style>