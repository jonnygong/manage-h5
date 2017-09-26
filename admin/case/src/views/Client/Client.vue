<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <!--<el-form-item>-->
                <!--<el-input v-model="filters.status" placeholder="请输入客户状态"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item>
                    <el-button type="primary" v-on:click="getSources">刷新</el-button>
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
            <el-table-column prop="title" label="标题" min-width="120">
            </el-table-column>
            <el-table-column prop="update_time" label="更新时间" width="200" :formatter="formateDate">
            </el-table-column>
            <el-table-column prop="clicks" label="访问次数" width="130" sortable>
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
                    <el-button size="small" @click="statusSubmit(scope.$index, scope.row)" :disabled="scope.row.status === -1">{{ scope.row.status === 1 ? '停用' : scope.row.status === 0 ? '启用' : '已删除' }}</el-button>
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
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false" :before-close="destroyEditEditor">
            <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
                <el-form-item label="客户ID" prop="id">
                    <el-input v-model="editForm.id" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="客户姓名" prop="title">
                    <el-input v-model="editForm.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="客户logo" prop="cover">
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
                <el-form-item label="客户二维码" prop="code_qr">
                    <el-upload
                            class="avatar-uploader"
                            action="https://api.kfw001.com/Caseadmin/img/upload"
                            :http-request="customEditCode"
                            :show-file-list="false"
                            :before-upload="beforeImageUpload">
                        <img v-if="editForm.code_qr" :src="editForm.code_qr" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="摘要信息" prop="tips">
                    <el-input type="textarea" v-model="editForm.tips"></el-input>
                </el-form-item>
                <el-form-item label="详细介绍" prop="content">
                        <UE :defaultMsg=editForm.content :config=ueditor.config  ref="ueEdit"></UE>
                </el-form-item>
                <el-form-item label="访问次数" prop="clicks">
                    <el-input v-model.number="editForm.clicks" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model.number="editForm.sort" auto-complete="off"></el-input>
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
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false" :before-close="destroyAddEditor">
            <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
                <el-form-item label="客户名称" prop="title">
                    <el-input v-model="addForm.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="摘要信息" prop="tips">
                    <el-input type="textarea" v-model="addForm.tips"></el-input>
                </el-form-item>
                <el-form-item label="详细信息" prop="content">
                        <UE :defaultMsg=addForm.content :config=ueditor.config ref="ueAdd"></UE>
                </el-form-item>
                <el-form-item label="客户logo" prop="cover">
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
                <el-form-item label="客户二维码" prop="code_qr">
                    <el-upload
                            class="avatar-uploader"
                            action="https://api.kfw001.com/Caseadmin/img/upload"
                            :http-request="customAddCode"
                            :show-file-list="false"
                            :before-upload="beforeImageUpload">
                        <img v-if="addForm.code_qr" :src="addForm.code_qr" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="访问次数" prop="clicks">
                    <el-input v-model.number="addForm.clicks" auto-complete="off"></el-input>
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
    import util from '@/common/js/util'
    import UE from '@/components/UEditor/UEditor.vue';
    import api from '@/api'

    export default {
        data() {
            var validateAddContent = (rule, value, callback) => {
                value = this.$refs['ueAdd'].getUEContent();
                if (value === '') {
                    callback(new Error('请输入内容'));
                } else {
                    callback();
                }
            };
            var validateEditContent = (rule, value, callback) => {
                value = this.$refs['ueEdit'].getUEContent();
                if (value === '') {
                    callback(new Error('请输入内容'));
                } else {
                    callback();
                }
            };
            return {
                ueditor: {
                    config: {
                        initialFrameWidth: null,
                        initialFrameHeight: 350,
                        toolbars: [
                            [
                                'anchor', //锚点
                                'undo', //撤销
                                'redo', //重做
                                'bold', //加粗
                                'indent', //首行缩进
                                'snapscreen', //截图
                                'italic', //斜体
                                'underline', //下划线
                                'strikethrough', //删除线
                                'subscript', //下标
                                'fontborder', //字符边框
                                'superscript', //上标
                                'formatmatch', //格式刷
                                'source', //源代码
                                'blockquote', //引用
                                'pasteplain', //纯文本粘贴模式
                                'selectall', //全选
                                'print', //打印
                                'preview', //预览
                                'horizontal', //分隔线
                                'removeformat', //清除格式
                                'time', //时间
                                'date', //日期
                                'unlink', //取消链接
                                'insertrow', //前插入行
                                'insertcol', //前插入列
                                'mergeright', //右合并单元格
                                'mergedown', //下合并单元格
                                'deleterow', //删除行
                                'deletecol', //删除列
                                'splittorows', //拆分成行
                                'splittocols', //拆分成列
                                'splittocells', //完全拆分单元格
                                'deletecaption', //删除表格标题
                                'inserttitle', //插入标题
                                'mergecells', //合并多个单元格
                                'deletetable', //删除表格
                                'cleardoc', //清空文档
                                'insertparagraphbeforetable', //"表格前插入行"
                                'insertcode', //代码语言
                                'fontfamily', //字体
                                'fontsize', //字号
                                'paragraph', //段落格式
//                            'simpleupload', //单图上传
                                'insertimage', //多图上传
                                'edittable', //表格属性
                                'edittd', //单元格属性
                                'link', //超链接
                                'emotion', //表情
                                'spechars', //特殊字符
                                'searchreplace', //查询替换
//                            'map', //Baidu地图
//                            'gmap', //Google地图
//                            'insertvideo', //视频
                                'help', //帮助
                                'justifyleft', //居左对齐
                                'justifyright', //居右对齐
                                'justifycenter', //居中对齐
                                'justifyjustify', //两端对齐
                                'forecolor', //字体颜色
                                'backcolor', //背景色
                                'insertorderedlist', //有序列表
                                'insertunorderedlist', //无序列表
//                            'fullscreen', //全屏
                                'directionalityltr', //从左向右输入
                                'directionalityrtl', //从右向左输入
                                'rowspacingtop', //段前距
                                'rowspacingbottom', //段后距
                                'pagebreak', //分页
//                            'insertframe', //插入Iframe
                                'imagenone', //默认
                                'imageleft', //左浮动
                                'imageright', //右浮动
//                            'attachment', //附件
                                'imagecenter', //居中
                                'wordimage', //图片转存
                                'lineheight', //行间距
                                'edittip ', //编辑提示
                                'customstyle', //自定义标题
                                'autotypeset', //自动排版
//                            'webapp', //百度应用
                                'touppercase', //字母大写
                                'tolowercase', //字母小写
                                'background', //背景
                                'template', //模板
//                            'scrawl', //涂鸦
//                            'music', //音乐
                                'inserttable', //插入表格
                                'drafts', // 从草稿箱加载
                                'charts', // 图表
                            ]
                        ],
                        zIndex: 9999 // 修复工具栏弹框无法显示的问题
                    }
                },
                filters: {
//                    status: 1
                },
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
                    cover: [
                        {required: true, message: '请上传客户logo', trigger: 'blur'}
                    ],
//                    code_qr: [
//                        {required: true, message: '请上传客户二维码', trigger: 'blur'}
//                    ],
                    content: [
                        { validator: validateEditContent, trigger: 'blur' }
                    ],
                    tips: [
                        {required: true, message: '请输入摘要信息', trigger: 'blur'}
                    ],
                    clicks: [
                        {type: 'number', required: true, message: '请输入访问量', trigger: 'blur'}
                    ],
                    sort: [
                        {type: 'number', required: true, message: '请输入顺序', trigger: 'blur'}
                    ],
                    status: [
                        {type: 'number', required: true, message: '请输入顺序', trigger: 'blur'}
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    title: '',
                    update_time: '',
                    clicks: 0,
                    tips: '',
                    content: '',
                    cover: '',
                    code_qr: '',
                    sort: 0,
                    status: 0,
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    title: [
                        {required: true, message: '请输入客户名称', trigger: 'blur'}
                    ],
                    tips: [
                        {required: true, message: '请输入摘要信息', trigger: 'blur'}
                    ],
                    content: [
                        { validator: validateAddContent, trigger: 'blur' }
                    ],
                    cover: [
                        {required: true, message: '请上传客户logo', trigger: 'blur'}
                    ],
//                    code_qr: [
//                        {required: true, message: '请上传客户二维码', trigger: 'blur'}
//                    ],
                    clicks: [
                        {type: 'number', required: true, message: '请输入访问次数', trigger: 'blur'}
                    ],
                    sort: [
                        {type: 'number', required: true, message: '请输入排序', trigger: 'blur'}
                    ]
                },
                //新增界面数据
                addForm: {
                    title: '',
                    tips: '',
                    content: '',
                    cover: '',
                    code_qr: '',
                    clicks: 0,
                    sort: 0
                }

            }
        },
        components: {
            UE
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
                this.getSources();
            },
            //获列表
            getSources() {
                this.listLoading = true;
                let para = {
                    page: this.page,
//                    status: this.filters.status // 可选参数查询
                };

                api.getSourceList(para).then((res) => {
                    this.listLoading = false;
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

                    api.delSource(para).then((res) => {
                        if (res.data.status === 200) {
                            this.listLoading = false;
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getSources();
                        }
                    })


                }).catch(() => {

                });
            },
            handleAddCancel() {
                this.addFormVisible = false;
                this.destroyAddEditor();
            },
            handleEditCancel() {
                this.editFormVisible = false;
                this.destroyEditEditor();
            },
            //显示编辑界面
            handleEdit(index, row) {
                this.editFormVisible = true;
                let param = {
                    id: row.id
                };
                api.getSourceDetail(param)
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
                    tips: '',
                    content: '',
                    cover: '',
                    qr_code: '',
                    clicks: 0,
                    sort: 0
                };
            },
            //编辑
            editSubmit() {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let params = {
                                id: this.editForm.id,
                                title: this.editForm.title,
                                cover: this.editForm.cover,
                                code_qr: this.editForm.code_qr,
                                clicks: this.editForm.clicks,
                                tips: this.editForm.tips,
                                content: this.getUEContent('ueEdit'), // 富文本内容
                                sort: this.editForm.sort,
                                status: this.editForm.status
                            };
                            api.editSource(params)
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
                                        this.getSources();
                                    }
                                });
                        });
                    }
                });
                this.destroyEditEditor();
            },
            //新增
            addSubmit() {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;

                            let para = Object.assign({}, this.addForm);
                            para.content = this.getUEContent('ueAdd');
                            api.addSource(para)
                                .then((res) => {
                                    if (res.data.status === 200) {
                                        this.addLoading = false;
                                        this.$message({
                                            message: '新建成功',
                                            type: 'success'
                                        });
                                        this.$refs['addForm'].resetFields();
                                        this.addFormVisible = false;
                                        this.getSources();
                                    }
                                });
                        });
                    }
                });
                this.destroyAddEditor();
            },
            // 修改客户状态
            statusSubmit(index, row) {
                let param = {
                    id: row.id,
                    status: 1 - row.status
                };
                api.changeSourceState(param)
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
                this._uploadImage(file, this.addForm, 'cover')
            },
            // 处理编辑页面上传
            customEditUpload(file) {
                this._uploadImage(file, this.editForm, 'cover')
            },
            // 处理新增页面上传二维码
            customAddCode(file) {
                this._uploadImage(file, this.addForm, 'code_qr')
            },
            // 处理编辑页面上传二维码
            customEditCode(file) {
                this._uploadImage(file, this.editForm, 'code_qr')
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
            },
            // Ueditor 获取内容
            getUEContent(ele) {
                return this.$refs[ele].getUEContent();
            },
            destroyAddEditor(done) {
                this.addForm.content = this.getUEContent('ueAdd');
                if(typeof done === 'function') {
                    done();
                }
            },
            destroyEditEditor(done) {
                this.editForm.content = this.getUEContent('ueEdit');
                if(typeof done === 'function') {
                    done();
                }

            }
        },
        mounted() {
            this.getSources();
        }
    }

</script>

<style lang="scss">
    @import "Client";
</style>