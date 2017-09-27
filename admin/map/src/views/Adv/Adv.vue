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
                    <el-button type="primary" icon="search" @click="getListData">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getListData">刷新</el-button>
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
            <el-table-column prop="ad_type" label="广告分类" width="120" sortable>
                <template scope="scope">
                    {{ advType[scope.row.ad_type].label }}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="广告名称" width="120" sortable>
            </el-table-column>
            <el-table-column prop="place" label="广告位置" min-width="120">
                <template scope="scope">
                    {{ place[scope.row.place].label }}
                </template>
            </el-table-column>
            <el-table-column prop="customer" label="客户名称" min-width="120">
            </el-table-column>
            <el-table-column prop="cover" label="封面图片" width="130">
                <template scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <div class="ad-img">
                            <img :src="scope.row.cove" :alt="scope.row.name" width="200" height="auto"
                                 v-if="scope.row.cove !== ''">
                            <p v-else>暂无图片</p>
                        </div>
                        <div slot="reference" class="name-wrapper">
                            <el-tag>查看图片</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="sort" label="排序" min-width="120">
            </el-table-column>
            <el-table-column prop="start_time" label="开始时间" width="180" :formatter="formateDate">
            </el-table-column>
            <el-table-column prop="end_time" label="结束时间" width="180" :formatter="formateDate">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
                <template scope="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : scope.row.status === -1 ? 'gray' : 'danger'">
                        {{ scope.row.status === 1 ? '可用' : scope.row.status === -1 ? '已删除' : '不可用' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="260" fixed="right">
                <template scope="scope">
                    <!--<el-button size="small" @click="statusSubmit(scope.$index, scope.row)"-->
                               <!--:disabled="scope.row.status === -1">-->
                        <!--{{ scope.row.status === 1 ? '停用' : scope.row.status === 0 ? '启用' : '已删除' }}-->
                    <!--</el-button>-->
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <!--<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>-->
                    <el-button size="small" @click="handleRedirect(scope.row,'规划参数')">规划参数</el-button>
                    <el-button size="small" @click="handleRedirect(scope.row,'楼盘相册')">楼盘相册</el-button>
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
        <el-dialog title="编辑" size="large" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
                <el-form-item label="广告名称" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="广告分类" prop="ad_type">
                    <el-select v-model.number="editForm.ad_type" placeholder="请选择">
                        <el-option
                                v-for="(item, index) in advTypeList"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="广告位置" prop="place">
                    <el-select v-model.number="editForm.place" placeholder="请选择">
                        <el-option
                                v-for="(item, index) in placeList"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="客户名称" prop="customer">
                    <el-input v-model.number="editForm.customer" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" prop="start_time">
                    <el-date-picker
                            v-model="editForm.start_time"
                            type="datetime"
                            placeholder="选择日期"
                            :picker-options="pickerStartOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="end_time">
                    <el-date-picker
                            v-model="editForm.end_time"
                            type="datetime"
                            placeholder="选择日期"
                            :picker-options="pickerEndOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="封面图片" prop="cove">
                    <i-uploader v-model="editForm.cove"></i-uploader>
                </el-form-item>
                <el-form-item label="封面图片" prop="link">
                    <i-uploader v-model="editForm.link"></i-uploader>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model.number="editForm.sort" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="handleEditCancel">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" size="large" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
                <el-form-item label="广告名称" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="广告分类" prop="ad_type">
                    <el-select v-model.number="addForm.ad_type" placeholder="请选择">
                        <el-option
                                v-for="(item, index) in advTypeList"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="广告位置" prop="place">
                    <el-select v-model.number="addForm.place" placeholder="请选择">
                        <el-option
                                v-for="(item, index) in placeList"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="客户名称" prop="customer">
                    <el-input v-model.number="addForm.customer" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" prop="start_time">
                    <el-date-picker
                            v-model="addForm.start_time"
                            type="datetime"
                            placeholder="选择日期"
                            :picker-options="pickerStartOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="end_time">
                    <el-date-picker
                            v-model="addForm.end_time"
                            type="datetime"
                            placeholder="选择日期"
                            :picker-options="pickerEndOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="封面图片" prop="cove">
                    <i-uploader v-model="addForm.cove"></i-uploader>
                </el-form-item>
                <el-form-item label="封面图片" prop="link">
                    <i-uploader v-model="addForm.link"></i-uploader>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model.number="addForm.sort" auto-complete="off"></el-input>
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
    import UE from '@/components/UEditor';
    import Uploader from '@/components/Uploader';

    export default {
        data() {

            return {
                filters: {
                    value: '',
                    key: 'zone_id',
                    options: [
                        {value: 'zone_id', label: '区域'},
                        {value: 'avg_price', label: '均价'},
                        {value: 'is_cooperation', label: '是否合作'}
                    ]
                },

                list: [],
                pickerStartOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                pickerEndOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                advType: {
                    1: {value: '1', label: '普通'},
                    2: {value: '2', label: '文字链广告'},
                },
                place: {
                    1: {value: '1', label: '首页'},
                    2: {value: '2', label: '搜索文件广告'},
                    99: {value: '99', label: '其它位置'},
                },
                advTypeList: [
                    {value: 1, label: '普通'},
                    {value: 2, label: '文字链广告'},
                ],
                placeList: [
                    {value: 1, label: '首页'},
                    {value: 2, label: '搜索文件广告'},
                    {value: 99, label: '其它位置'},
                ],
                value: '',
                options: {
                    sale_status: [
                        {value: 2, label: '在售'},
                        {value: 1, label: '未售'},
                    ],
                    metrostation_id: [],
                    see_open: [
                        {value: 2, label: '是'},
                        {value: 1, label: '否'},
                    ],
                    is_cooperation: [
                        {value: 1, label: '是'},
                        {value: 0, label: '否'},
                    ],
                },
                total: 0,
                page: 1,
                pagesize: 10,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    end_time: [
                        {type: 'date', required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    start_time: [
                        {type: 'date',required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    cover: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    link: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    place: [
                        {type: 'number',required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                },
                //编辑界面数据
                editForm: {
                    id: '',
                    name: '',
                    end_time: '',
                    start_time: '',
                    cove: '',
                    link: '',
                    place: '',
                    customer: '',
                    cid: '',
                    clicks: '',
                    status: '',
                    sort: '',
                    ad_type: '',

                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    end_time: [
                        {type: 'date', required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    start_time: [
                        {type: 'date',required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    cover: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    link: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    place: [
                        {type: 'number',required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                },
                //新增界面数据
                addForm: {
                    name: '',
                    end_time: '',
                    start_time: '',
                    cove: '',
                    link: '',
                    place: '',
                    customer: '',
                    sort: '',
                    ad_type: '',
                }
            }
        },
        methods: {
            handleAddChange(val) {
                this.getListPlate(val);
            },
            handleEditChange(val) {
                this.getListPlate(val);
            },
            handleRedirect(row, target) {
                this.$router.push({name: target, params: {id: row.id}})
            },
            locationSuccess(data) {
                console.log(data);
                const {lat, lng} = data.point;
                this.map.lat = lat;
                this.map.lng = lng;
            },
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
            async getListData() {
                this.listLoading = true;
                let params = {
                    page: this.page,
                    place: this.filters.place, // 可选参数查询
                };
                const res = await this.$http.post(`mapadminAdList`, params);
                this.listLoading = false;
                if (res === null) return;
                this.total = res.param.pages.total;
                this.pagesize = res.param.pages.pagesize;
                this.list = res.param.list;
            },
            //删除
            handleDel(index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(async () => {
                    let params = {
                        id: row.id,
                        status: -1
                    };

                    const res = await this.$http.post(`mapadminAdDelete`, params);
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
                    id: row.id
                };
                const res = await this.$http.post(`mapadminAdInfo`, params);
                if (res === null) return;
                this.editForm = Object.assign({}, res.param);
                this.editForm.place = Number(res.param.place);
                this.editForm.start_time = new Date(this.editForm.start_time * 1000);
                this.editForm.end_time = new Date(this.editForm.end_time * 1000);
            },
            //显示新增界面
            handleAdd() {
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    end_time: '',
                    start_time: '',
                    cove: '',
                    link: '',
                    place: '',
                    customer: '',
                    sort: '',
                    ad_type: '',
                };
            },
            //编辑
            editSubmit() {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(async () => {
                            this.editLoading = true;
                            // 处理时间为时间戳
                            let _start_time_ = this.editForm.start_time;
                            let _end_time_ = this.editForm.end_time;
                            console.log(_start_time_);
                            if(typeof this.editForm.start_time === 'number') {
                                _start_time_ = this.editForm.start_time / 1000
                            } else {
                                _start_time_ = new Date(this.editForm.start_time).getTime() / 1000
                            }
                            if(typeof this.editForm.end_time === 'number') {
                                _end_time_ = this.editForm.end_time / 1000
                            } else {
                                _end_time_ = new Date(this.editForm.end_time).getTime() / 1000
                            }
                            let params = Object.assign({}, this.editForm);
                            params.start_time = _start_time_; // 后台接收10位时间戳，需要转换
                            params.end_time = _end_time_; // 后台接收10位时间戳，需要转换
//                            params.detail = this.getUEContent('ueEdit'); // 富文本内容
                            const res = await this.$http.post(`mapadminAdUpdate`, params);
                            this.editLoading = false;
                            if (res === null) return;
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
// 处理时间为时间戳
                            let _start_time_ = this.addForm.start_time;
                            let _end_time_ = this.addForm.end_time;
                            if(typeof this.addForm.start_time === 'number') {
                                _start_time_ = this.addForm.start_time / 1000
                            } else {
                                _start_time_ = new Date(this.addForm.start_time).getTime() / 1000
                            }
                            if(typeof this.addForm.end_time === 'number') {
                                _end_time_ = this.addForm.end_time / 1000
                            } else {
                                _end_time_ = new Date(this.addForm.end_time).getTime() / 1000
                            }
                            let params = Object.assign({}, this.addForm);
                            params.start_time = _start_time_; // 后台接收10位时间戳，需要转换
                            params.end_time = _end_time_; // 后台接收10位时间戳，需要转换
//                            params.latitude = this.map.lat;
//                            params.longitude = this.map.lng;
//                            params.detail = this.getUEContent('ueAdd'); // 富文本内容
                            const res = await this.$http.post(`mapadminAdAdd`, params);
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
                    id: row.id,
                    status: 1 - row.status
                };

                const res = await this.$http.post(`mapadminAdStatus`, params);
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
//                mapadminAreaStatus
                // 三种操作：remove disable active
                let ids = this.sels.map(item => item.id).toString();
                const actions = {
                    'remove': {
                        tip: '删除',
                        api: `mapadminAdDelete`
                    },
                    'disable': {
                        tip: '停用',
                        api: `mapadminAdStatus`,
                        status: 0
                    },
                    'active': {
                        tip: '启用',
                        api: `mapadminAdStatus`,
                        status: 1
                    }
                };
                this.$confirm(`确认${actions[action].tip}选中记录吗？`, '提示', {
                    type: 'warning'
                }).then(async () => {
                    this.listLoading = true;
                    // 非批量删除，带上 status
                    let params = (action !== 'remove' ? Object.assign({
                        id: ids + '',
                        status: actions[action].status
                    }, params) : {id: ids + ''});
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
            UE,
            'i-uploader': Uploader
        },
    }

</script>

<style lang="scss">
</style>