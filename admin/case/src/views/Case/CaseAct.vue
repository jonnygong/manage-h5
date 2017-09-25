<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="primary" @click="getCase">刷新</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="caseList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="80" sortable>
            </el-table-column>
            <el-table-column prop="title" label="标题" min-width="100">
            </el-table-column>
            <el-table-column prop="cover" label="缩略图" width="120">
                <template scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <div class="ad-img">
                            <img :src="scope.row.cover" :alt="scope.row.title" width="200" height="auto"
                                 v-if="scope.row.cover !== ''">
                            <p v-else>暂无缩略图</p>
                        </div>
                        <div slot="reference" class="name-wrapper">
                            <el-tag>查看缩略图</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="update_time" label="更新时间" width="200" :formatter="formateDate">
            </el-table-column>
            <el-table-column prop="clicks" label="阅读量" width="100" sortable>
            </el-table-column>
            <!--<el-table-column prop="status" label="状态" width="100">-->
            <!--<template scope="scope">-->
            <!--<el-tag :type="scope.row.status === 1 ? 'success' : scope.row.status === -1 ? 'gray' : 'danger'">-->
            <!--{{ scope.row.status === 1 ? '可用' : scope.row.status === -1 ? '已删除' : '不可用' }}-->
            <!--</el-tag>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="sort" label="排序" width="100" sortable>
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
                <el-form-item label="标题" prop="title">
                    <el-input v-model="editForm.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片" prop="cover">
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
                <el-form-item label="详情" prop="content">
                    <UE :defaultMsg=editForm.content :config=ueditor.config  ref="ueEdit"></UE>
                </el-form-item>
                <el-form-item label="摘要" prop="tips">
                    <el-input type="textarea" v-model="editForm.tips"></el-input>
                </el-form-item>
                <el-form-item label="相册" prop="cover">
                    <!-- 图片批量上传 -->
                    <el-upload
                            class="upload-demo"
                            action="https://api.kfw001.com/Caseadmin/img/upload"
                            :on-remove="handleEditRemove"
                            :http-request="customEditMutiUpload"
                            :file-list="editForm.images"
                            list-type="picture"
                            :multiple="true">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-col :span="11">
                        <el-form-item prop="start_time">
                            <el-date-picker type="date"
                                            placeholder="选择开始日期"
                                            v-model.date="editForm.active_start_time"
                                            format="yyyy-MM-dd"
                                            style="width: 100%;"
                            ></el-date-picker>

                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="end_time">
                            <el-date-picker type="date"
                                            placeholder="选择结束日期"
                                            v-model.date="editForm.active_end_time"
                                            format="yyyy-MM-dd"
                                            style="width: 100%;"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="点击量" prop="tips">
                    <el-input v-model="editForm.clicks" auto-complete="off" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="活动地址" prop="tips">
                    <el-input v-model="editForm.url" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否可点击" prop="isclick">
                    <el-select v-model.number="editForm.isclick" placeholder="选择链接点击权限">
                        <el-option label="可点击" :value="1"></el-option>
                        <el-option label="不可点击" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="技术参与者" prop="tips">
                    <el-input v-model="editForm.it_member" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属客户" prop="tips">
                    <el-select v-model.number="editForm.sid" placeholder="选择所属客户">
                        <el-option :label="source.title"
                                   :value="source.id"
                                   v-for="(source, index) in sourceList"
                                   :key="source.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商务对接人" prop="tips">
                    <el-input v-model="editForm.bm_member" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="商务类别" prop="tips">
                    <el-select v-model.number="editForm.bmtype" placeholder="选择商务类别">
                        <el-option :label="type.name"
                                   :value="type.id"
                                   :key="type.id"
                                   v-for="(type, index) in bmtype"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="案例分类" prop="pid">
                    <el-select v-model.number="editForm.cid" placeholder="选择案例分类">
                        <el-option :label="cate.title"
                                   :value="cate.id"
                                   v-for="(cate, index) in caseCategory"
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
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false" :before-close="destroyAddEditor">
            <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="addForm.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片" prop="cover">
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
                <el-form-item label="详情" prop="content">
                    <UE :defaultMsg=addForm.content :config=ueditor.config ref="ueAdd"></UE>
                </el-form-item>
                <el-form-item label="摘要" prop="tips">
                    <el-input type="textarea" v-model="addForm.tips"></el-input>
                </el-form-item>
                <el-form-item label="相册" prop="images">
                    <!-- 图片批量上传 -->
                    <el-upload
                            class="upload-demo"
                            action="https://api.kfw001.com/Caseadmin/img/upload"
                            :on-remove="handleRemove"
                            :http-request="customAddMutiUpload"
                            :file-list="addForm.images"
                            list-type="picture"
                            :multiple="true">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-col :span="11">
                        <el-form-item prop="active_start_time">
                            <el-date-picker type="date"
                                            placeholder="选择开始日期"
                                            v-model.date="addForm.active_start_time"
                                            format="yyyy-MM-dd"
                                            style="width: 100%;"
                            ></el-date-picker>

                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="active_end_time">
                            <el-date-picker type="date"
                                            placeholder="选择结束日期"
                                            v-model.date="addForm.active_end_time"
                                            format="yyyy-MM-dd"
                                            style="width: 100%;"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <!--<el-form-item label="点击量" prop="clicks">-->
                    <!--<el-input v-model="addForm.clicks" auto-complete="off"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="活动地址" prop="url">
                    <el-input v-model="addForm.url" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否可点击" prop="isclick">
                    <el-select v-model.number="addForm.isclick" placeholder="选择链接点击权限">
                        <el-option label="可点击" :value="1"></el-option>
                        <el-option label="不可点击" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="技术参与者" prop="it_member">
                    <el-input v-model="addForm.it_member" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属客户" prop="sid">
                    <el-select v-model.number="addForm.sid" placeholder="选择所属客户">
                        <el-option :label="source.title"
                                   :value="source.id"
                                   v-for="(source, index) in sourceList"
                                   :key="source.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商务对接人" prop="bm_member">
                    <el-input v-model="addForm.bm_member" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="商务类别" prop="bmtype">
                    <el-select v-model.number="addForm.bmtype" placeholder="选择商务类别">
                        <el-option :label="type.name"
                                   :value="type.id"
                                   :key="type.id"
                                   v-for="(type, index) in bmtype"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="案例分类" prop="cid">
                    <el-select v-model.number="addForm.cid" placeholder="选择案例分类">
                        <el-option :label="cate.title"
                                   :value="cate.id"
                                   v-for="(cate, index) in caseCategory"
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
                caseList: [],
                caseCategory: [],
                sourceList: [],
                bmtype: [
                    {
                        name: '房产',
                        id: 1
                    },
                    {
                        name: '新媒体',
                        id: 2
                    },
                    {
                        name: '其他',
                        id: 3
                    }
                ],
                total: 0,
                page: 1,
                pagesize: 0,
                listLoading: false,
                sels: [],//列表选中

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    title: [
                        {required: true, message: '请输入案例标题', trigger: 'blur'}
                    ],
                    content: [
                        { validator: validateEditContent, trigger: 'blur' }
                    ],
                    tips: [
                        {required: true, message: '请输入案例摘要', trigger: 'blur'}
                    ],
                    status: [
                        {type: 'number', required: true, message: '请选择状态', trigger: 'blur'}
                    ],
                    isclick: [
                        {type: 'number', required: true, message: '请选择链接点击权限', trigger: 'blur'}
                    ],
                    cid: [
                        {type: 'number',required: true, message: '请选择所属客户', trigger: 'blur'}
                    ],
                    cover: [
                        {required: true, message: '请上传图片', trigger: 'blur'}
                    ],
                    active_start_time: [
                        {required: true, message: '请选择开始时间', trigger: 'blur'}
                    ],
                    active_end_time: [
                        {required: true, message: '请选择结束时间', trigger: 'blur'}
                    ],
