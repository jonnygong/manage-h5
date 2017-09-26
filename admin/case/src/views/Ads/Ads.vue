<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-select v-model="filters.pid" placeholder="选择广告位置">
                        <el-option :label="position.title"
                                   :value="position.id"
                                   :key="position.id"
                                   v-for="(position, index) in filters.options"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getAds">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="ads" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="广告ID" width="100" sortable>
            </el-table-column>
            <el-table-column prop="name" label="名称" width="80">
            </el-table-column>
            <el-table-column prop="cover" label="头图" width="120">
                <template scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <div class="ad-img">
                            <img :src="scope.row.cover" :alt="scope.row.name" width="200" height="auto"
                                 v-if="scope.row.cover !== ''">
                            <p v-else>暂无广告头图</p>
                        </div>
                        <div slot="reference" class="name-wrapper">
                            <el-tag>查看广告头图</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="link" label="链接" min-width="130">
                <template scope="scope">
                    <a :href="scope.row.link" class="link" target="_blank">{{scope.row.link}}</a>
                </template>
            </el-table-column>
            <!--<el-table-column prop="paid" label="投放位置" width="100">-->
            <!--</el-table-column>-->
            <el-table-column label="投放时间" width="200" :formatter="formateDate">
            </el-table-column>
            <el-table-column label="创建时间" width="200" :formatter="formateCreateDate">
            </el-table-column>
            <el-table-column prop="click" label="点击量" width="80">
            </el-table-column>
            <el-table-column prop="status" label="活动状态" width="100">
                <template scope="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : scope.row.status === -1 ? 'gray' : 'danger'">
                        {{ scope.row.status === 1 ? '可用' : scope.row.status === -1 ? '已删除' : '不可用' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="sort" label="顺序" width="100" sortable>
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
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="广告ID" prop="id">
                    <el-input v-model="editForm.id" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="广告名称" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="广告链接" prop="link">
                    <el-input v-model="editForm.link" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="广告头图" prop="cover">
                    <el-upload
                            class="avatar-uploader"
                            action="https://api.kfw001.com/Caseadmin/img/upload"
                            :http-request="customEditUpload"
                            :show-file-list="false"
                            :before-upload="beforeImageUpload">
                        <img v-if="editForm.cover" :src="editForm.cover" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="广告位置" prop="paid">
                    <el-select v-model="editForm.paid" placeholder="选择广告位置">
                        <el-option :label="position.title"
                                   :value="position.id"
                                   :key="position.id"
                                   v-for="(position, index) in filters.options"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="投放时间">
                    <el-col :span="11">
                        <el-form-item prop="start_time">
                            <el-date-picker type="date"
                                            placeholder="选择开始日期"
                                            v-model.date="editForm.start_time"
                                            format="yyyy-MM-dd"
                                            style="width: 100%;"
                            ></el-date-picker>

                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="end_time">
                            <el-date-picker type="date"
                                            placeholder="选择结束 日期"
                                            v-model.date="editForm.end_time"
                                            format="yyyy-MM-dd"
                                            style="width: 100%;"
                            ></el-date-picker>

                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="点击量" prop="click">
                    <el-input v-model.number="editForm.click" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="广告顺序" prop="sort">
                    <el-input v-model.number="editForm.sort"></el-input>
                </el-form-item>
                <el-form-item label="活动状态" prop="status">
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
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="广告名称" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="广告链接" prop="link">
                    <el-input v-model="addForm.link" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="广告头图" prop="cover">
                    <!--<el-upload-->
                    <!--class="avatar-uploader"-->
                    <!--action="https://api.kfw001.com/Caseadmin/img/upload"-->
                    <!--:show-file-list="false"-->
                    <!--:on-success="handleNewImageSuccess"-->
                    <!--:before-upload="beforeImageUpload">-->
                    <!--<img v-if="addForm.cover" :src="addForm.cover" class="avatar">-->
                    <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                    <!--</el-upload>-->
                    <el-upload
                            class="avatar-uploader"
                            action="https://api.kfw001.com/Caseadmin/img/upload"
                            :http-request="customAddUpload"
                            :show-file-list="false"
                            :before-upload="beforeImageUpload">
                        <img v-if="addForm.cover" :src="addForm.cover" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="广告位置" prop="paid">
                    <el-select v-model="addForm.paid" placeholder="选择广告位置">
                        <el-option :label="position.title"
                                   :value="position.id"
                                   :key="position.id"
                                   v-for="(position, index) in filters.options"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="投放时间">
                    <el-col :span="11">
                        <el-form-item prop="start_time">
                            <el-date-picker type="date"
                                            placeholder="选择开始日期"
                                            v-model.date="addForm.start_time"
                                            format="yyyy-MM-dd"
                                            style="width: 100%;"
                            ></el-date-picker>

                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="end_time">
                            <el-date-picker type="date"
                                            placeholder="选择结束 日期"
                                            v-model.date="addForm.end_time"
                                            format="yyyy-MM-dd"
                                            style="width: 100%;"
                            ></el-date-picker>

                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="顺序" prop="sort">
                    <el-input v-model.number="addForm.sort"></el-input>
                </el-form-item>
                <!--<el-form-item label="活动状态" prop="status">-->
                <!--<el-select v-model.number="addForm.status" placeholder="请选择状态">-->
                <!--<el-option label="可用" :value="1"></el-option>-->
                <!--<el-option label="不可用" :value="0"></el-option>-->
                <!--<el-option label="已删除" :value="-1"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
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
                uploadHeaders: {
                    'Content-Type': 'multipart/form-data'
                },
                filters: {
                    options: [],
                    pid: ''
                },
                ads: [], // 列表
                total: 0,
                page: 1,
                pagesize: 0,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [{required: true, message: '请输入广告名称', trigger: 'blur'}],
                    cover: [{required: true, message: '请上传广告头图', trigger: 'blur'}],
                    link: [{required: true, message: '请输入广告链接', trigger: 'blur'}],
                    start_time: [{type: 'date', required: true, message: '请选择开始时间', trigger: 'blur'}],
                    end_time: [{type: 'date', required: true, message: '请选择结束时间', trigger: 'blur'}],
                    status: [{type: 'number',required: true, message: '请选择状态', trigger: 'blur'}],
                    paid: [{type: 'number', required: true, message: '请选择广告位置', trigger: 'blur'}],
                    sort: [{type: 'number', required: true, message: '请输入顺序', trigger: 'blur'}],
//                    click: [{type: 'number', required: true, message: '请输入点击量', trigger: 'blur'}]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    cover: '',
                    link: '',
                    sort: 0,
                    start_time: '',
                    end_time: '',
                    paid: '',
                    update_time: ''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [{required: true, message: '请输入广告名称', trigger: 'blur'}],
                    cover: [{required: true, message: '请上传广告头图', trigger: 'blur'}],
                    link: [{required: true, message: '请输入广告链接', trigger: 'blur'}],
                    start_time: [{type: 'date', required: true, message: '请选择开始时间', trigger: 'blur'}],
                    end_time: [{type: 'date', required: true, message: '请选择结束时间', trigger: 'blur'}],
                    status: [{required: true, message: '请选择状态', trigger: 'blur'}],
                    paid: [{type: 'number', required: true, message: '请选择广告位置', trigger: 'blur'}],
                    sort: [{type: 'number', required: true, message: '请输入顺序', trigger: 'blur'}]
                },
                //新增界面数据
                addForm: {
                    name: '',
                    cover: '',
                    link: '',
                    start_time: '',
                    end_time: '',
                    paid: '',
                    sort: ''
                }

            }
        },
        methods: {
            // 格式化投放时间
            formateDate(row, column) {
                return ` ${util.formatDate.format(new Date(row.start_time * 1000), 'yyyy-MM-dd')} - ${util.formatDate.format(new Date(row.end_time * 1000), 'yyyy-MM-dd')}`
            },
            formateCreateDate(row, column) {
                return ` ${util.formatDate.format(new Date(row.create_time * 1000), 'yyyy-MM-dd hh:mm:ss')}`
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
            // 分页
            handleCurrentChange(val) {
                this.page = val;
                this.getAds();
            },
            //获取用户列表
            getAds() {
                this.listLoading = true;
                let para = {
                    page: this.page,
                    pid: this.filters.pid
                };
                this.listLoading = true;
                api.getAds(para).then((res) => {
                    this.listLoading = false;
                    if (res.data.status === 200) {
                        this.total = res.data.param.pages.total;
                        this.pagesize = res.data.param.pages.pagesize;
                        this.ads = res.data.param.list;
                    }
                });
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let para = {id: row.id};

                    api.deleteAds(para).then((res)=> {
                        if (res.data.status === 200) {
                            this.listLoading = false;
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getAds();
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
                api.getAdsDetail(param)
                    .then((res) => {
                        if (res.data.status === 200) {
                            this.editForm = Object.assign({}, res.data.param);
                            this.editForm.start_time = new Date(this.editForm.start_time * 1000);
                            this.editForm.end_time = new Date(this.editForm.end_time * 1000);
                            this.editForm.update_time = new Date(this.editForm.update_time * 1000);
                        }
                    });
            },
            //显示新增界面
            handleAdd() {
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    cover: '',
                    link: '',
                    start_time: '',
                    end_time: '',
                    paid: '',
                    sort: ''
                };
            },
            //编辑
            editSubmit() {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            // 处理时间为时间戳
                            let _start_time = this.editForm.start_time;
                            let _end_time = this.editForm.end_time;
                            if(typeof this.editForm.start_time === 'number') {
                                _start_time = this.editForm.start_time / 1000
                            } else {
                                _start_time = new Date(this.editForm.start_time).getTime() / 1000
                            }
                            if(typeof this.editForm.end_time === 'number') {
                                _end_time = this.editForm.end_time / 1000
                            } else {
                                _end_time = new Date(this.editForm.end_time).getTime() / 1000
                            }
                            let params = {
                                id: this.editForm.id,
                                name: this.editForm.name,
                                cover: this.editForm.cover,
                                link: this.editForm.link,
                                click: this.editForm.click,
                                start_time: _start_time, // 后台接收10位时间戳，需要转换
                                end_time: _end_time,// 后台接收10位时间戳，需要转换
                                status: this.editForm.status,
                                paid: this.editForm.paid,
                                sort: this.editForm.sort
                            };
                            api.editAds(params)
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
                                        this.getAds();
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
//                            let para = Object.assign({}, this.addForm);
                            let params = {
                                name: this.addForm.name,
                                cover: this.addForm.cover,
                                link: this.addForm.link,
                                start_time: new Date(this.addForm.start_time).getTime() / 1000,
                                end_time: new Date(this.addForm.end_time).getTime() / 1000,
                                paid: this.addForm.paid,
                                sort: this.addForm.sort
                            };
                            
                            api.addAds(params)
                                .then((res) => {

                                this.addLoading = false;
                                if (res.data.status === 200) {
                                    this.$message({
                                        message: res.data.info,
                                        type: 'success'
                                    });

                                    this.$refs['addForm'].resetFields();
                                    this.addFormVisible = false;
                                    this.getAds();

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
            batchRemove() {
                var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {ids: ids};
                    batchRemoveUser(para).then((res) => {
                        this.listLoading = false;
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getAds();
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
            /**
             * 统一上传接口
             * @param file 接收文件对象
             * @param type 区分新增和删除， this.addForm 和 this.editForm
             * @private
             */
            _uploadImage(file, type) {
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
                                type.cover = res.data.param.path;
                            }
                        })
                };
            },


            // 获取广告位信息，用于查询数据
            getAdPosition() {
                api.getAdspaceSelect().then((res) => {

                        let select = [];

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
                        this.filters.options = select.slice(0);

                    })
            }
        },
        mounted() {
            this.getAds();
            this.getAdPosition();
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