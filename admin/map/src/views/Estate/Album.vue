<template>
    <section>

        <el-row>
            <el-col :span="24">
                <!--搜索-->
                <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">

                    <el-form :inline="true" :model="filters">
                        <!--<el-form-item>-->
                            <!--<el-input v-model="filters.value" placeholder="关键词"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item>-->
                            <!--<el-select v-model="filters.key" placeholder="请选择搜索字段">-->
                                <!--<el-option-->
                                        <!--v-for="(item,index) in filters.options"-->
                                        <!--:key="index"-->
                                        <!--:label="item.label"-->
                                        <!--:value="item.value">-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item>-->
                            <!--<el-select v-model="filters.type" placeholder="请选择类型">-->
                                <!--<el-option-->
                                        <!--label="全部"-->
                                        <!--value="">-->
                                <!--</el-option>-->
                                <!--<el-option-->
                                        <!--v-for="(item,index) in options.types"-->
                                        <!--:key="index"-->
                                        <!--:label="item.name"-->
                                        <!--:value="item.id">-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item>-->
                            <!--<el-button type="primary" icon="search" @click="getListData">搜索</el-button>-->
                        <!--</el-form-item>-->
                        <el-form-item>
                            <el-button type="primary" @click="handleAdd">添加图片</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click.native="handleRedirect('/estate')">返回上层</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>

                <!--列表-->
                <el-table :data="list" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                          style="width: 100%;">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <!-- 普通列表显示 -->
                    <el-table-column
                            v-for="(item,index) in tableColumn"
                            :key="index"
                            :prop="item.prop"
                            :label="item.label"
                            :min-width="item.width"
                            :sortable="item.sortable">
                    </el-table-column>
                    <el-table-column prop="status" label="是否为封面">
                        <template scope="scope">
                            {{ scope.row.is_cover === 1 ? '是' : '否' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="类型" :formatter="formateType"></el-table-column>
                    <el-table-column prop="url" label="图片" width="130">
                        <template scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <div class="ad-img">
                                    <img :src="scope.row.url" :alt="scope.row.name" width="200" height="auto"
                                         v-if="scope.row.url !== ''">
                                    <p v-else>暂无图片</p>
                                </div>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag>查看图片</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column prop="update_time" label="更新时间" width="180" :formatter="formateDate">
                    </el-table-column>
                    <el-table-column prop="create_time" label="创建时间" width="180" :formatter="formateDate">
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
                            <el-button size="small" @click="statusSubmit(scope.$index, scope.row)"
                                       :disabled="scope.row.status === -1">
                                {{ scope.row.status === 1 ? '停用' : scope.row.status === 0 ? '启用' : '已删除' }}
                            </el-button>
                            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!--工具条-->
                <el-col :span="24" class="toolbar">
                    <el-button type="danger" @click="batchAction('remove')"
                               :disabled="this.sels.length===0">批量删除
                    </el-button>
                    <el-button type="warning" @click="batchAction('disable')"
                               :disabled="this.sels.length===0">
                        禁用
                    </el-button>
                    <el-button type="primary" @click="batchAction('active')"
                               :disabled="this.sels.length===0">
                        启用
                    </el-button>
                    <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange"
                                   :page-size="pagesize"
                                   :total="total" style="float:right;">
                    </el-pagination>
                </el-col>
            </el-col>
        </el-row>


        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" :rules="addFormRules" label-width="120px" ref="addForm">
                <el-form-item label="图片名称" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="访问路径" prop="url">
                    <i-uploader v-model="addForm.url"></i-uploader>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model.number="addForm.type" placeholder="请选择">
                        <el-option
                                v-for="(item,index) in options.types"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否为封面" prop="is_cover">
                    <el-select v-model.number="addForm.is_cover" placeholder="请选择">
                        <el-option
                                v-for="(item, index) in options.is_cover"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
                <el-form-item label="图片名称" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="访问路径" prop="url">
                    <i-uploader v-model="editForm.url"></i-uploader>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model.number="editForm.type" placeholder="请选择">
                        <el-option
                                v-for="(item,index) in options.types"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否为封面" prop="is_cover">
                    <el-select v-model.number="editForm.is_cover" placeholder="请选择">
                        <el-option
                                v-for="(item, index) in options.is_cover"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
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
    import util from '@/utils/js'
    import Uploader from '@/components/Uploader';
    const MODEL_NAME = 'Company';

    export default {
        data() {
            return {
                tableColumn: [
                    {
                        prop: 'id',
                        label: 'ID',
                        width: 80,
                        sortable: true
                    },
                    {
                        prop: 'name',
                        label: '图片名称',
                        width: 120,
                        sortable: false
                    },
                    {
                        prop: 'project_id',
                        label: '项目ID',
                        width: 120,
                        sortable: false
                    }
                ],
                filters: {
                    value: '',
                    key: 'name',
                    type: '',
                    options: [
                        {value: 'name', label: '名称'}
                    ]
                },
                options: {
                    is_cover: [
                        {value: 1, label: '是'},
                        {value: 0, label: '否'},
                    ],
                    types: [],
                },
                prolist: [],
                list: [],
                total: 0,
                page: 1,
                pagesize: 10,
                listLoading: false,
                sels: [], //列表选中列

                editFormVisible: false, //编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    url: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    type: [
                        {type: 'number', required: true, message: '请选择', trigger: 'blur'}
                    ],
                    is_cover: [
                        {type: 'number', required: true, message: '请选择', trigger: 'blur'}
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    url: '',
                    type: '',
                    is_cover: '',
                    project_id: ''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    url: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    type: [
                        {type: 'number', required: true, message: '请选择', trigger: 'blur'}
                    ],
                    is_cover: [
                        {type: 'number', required: true, message: '请选择', trigger: 'blur'}
                    ]
                },
                //新增界面数据
                addForm: {
                    name: '',
                    url: '',
                    type: '',
                    is_cover: '',
                    project_id: '',
                },
            }
        },
        methods: {
            handleRedirect(path) {
                this.$router.push(path);
            },
            // 格式化更新时间
            formateDate(row, column) {
                console.log(column)
                return ` ${util.formatDate.format(new Date(row.update_time * 1000), 'yyyy-MM-dd hh:mm:ss')}`
            },
            // 格式化类型
            formateType(row, column) {
                console.log(column)
                let value = '暂无';
                // 1鸟瞰图2效果图3户型图4配套图5实景图6区位图
                switch (row.type) {
                    case 1:
                        value = '鸟瞰图';
                        break;
                    case 2:
                        value = '效果图';
                        break;
                    case 3:
                        value = '户型图';
                        break;
                    case 4:
                        value = '配套图';
                        break;
                    case 5:
                        value = '实景图';
                        break;
                    case 6:
                        value = '区位图';
                        break;
                }
                return value;
            },
            // 分页切换
            handleCurrentChange(val) {
                this.page = val;
                // 获取数据
                this.getListData();
            },
            // 修改单个状态
            async statusSubmit(index, row) {
                let params = {
                    ids: row.id,
                    status: 1 - row.status
                };
                const res = await this.$http.post(`mapadminPhotoStatus`, params);
                if (res === null) return;
                this.$message({
                    message: '状态修改成功',
                    type: 'success'
                });
                row.status = 1 - row.status;

            },
            //获取列表
            async getListData() {
                let params = {
                    page: this.page,
                    value: this.filters.value,
                    key: this.filters.key,
                    project_id: this.$route.params.id
                };
                this.listLoading = true;
                const res = await this.$http.post(`mapadminPhotoList`, params);
                this.listLoading = false;
                if (res === null) return;
                this.total = res.param.count;
                this.list = res.param.list;
            },
            //获取列表
            async getType() {
                const res = await this.$http.post(`mapadminPhotoArray`);
                if (res === null) return;
                this.options.types = res.param.type
            },
            //删除
            handleDel(index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(async () => {
                    this.listLoading = true;
                    let params = {ids: row.id, status: -1};
                    const res = await this.$http.post(`mapadminPhotoStatus`, params);
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
            //显示编辑界面
            async handleEdit(index, row) {
                this.editFormVisible = true;
                let params = {
                    id: row.id
                };
                const res = await this.$http.post(`mapadminPhotoEdit`, params);
                if (res === null) return;
                this.editForm = res.param.data;
                this.getType();
            },
            //显示新增界面
            async handleAdd() {
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    url: '',
                    type: '',
                    is_cover: '',
                    project_id: this.$route.params.id,
                };
            },
            //编辑
            editSubmit() {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(async () => {
                            this.editLoading = true;
                            let params = Object.assign({}, this.editForm);
                            const res = await this.$http.post(`mapadminPhotoEditsave`, params);
                            this.editLoading = false;
                            if (res === null) return;
                            this.$message({
                                message: res.info,
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
                            const res = await this.$http.post(`mapadminPhotoAddsave`, params);
                            this.addLoading = false;
                            if (res === null) return;
                            this.$message({
                                message: res.info,
                                type: 'success'
                            });
                            this.$refs['addForm'].resetFields();
                            this.addFormVisible = false;
                            this.getListData();
                        });
                    }
                });
            },
            selsChange(sels) {
                this.sels = sels;
            },
            batchAction(action) {
                // 三种操作：remove disable active
                let ids = this.sels.map(item => item.id).toString();
                const actions = {
                    'remove': {
                        tip: '删除',
                        api: `mapadminPhotoStatus`,
                        status: -1
                    },
                    'disable': {
                        tip: '停用',
                        api: `mapadminPhotoStatus`,
                        status: 0
                    },
                    'active': {
                        tip: '启用',
                        api: `mapadminPhotoStatus`,
                        status: 1
                    }
                };
                this.$confirm(`确认${actions[action].tip}选中记录吗？`, '提示', {
                    type: 'warning'
                }).then(async () => {
                    this.listLoading = true;
                    // 非批量删除，带上 status
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
            this.getType();
        },
        components: {
            'i-uploader': Uploader
        },
    }

</script>

<style lang="scss">
</style>