//                    clicks: [
//                        {type: 'number',required: true, message: '请输入点击量', trigger: 'blur'}
//                    ],
                    images: [
                        {type: 'array', required: true, message: '请上传相册', trigger: 'blur'}
                    ],
                    url: [
                        {required: true, message: '请输入活动地址', trigger: 'blur'}
                    ],
                    it_member: [
                        { required: true, message: '请输入技术参与者', trigger: 'blur'}
                    ],
                    sid: [
                        {type: 'number',required: true, message: '请选择所属客户', trigger: 'blur'}
                    ],
                    bm_member: [
                        {required: true, message: '请输入商务对接人', trigger: 'blur'}
                    ],
                    bmtype: [
                        {type: 'number',required: true, message: '请选择商务类别', trigger: 'blur'}
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    title: '',
                    content: '',
                    tips: '',
                    status: '',
                    cid: '', // 从案例分类拿取列表
                    cover: '',
                    active_start_time: '',
                    active_end_time: '',
                    clicks: '',
                    images: [],
                    url: '',
                    isclick: '',
                    it_member: '',
                    sid: '', // 从客户拿取列表
                    bm_member: '',
                    update_time: '',
                    bmtype: 1 // 商务类别1房产2新媒体3其他
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    title: [
                        {required: true, message: '请输入案例标题', trigger: 'blur'}
                    ],
                    content: [
                        { validator: validateAddContent, trigger: 'blur' }
                    ],
                    tips: [
                        {required: true, message: '请输入案例摘要', trigger: 'blur'}
                    ],
                    isclick: [
                        {type: 'number', required: true, message: '请选择链接点击权限', trigger: 'blur'}
                    ],
                    status: [
                        {type: 'number', required: true, message: '请选择状态', trigger: 'blur'}
                    ],
                    cid: [
                        {type: 'number',required: true, message: '请选择所属客户', trigger: 'blur'}
                    ],
                    cover: [
                        {required: true, message: '请上传图片', trigger: 'blur'}
                    ],
                    active_start_time: [
                        {type: 'date',required: true, message: '请选择开始时间', trigger: 'blur'}
                    ],
                    active_end_time: [
                        {type: 'date',required: true, message: '请选择结束时间', trigger: 'blur'}
                    ],
//                    clicks: [
//                        {type: 'number',required: true, message: '请输入点击量', trigger: 'blur'}
//                    ],
                    images: [
                        {type: 'array', required: true, message: '请上传相册', trigger: 'blur'}
                    ],
                    url: [
                        {required: true, message: '请输入活动地址', trigger: 'blur'}
                    ],
                    it_member: [
                        { required: true, message: '请输入技术参与者', trigger: 'blur'}
                    ],
                    sid: [
                        {type: 'number',required: true, message: '请选择所属客户', trigger: 'blur'}
                    ],
                    bm_member: [
                        {required: true, message: '请输入商务对接人', trigger: 'blur'}
                    ],
                    bmtype: [
                        {type: 'number',required: true, message: '请选择商务类别', trigger: 'blur'}
                    ]
                },
                //新增界面数据
                addForm: {
                    title: '',
                    content: '',
                    tips: '',
                    status: '',
                    cid: '', // 从案例分类拿取列表
                    cover: '',
                    isclick: '',
                    active_start_time: '',
                    active_end_time: '',
//                    clicks: '',
                    images: [],
                    url: '',
                    it_member: '',
                    sid: '', // 从客户拿取列表
                    bm_member: '',
                    bmtype: 1 // 商务类别1房产2新媒体3其他
                }
            }
        },
        components: {
            UE
        },
        methods: {
            // 格式化创建时间
            formateDate(row, column) {
                return util.formatDate.format(new Date(row.update_time * 1000), 'yyyy-MM-dd hh:mm:ss')
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getCase();
            },
            // 获取广告位置列表
            getCase() {
                let para = {
                    // todo 根据案例分类查询内容
//                    cid: 0, // 案例分类
                    page: this.page
                };
                this.listLoading = true;
                api.getActList(para).then((res) => {
                    this.listLoading = false;
                    if (res.data.status === 200) {
                        this.total = res.data.param.pages.total;
                        this.pagesize = res.data.param.pages.pagesize;
                        this.caseList = res.data.param.list;
                    }
                });
            },
            // 获取分类
            getCaseCategory() {

                api.getCategorySelect()
                    .then((res) => {

                        let select = [];

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
                        this.caseCategory = select.slice(0);

                    })
            },
            // 获取
            getSource() {

                api.getSourceSelect()
                    .then((res) => {
                        if (res.data.status === 200) {
                            this.sourceList = res.data.param
                        }
                    })
            },
            // 删除
            handleDel(index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let para = {id: row.id};
                    api.delAct(para).then((res) => {
                        this.listLoading = false;
                        if (res.data.status === 200) {
                            this.$message({
                                message: res.data.info,
                                type: 'success'
                            });
                            this.getCase();
                        }
                    });
                }).catch(() => {

                });
            },
            // 显示编辑界面
            handleEdit(index, row) {
                this.editFormVisible = true;
                let param = {
                    id: row.id
                };
                api.getActDetail(param)
                    .then((res) => {
                        if (res.data.status === 200) {
                            this.editForm = Object.assign({}, res.data.param);
                            let _images = this.editForm.images.split(',');
                            let _imageList = [];
                            _images.forEach((item, index) => {
                                let _url = item.split('/');
                                _imageList.push({
//                                    uid: new Date().getTime(),
                                    name: _url[_url.length - 1],
                                    url: item
                                })
                            });
                            this.editForm.images = _imageList.slice();
                            this.editForm.active_start_time = new Date(this.editForm.active_start_time * 1000);
                            this.editForm.active_end_time = new Date(this.editForm.active_end_time * 1000);
                            this.editForm.update_time = new Date(this.editForm.update_time * 1000);
                        }
                    });
            },
            //显示新增界面
            handleAdd() {
                this.addFormVisible = true;
                this.addForm = {
                    title: '',
                    content: '',
                    tips: '',
                    status: '',
                    cid: '', // 从案例分类拿取列表
                    cover: '',
                    isclick: '',
                    active_start_time: '',
                    active_end_time: '',
//                    clicks: '',
                    images: [],
                    url: '',
                    it_member: '',
                    sid: '', // 从客户拿取列表
                    bm_member: '',
                    bmtype: 1 // 商务类别1房产2新媒体3其他
                };
            },
            //编辑
            editSubmit() {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let para = Object.assign({}, this.editForm);
                            // 处理相册字段上传格式为 <http://xx , http://xx >
                            let _images = [];
                            this.editForm.images.forEach((item, index) => {
                                _images.push(item.url)
                            });
                            para.images = _images + '';
                            // 处理时间，转换为 时间戳
                            let _active_start_time = this.editForm.active_start_time;
                            let _active_end_time = this.editForm.active_end_time;
                            if (typeof this.editForm.active_start_time === 'number') {
                                _active_start_time = this.editForm.active_start_time / 1000
                            } else {
                                _active_start_time = new Date(this.editForm.active_start_time).getTime() / 1000
                            }
                            if (typeof this.editForm.active_end_time === 'number') {
                                _active_end_time = this.editForm.active_end_time / 1000
                            } else {
                                _active_end_time = new Date(this.editForm.active_end_time).getTime() / 1000
                            }
                            para.active_start_time = _active_start_time;
                            para.active_end_time = _active_end_time;
                            api.editAct(para)
                                .then((res) => {
                                    this.editLoading = false;
                                    if (res.data.status === 200) {
                                        this.$message({
                                            message: res.data.info,
                                            type: 'success'
                                        });
                                        this.$refs['editForm'].resetFields();
                                        this.editFormVisible = false;
                                        this.getCase();
                                    }
                                })
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

                            // 处理相册字段上传格式为 <http://xx , http://xx >
                            let _images = [];
                            this.addForm.images.forEach((item, index) => {
                                _images.push(item.url)
                            });

                            let para = Object.assign({}, this.addForm);
                            para.images = _images + '';
                            para.active_start_time = new Date(this.addForm.active_start_time).getTime() / 1000;
                            para.active_end_time = new Date(this.addForm.active_end_time).getTime() / 1000;

                            api.addAct(para)
                                .then((res) => {
                                    this.addLoading = false;
                                    if (res.data.status === 200) {
                                        this.$message({
                                            message: res.data.info,
                                            type: 'success'
                                        });
                                        this.$refs['addForm'].resetFields();
                                        this.addFormVisible = false;
                                        this.getCase();
                                    }
                                })

                        });
                    }
                });
                this.destroyAddEditor();
            },
            statusSubmit (index, row) {
                let param = {
                    id: row.id,
                    status: 1 - row.status
                };
                api.changeActState(param)
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
                        this.getCase();
                    });
                }).catch(() => {

                });
            },
            // 相册上传移除
            // 相册上传删除
            handleRemove(file, fileList) {
                let _this = this;
                // 移除预览列表的同时，删除相关联的文件列表数组
                this.editForm.images.forEach((item, index) => {
                    if (item.name === file.name) {
                        _this.addForm.images.splice(index, 1)
                    }
                });
            },
            handleEditRemove(file, fileList) {
                let _this = this;
                // 移除预览列表的同时，删除相关联的文件列表数组
                this.editForm.images.forEach((item, index) => {
                    if (item.name === file.name) {
                        _this.editForm.images.splice(index, 1)
                    }
                });
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
            // 处理新增页面上传
            customAddUpload(file) {
                this._uploadImage(file, this.addForm)
            },
            // 处理编辑页面上传
            customEditUpload(file) {
                this._uploadImage(file, this.editForm)
            },
            // 新增页面 批量上传图片
            customAddMutiUpload(file) {
                this._uploadMutiImage(file, this.addForm)
            },
            // 编辑页面 批量上传图片
            customEditMutiUpload(file) {
                this._uploadMutiImage(file, this.editForm)
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
            _uploadMutiImage(file, type) {
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
                                type.images.push({
                                    name: file.file.name,
                                    status: 'success',
                                    uid: new Date().getTime(),
                                    url: res.data.param.path
                                });
                            }
                        })
                };
            },
            // Ueditor 获取内容
            getUEContent(ele) {
                return this.$refs[ele].getUEContent();
            },
            destroyAddEditor (done) {
                this.addForm.content = this.getUEContent('ueAdd');
                if(typeof done === 'function') {
                    done();
                }
            },
            destroyEditEditor (done) {
                this.editForm.content = this.getUEContent('ueEdit');
                if(typeof done === 'function') {
                    done();
                }
            }
        },
        mounted() {
            this.getCase();
            this.getCaseCategory();
            this.getSource();
        }
    }

</script>

<style scoped>

</style>