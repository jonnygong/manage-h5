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
                    <el-button type="primary" :disabled="true" @click="getList">添加问题</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="list" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="news" label="用户问题" width="200">
            </el-table-column>
            <el-table-column prop="answer" label="专家回复" width="200">
            </el-table-column>
            <el-table-column prop="k_id" label="问题类别" width="100">
                <template scope="scope">
                    {{ cat[scope.row.k_id] }}
                </template>
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="200" :formatter="formateDate">
            </el-table-column>
            <el-table-column prop="is_show" label="是否展示" width="100">
                <template scope="scope">
                    <el-tag :type="scope.row.is_show === 1 ? 'success' :'warning'">
                        {{ scope.row.is_show === 1 ? '展示' : '不展示' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="is_answer" label="是否回复" width="100">
                <template scope="scope">
                    <el-tag :type="scope.row.is_answer === 1 ? 'success' : 'warning'">
                        {{ scope.row.is_answer === 1 ? '已回复' : '未回复' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="是否启用" width="100">
                <template scope="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : 'warning'">
                        {{ scope.row.status === 1 ? '启用' : '禁用' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="220" fixed="right">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">回答</el-button>
                    <el-button :type="scope.row.status === 1 ? 'warning' : 'success'" size="small"
                               @click="statusSubmit(scope.$index, scope.row)">
                        {{ scope.row.status === 1 ? '禁用' : '启用'}}
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
        <el-dialog title="编辑" size="large" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
                <el-form-item label="用户问题" prop="news">
                    <el-input type="textarea" v-model="editForm.news"></el-input>
                </el-form-item>
                <el-form-item label="专家回答" prop="answer">
                    <el-input type="textarea" v-model="editForm.answer"></el-input>
                </el-form-item>
                <el-form-item label="是否展示" prop="is_show">
                    <el-radio
                            class="is_show"
                            v-model.number="editForm.is_show"
                            :label="item.label"
                            v-for="(item,index) in radio"
                            :key="index">
                        {{ item.name }}
                    </el-radio>
                </el-form-item>

                <el-form-item label="问题类别" prop="category_id">
                    <template>
                        <el-select v-model.number="editForm.category_id" placeholder="请选择">
                            <el-option
                                    v-for="(item, index) in categoryType.options"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        <el-button type="primary" @click.native="showShowType" :loading="editLoading">新增问题分类</el-button>
                    </template>
                </el-form-item>
                <el-form-item label="新增问题分类" prop="typename" v-show="this.showType">
                    <template scope="scope">
                        <el-input v-model="typename"></el-input>
                        <el-button type="primary" @click.native="addQaType(scope.row)" :loading="editLoading">新增</el-button>
                        <el-button type="normal" @click.native="hiddeShowType" :loading="editLoading">取消</el-button>
                    </template>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
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
                    key: 'news',
                    options: [
                        {value: 'news', label: '用户问题'},
                    ],
                },
                selectType: [],
                categoryType: {
                    value: '',
                    key: '',
                    options: [],
                },
                list: [],
                radio: [
                    {label: 1, name: '展示'},
                    {label: 0, name: '不展示'}
                ],
                cat: [],
                typename: '',
                showType: false,
                is_show: 0,
                page: 1,
                total: 0,
                pagesize: 10,
                listLoading: false,
                sels: [], //列表选中列

                editFormVisible: false, //编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    k_id: [
                        {type: 'number', required: true, message: '请选择上级分类', trigger: 'blur'}
                    ],
                    category_id: [
                        {type: 'number', required: true, message: '请选择上级分类', trigger: 'blur'}
                    ],
                    news: [
                        {required: true, message: '请选择问题内容', trigger: 'blur'}
                    ],
                    answer: [
                        {required: true, message: '请输入回答内容', trigger: 'blur'}
                    ],
                    is_show: [
                        {type: 'number', required: true, message: '请选择是否展示', trigger: 'blur'}
                    ],
                },
                //编辑界面数据
                editForm: {
                    id: '',
                    news: '',
                    answer: '',
                    thumb: '暂无图片',
                    k_id: '',
                    category_id: '',
                    is_show: '',
                },

                addFormVisible: false, //编辑界面是否显示
                addLoading: false,
                addFormRules: {
                    k_id: [
                        {required: true, message: '请选择上级分类', trigger: 'blur'}
                    ],
                },
                //编辑界面数据
                addForm: {
                    id: '',
                },
            }
        },
        methods: {
            // 格式化创建时间
            formateDate(row, column) {
                return util.formatDate.format(new Date(row.create_time * 1000), 'yyyy-MM-dd hh:mm:ss')
            },
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
                api.changeShowStatus(para).then((res) => {
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
                api.getQaList(para).then((res) => {
                    if (res.data.status === 200) {
                        this.listLoading = false;
                        this.total = res.data.param.count;
                        this.list = res.data.param.list;
                        this.is_show = res.data.param.list.is_show;
                    }
                });
            },
            // 获取顶级分类列表
            getTopList(index, row) {
                let para = {
                    project_id: 2,
                };
                api.getRebellionTypeInfo(para).then((res) => {
                    if (res.data.status === 200) {
                        this.listLoading = false;
                        this.selectType = res.data.param;
                    }
                });
            },
            // 获取顶级分类名称列表
            getTopListName(index, row) {
                let para = {
                    project_id: 2,
                };
                api.getRebellionTopTypeList(para).then((res) => {
                    if (res.data.status === 200) {
                        this.listLoading = false;
                        this.cat = res.data.param;
                    }
                });
            },
            // 获取子分类列表
            getSonTypeList(index, row) {
                let para = {
                    pid: row.k_id
                };
                api.getSonType(para).then((res) => {
                    if (res.data.status === 200) {
                        this.listLoading = false;
                        this.categoryType.options = res.data.param;
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

                    api.changeShowStatus(para).then((res) => {
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
                this.getSonTypeList(index, row);
                let para = {
                    id: row.id,
                };
                api.getReporterAnswerInfo(para).then((res) => {
                    if (res.data.status === 200) {
                        this.listLoading = false;
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
                                news: this.editForm.news,
                                answer: this.editForm.answer,
                                thumb: '暂无图片',
                                k_id: this.editForm.k_id,
                                category_id: this.editForm.category_id,
                                is_show: this.editForm.is_show,
                            };
                            api.editReporterAnswer(params)
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

            addQaType(row) {

                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    this.addLoading = true;
                    let params = {
                        name: this.typename,
                        pid: row.pid,
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
                                this.getSonTypeList();
                                this.hiddeShowType();
                            }
                        });
                });

            },
            //批量操作
            batchRemove(action) {
                // 三种操作：remove disable active
                let ids = this.sels.map(item => item.id).toString();
                const actions = {
                    'remove': {
                        tip: '删除',
                        api: `changeShowStatus`,
                        status: -1
                    },
                    'disable': {
                        tip: '禁用',
                        api: `changeShowStatus`,
                        status: 0
                    },
                    'active': {
                        tip: '启用',
                        api: `changeShowStatus`,
                        status: 1
                    }
                };
                this.$confirm('确认修改选中项状态吗？', '提示', {
                    type: 'warning'
                }).then(() => {


                    this.listLoading = true;
                    // 非批量删除，带上 status
                    let para = (Object.assign({
                        ids: ids + '',
                        status: actions[action].status
                    }, para));
                    api.changeShowStatus(para).then((res) => {
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

            selsChange(sels) {
                this.sels = sels;
            },
            showShowType() {
//                if (this.showType) {
//                    this.showType = false;
//                } else {
                    this.showType = true;
//                }
            },
            hiddeShowType() {
//                if (this.showType) {
                    this.showType = false;
//                } else {
//                this.showType = true;
//                }
            }
        },
        mounted() {
            this.getList();
            this.getTopListName();
        }
    }
</script>

<style lang="scss">

</style>