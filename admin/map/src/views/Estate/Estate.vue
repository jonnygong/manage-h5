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
            <el-table-column prop="id" label="编号ID" width="100" sortable>
            </el-table-column>
            <el-table-column prop="zone_id" label="所属区域" min-width="120">
                <template scope="scope">
                    {{ zoneList[scope.row.zone_id] }}
                </template>
            </el-table-column>
            <el-table-column prop="title" label="项目标题" min-width="120">
            </el-table-column>
            <el-table-column prop="cover" label="封面图片" width="130">
                <template scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <div class="ad-img">
                            <img :src="scope.row.cover" :alt="scope.row.name" width="200" height="auto"
                                 v-if="scope.row.cover !== ''">
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
            <el-table-column prop="update_time" label="更新时间" width="180" :formatter="formateDate">
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
        <el-dialog title="编辑" size="large" v-model="editFormVisible" :close-on-click-modal="false" :before-close="destroyEditEditor">
            <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
                <el-form-item label="项目标题" prop="title">
                    <el-input v-model="editForm.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目简介" prop="info">
                    <el-input type="textarea" v-model="editForm.info" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="封面图片" prop="cover">
                    <i-uploader v-model="editForm.cover"></i-uploader>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model.number="editForm.sort" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="均价" prop="avg_price">
                    <el-input v-model.number="editForm.avg_price" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="标签" prop="tags">
                    <el-checkbox-group v-model="editForm.tags" :max="5">
                        <el-checkbox
                                :label="item.id"
                                :key="index"
                                v-for="(item, index) in options.tags">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="主推面积" prop="main_area">
                    <el-checkbox-group v-model="editForm.main_area">
                        <el-checkbox
                                :label="item.id"
                                :key="index"
                                v-for="(item, index) in options.main_area">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="户型" prop="house_type">
                    <el-checkbox-group v-model="editForm.house_type">
                        <el-checkbox
                                :label="item.id"
                                :key="index"
                                v-for="(item, index) in options.house_type">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="区域ID" prop="zone_id">
                    <el-select v-model.number="editForm.zone_id" placeholder="请选择" @change="handleEditChange">
                        <el-option
                                v-for="(item, index) in options.zone"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="下级区域" prop="plate_id">
                    <el-select v-model.number="editForm.plate_id" placeholder="请选择">
                        <el-option :label="item.name"
                                   :value="item.id"
                                   :key="index"
                                   v-for="(item, index) in options.plate_id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="经纬度">
                    <el-row type="flex" justify="space-between">
                        <el-col :span="9">
                            <el-form-item prop="latitude">
                                <el-input placeholder="请输入内容" v-model.number="map.lat">
                                    <template slot="prepend">经度</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="9" :offset="1">
                            <el-form-item prop="longitude">
                                <el-input placeholder="请输入内容" v-model.number="map.lng">
                                    <template slot="prepend">纬度</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4" :offset="1">
                            <el-button @click="map.display = !map.display">地图查询</el-button>
                        </el-col>
                    </el-row>
                    <div class="map" style="margin-top: 10px;" v-if="map.display">
                        <el-input placeholder="请输入内容" v-model="map.keyword">
                            <template slot="prepend">关键字</template>
                        </el-input>
                        <baidu-map class="bm-view" style="width: 100%; height: 400px;margin-top: 10px;">
                            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                            <bm-view style="width: 100%; height: 400px;margin-top: 10px;"></bm-view>
                            <bm-local-search :keyword="map.keyword"
                                             :auto-viewport="true"
                                             :panel="false"
                                             @infohtmlset="locationSuccess"></bm-local-search>
                        </baidu-map>
                    </div>

                </el-form-item>
                <el-form-item label="项目地址" prop="address">
                    <el-input v-model="editForm.address" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="地铁线路" prop="metro_id">
                    <el-checkbox-group v-model="editForm.metro_id">
                        <el-checkbox
                                :label="item.id"
                                :key="index"
                                v-for="(item, index) in options.metro_id">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="地铁站点" prop="metrostation_id">
                    <el-input v-model="editForm.metrostation_id" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="下次开盘时间" prop="next_open">
                    <el-date-picker
                            v-model="editForm.next_open"
                            type="datetime"
                            placeholder="选择日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="是否开放预约" prop="see_open">
                    <el-select v-model.number="editForm.see_open" placeholder="请选择">
                        <el-option
                                v-for="(item, index) in options.see_open"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="销售状态" prop="sale_status">
                    <el-select v-model.number="editForm.sale_status" placeholder="请选择">
                        <el-option :label="item.label"
                                   :value="item.value"
                                   :key="index"
                                   v-for="(item, index) in options.sale_status"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否合作" prop="is_cooperation">
                    <el-select v-model.number="editForm.is_cooperation" placeholder="请选择">
                        <el-option :label="item.label"
                                   :value="item.value"
                                   :key="index"
                                   v-for="(item, index) in options.is_cooperation"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="销售热线" prop="sell_phone">
                    <el-input v-model.number="editForm.sell_phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目详情" prop="detail">
                    <UE :defaultMsg=editForm.detail :config=ueditor.config ref="ueEdit"></UE>
                </el-form-item>
                <el-form-item label="分享标题" prop="share_title">
                    <el-input v-model="editForm.share_title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="分享内容" prop="share_content">
                    <el-input v-model="editForm.share_content" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="分享图片" prop="share_img">
                    <i-uploader v-model="editForm.share_img"></i-uploader>
                </el-form-item>
                <el-form-item label="微楼书标题" prop="link_title">
                    <el-input v-model="editForm.link_title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="二维码图片" prop="qrcode_img">
                    <i-uploader v-model="editForm.qrcode_img"></i-uploader>
                </el-form-item>
                <el-form-item label="链接地址" prop="link_url">
                    <el-input v-model="editForm.link_url" auto-complete="off"></el-input>
                </el-form-item>



            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="handleEditCancel">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" size="large" v-model="addFormVisible" :close-on-click-modal="false" :before-close="destroyAddEditor">
            <el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
                <el-form-item label="项目标题" prop="title">
                    <el-input v-model="addForm.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目简介" prop="info">
                    <el-input type="textarea" v-model="addForm.info" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="封面图片" prop="cover">
                    <i-uploader v-model="addForm.cover"></i-uploader>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model.number="addForm.sort" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="均价" prop="avg_price">
                    <el-input v-model.number="addForm.avg_price" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="标签" prop="tags">
                    <el-checkbox-group v-model="addForm.tags" :max="5">
                        <el-checkbox
                                :label="item.id"
                                :key="index"
                                v-for="(item, index) in options.tags">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="主推面积" prop="main_area">
                    <el-checkbox-group v-model="addForm.main_area">
                        <el-checkbox
                                :label="item.id"
                                :key="index"
                                v-for="(item, index) in options.main_area">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="户型" prop="house_type">
                    <el-checkbox-group v-model="addForm.house_type">
                        <el-checkbox
                                :label="item.id"
                                :key="index"
                                v-for="(item, index) in options.house_type">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="区域ID" prop="zone_id">
                    <el-select v-model.number="addForm.zone_id" placeholder="请选择" @change="handleAddChange">
                        <el-option
                                v-for="(item, index) in options.zone"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="下级区域" prop="plate_id">
                    <el-select v-model.number="addForm.plate_id" placeholder="请选择">
                        <el-option :label="item.name"
                                   :value="item.id"
                                   :key="index"
                                   v-for="(item, index) in options.plate_id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="经纬度">
                    <el-row type="flex" justify="space-between">
                        <el-col :span="9">
                            <el-form-item prop="latitude">
                                <el-input placeholder="请输入内容" v-model.number="map.lat">
                                    <template slot="prepend">经度</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="9" :offset="1">
                            <el-form-item prop="longitude">
                                <el-input placeholder="请输入内容" v-model.number="map.lng">
                                    <template slot="prepend">纬度</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4" :offset="1">
                            <el-button @click="map.display = !map.display">地图查询</el-button>
                        </el-col>
                    </el-row>
                    <div class="map" style="margin-top: 10px;" v-if="map.display">
                        <el-input placeholder="请输入内容" v-model="map.keyword">
                            <template slot="prepend">关键字</template>
                        </el-input>
                        <baidu-map class="bm-view" style="width: 100%; height: 400px;margin-top: 10px;">
                            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                            <bm-view style="width: 100%; height: 400px;margin-top: 10px;"></bm-view>
                            <bm-local-search :keyword="map.keyword"
                                             :auto-viewport="true"
                                             :panel="false"
                                             @infohtmlset="locationSuccess"></bm-local-search>
                        </baidu-map>
                    </div>
                </el-form-item>
                <el-form-item label="项目地址" prop="address">
                    <el-input v-model="addForm.address" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="地铁线路" prop="metro_id">
                    <el-checkbox-group v-model="addForm.metro_id">
                        <el-checkbox
                                :label="item.id"
                                :key="index"
                                v-for="(item, index) in options.metro_id">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="地铁站点" prop="metrostation_id">
                    <el-input v-model="addForm.metrostation_id" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="下次开盘时间" prop="next_open">
                    <el-date-picker
                            v-model="addForm.next_open"
                            type="datetime"
                            placeholder="选择日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="是否开放预约" prop="see_open">
                    <el-select v-model.number="addForm.see_open" placeholder="请选择">
                        <el-option
                                v-for="(item, index) in options.see_open"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="销售状态" prop="sale_status">
                    <el-select v-model.number="addForm.sale_status" placeholder="请选择">
                        <el-option :label="item.label"
                                   :value="item.value"
                                   :key="index"
                                   v-for="(item, index) in options.sale_status"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否合作" prop="is_cooperation">
                    <el-select v-model.number="addForm.is_cooperation" placeholder="请选择">
                        <el-option :label="item.label"
                                   :value="item.value"
                                   :key="index"
                                   v-for="(item, index) in options.is_cooperation"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="销售热线" prop="sell_phone">
                    <el-input v-model.number="addForm.sell_phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目详情" prop="detail">
                    <UE :defaultMsg=addForm.detail :config=ueditor.config ref="ueAdd"></UE>
                </el-form-item>
                <el-form-item label="分享标题" prop="share_title">
                    <el-input v-model="addForm.share_title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="分享内容" prop="share_content">
                    <el-input v-model="addForm.share_content" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="分享图片" prop="share_img">
                    <i-uploader v-model="addForm.share_img"></i-uploader>
                </el-form-item>
                <el-form-item label="微楼书标题" prop="link_title">
                    <el-input v-model="addForm.link_title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="二维码图片" prop="qrcode_img">
                    <i-uploader v-model="addForm.qrcode_img"></i-uploader>
                </el-form-item>
                <el-form-item label="链接地址" prop="link_url">
                    <el-input v-model="addForm.link_url" auto-complete="off"></el-input>
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
                        zIndex: 9999
                    }
                },
                map: {
                    display: false,
                    keyword: '',
                    lat: '',
                    lng: ''
                },
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
                zoneList: [],
                selectList: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                value: '',
                zone: '',
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
                    plate_id: [],
                    house_type: [],
                    main_area: [],
                    price: [],
                    tags: [],
                    metro_id: [],
                    zone: [],
                },
                total: 0,
                page: 1,
                pagesize: 10,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    zone_id: [
                        {type: 'number',required: true, message: '请选择区域', trigger: 'blur'}
                    ],
                    cover: [
                        {required: true, message: '请上传封面图片', trigger: 'blur'}
                    ],
                    title: [
                        {required: true, message: '请输入项目标题', trigger: 'blur'}
                    ],
                    info: [
                        {required: true, message: '请输入项目简介', trigger: 'blur'}
                    ],
                    sort: [
                        {type: 'number', required: true, message: '请输入排序', trigger: 'blur'}
                    ],
                    next_open: [
                        {type: 'date', required: true, message: '请选择下次开盘时间', trigger: 'blur'}
                    ],
                    avg_price: [
                        {type: 'number', required: true, message: '请输入均价', trigger: 'blur'}
                    ],
                    sell_phone: [
                        {type: 'number', required: true, message: '请输入销售热线', trigger: 'blur'}
                    ],
                    address: [
                        {required: true, message: '请输入地址', trigger: 'blur'}
                    ],
                    latitude: [
                        {type: 'number', required: true, message: '请选择纬度', trigger: 'blur'}
                    ],
                    longitude: [
                        {type: 'number', required: true, message: '请选择经度', trigger: 'blur'}
                    ],
                    tags: [
                        {type: 'array', required: true, message: '请选择标签', trigger: 'blur'}
                    ],
                    see_open: [
                        {type: 'number',required: true, message: '请选择是否开放看房报名', trigger: 'blur'}
                    ],
                    main_area: [
                        {type: 'array', required: true, message: '请选择主推面积', trigger: 'blur'}
                    ],
                    sale_status: [
                        {type: 'number',required: true, message: '请选择销售状态', trigger: 'blur'}
                    ],
                    house_type: [
                        {type: 'array', required: true, message: '请选择户型', trigger: 'blur'}
                    ],
                    metro_id: [
                        {type: 'array', required: true, message: '请选择地铁线路', trigger: 'blur'}
                    ],
                    metrostation_id: [
                        {required: true, message: '请选择地铁站点', trigger: 'blur'}
                    ],
//                    plate_id: [
//                        {type: 'number',required: true, message: '请选择下级区域', trigger: 'blur'}
//                    ],
                    is_cooperation: [
                        {type: 'number',required: true, message: '请选择是否合作', trigger: 'blur'}
                    ],
                    detail: [
                        {validator: validateEditContent, trigger: 'blur'}
                    ],
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    zone_id: '',
                    cover: '',
                    title: '',
                    info: '',
                    sort: 0,
                    next_open: '',
                    avg_price: '',
                    address: '',
                    latitude: 0,
                    longitude: 0,
                    tags: '',
                    see_open: '',
                    qrcode_img: '',
                    link_url: '',
                    share_title: '',
                    share_img: '',
                    link_title: '',
                    main_area: '',
                    sale_status: '',
                    house_type: '',
                    metro_id: '',
                    metrostation_id: '',
                    plate_id: '',
                    detail: '',
                    is_cooperation: '',
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    zone_id: [
                        {type: 'number',required: true, message: '请选择区域', trigger: 'blur'}
                    ],
                    cover: [
                        {required: true, message: '请上传封面图片', trigger: 'blur'}
                    ],
                    title: [
                        {required: true, message: '请输入项目标题', trigger: 'blur'}
                    ],
                    info: [
                        {required: true, message: '请输入项目简介', trigger: 'blur'}
                    ],
                    sort: [
                        {type: 'number', required: true, message: '请输入排序', trigger: 'blur'}
                    ],
                    next_open: [
                        {type: 'date', required: true, message: '请选择下次开盘时间', trigger: 'blur'}
                    ],
                    avg_price: [
                        {type: 'number', required: true, message: '请输入均价', trigger: 'blur'}
                    ],
                    sell_phone: [
                        {type: 'number', required: true, message: '请输入销售热线', trigger: 'blur'}
                    ],
                    address: [
                        {required: true, message: '请输入地址', trigger: 'blur'}
                    ],
                    latitude: [
                        {type: 'number', required: true, message: '请选择纬度', trigger: 'blur'}
                    ],
                    longitude: [
                        {type: 'number', required: true, message: '请选择经度', trigger: 'blur'}
                    ],
                    tags: [
                        {type: 'array', required: true, message: '请选择标签', trigger: 'blur'}
                    ],
                    see_open: [
                        {type: 'number',required: true, message: '请选择是否开放看房报名', trigger: 'blur'}
                    ],
                    main_area: [
                        {type: 'array', required: true, message: '请选择主推面积', trigger: 'blur'}
                    ],
                    sale_status: [
                        {type: 'number',required: true, message: '请选择销售状态', trigger: 'blur'}
                    ],
                    house_type: [
                        {type: 'array', required: true, message: '请选择户型', trigger: 'blur'}
                    ],
                    metro_id: [
                        {type: 'array', required: true, message: '请选择地铁线路', trigger: 'blur'}
                    ],
                    metrostation_id: [
                        {required: true, message: '请选择地铁站点', trigger: 'blur'}
                    ],
//                    plate_id: [
//                        {type: 'number',required: true, message: '请选择下级区域', trigger: 'blur'}
//                    ],
                    is_cooperation: [
                        {type: 'number',required: true, message: '请选择是否合作', trigger: 'blur'}
                    ],
                    detail: [
                        {validator: validateAddContent, trigger: 'blur'}
                    ],
                },
                //新增界面数据
                addForm: {
                    zone_id: 0,
                    cover: '',
                    title: '',
                    info: '',
                    sort: 0,
                    sell_phone: '',
                    next_open: '',
                    avg_price: 0,
                    address: '',
                    latitude: 0,
                    longitude: 0,
                    tags: '',
                    see_open: '',
                    qrcode_img: '',
                    link_url: '',
                    share_title: '',
                    share_img: '',
                    link_title: '',
                    main_area: '',
                    sale_status: '',
                    house_type: '',
                    metro_id: '',
                    metrostation_id: '',
                    plate_id: '',
                    detail: '',
                    is_cooperation: '',
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
                    key: this.filters.key, // 可选参数查询
                    value: this.filters.value // 可选参数查询
                };
                this.getListZone();
                const res = await this.$http.post(`mapadminListList`, params);
                this.listLoading = false;
                if (res === null) return;
                this.total = res.param.count;
                this.list = res.param.list;
            },
            //获下拉列表
            async getListArray() {
                this.listLoading = true;
                let params = {};
                const res = await this.$http.post(`mapadminListArray`, params);
                this.listLoading = false;
                if (res === null) return;
                this.options.house_type = res.param.house_type;
                this.options.main_area = res.param.main_area;
                this.options.price = res.param.price;
                this.options.tags = res.param.tags;
                this.options.metro_id = res.param.underground;
                this.options.zone = res.param.zone;
            },
            //获下拉列表
            async getListStation() {
                this.listLoading = true;
                let params = {

                };
                const res = await this.$http.post(`mapadminListArray`, params);
                this.listLoading = false;
                if (res === null) return;
                this.options.house_type = res.param.house_type;
                this.options.main_area = res.param.main_area;
                this.options.price = res.param.price;
                this.options.tags = res.param.tags;
                this.options.metro_id = res.param.underground;
                this.options.zone = res.param.zone;
            },
            //获区域列表
            async getListPlate(id) {
                this.listLoading = true;
                let params = {
                    zone_id: id
                };
                const res = await this.$http.post(`mapadminListGetplate`, params);
                this.listLoading = false;
                if (res === null) return;
                this.options.plate_id = res.param;
            },
            //获区域列表
            async getListZone() {
                this.listLoading = true;
                let params = {
                };
                const res = await this.$http.post(`mapadminListGetzone`, params);
                this.listLoading = false;
                if (res === null) return;
                this.zoneList = res.param;
            },
            //删除
            handleDel(index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(async () => {
                    let params = {
                        ids: row.id,
                        status: -1
                    };

                    const res = await this.$http.post(`mapadminListStatus`, params);
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
                this.destroyAddEditor()
            },
            handleEditCancel() {
                this.editFormVisible = false;
                this.destroyEditEditor()
            },
            //显示编辑界面
            async handleEdit(index, row) {
                this.editFormVisible = true;
                let params = {
                    id: row.id
                };
                this.getListArray();
                this.getListPlate();
                const res = await this.$http.post(`mapadminListEdit`, params);
                if (res === null) return;
                this.map.lng = res.param.longitude;
                this.map.lat = res.param.latitude;
                this.editForm = Object.assign({}, res.param);
                this.getCity(this.editForm.province_id, this.editForm.city_id, true);
            },
            //显示新增界面
            handleAdd() {
                this.addFormVisible = true;
                this.getListArray();
                this.getListPlate();
                this.addForm = {
                    zone_id: '',
                    cover: '',
                    title: '',
                    info: '',
                    sort: '',
                    next_open: '',
                    sell_phone: '',
                    avg_price: '',
                    address: '',
                    latitude: '',
                    longitude: '',
                    tags: [],
                    see_open: '',
                    qrcode_img: '',
                    link_url: '',
                    share_title: '',
                    share_img: '',
                    link_title: '',
                    main_area: [],
                    sale_status: '',
                    house_type: [],
                    metro_id: [],
                    metrostation_id: '',
                    plate_id: '',
                    detail: '',
                    is_cooperation: '',
                };
            },
            //编辑
            editSubmit() {
                this.editForm.latitude = this.map.lat;
                this.editForm.longitude = this.map.lng;
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(async () => {
                            this.editLoading = true;
                            // 处理时间为时间戳
                            let _next_open_ = this.editForm.next_open;
                            if(typeof this.editForm.next_open === 'number') {
                                _next_open_ = this.editForm.next_open / 1000
                            } else {
                                _next_open_ = new Date(this.editForm.next_open).getTime() / 1000
                            }
                            let params = Object.assign({}, this.editForm);
                            params.latitude = this.map.lat;
                            params.longitude = this.map.lng;
                            params.next_open = _next_open_; // 后台接收10位时间戳，需要转换
                            params.detail = this.getUEContent('ueEdit'); // 富文本内容
                            const res = await this.$http.post(`mapadminListEditsave`, params);
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
                this.addForm.latitude = this.map.lat;
                this.addForm.longitude = this.map.lng;
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(async () => {
                            this.addLoading = true;

                            let params = Object.assign({}, this.addForm);
                            params.latitude = this.map.lat;
                            params.longitude = this.map.lng;
                            params.detail = this.getUEContent('ueAdd'); // 富文本内容
                            const res = await this.$http.post(`mapadminListAddsave`, params);
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
                    ids: row.id,
                    status: 1 - row.status
                };

                const res = await this.$http.post(`mapadminListStatus`, params);
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
                // 三种操作：remove disable active
                let ids = this.sels.map(item => item.id).toString();
                const actions = {
                    'remove': {
                        tip: '删除',
                        api: `mapadminListStatus`,
                        status: -1
                    },
                    'disable': {
                        tip: '停用',
                        api: `mapadminListStatus`,
                        status: 0
                    },
                    'active': {
                        tip: '启用',
                        api: `mapadminListStatus`,
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
            // Ueditor 获取内容
            getUEContent(ele) {
                return this.$refs[ele].getUEContent();
            },
            destroyAddEditor(done) {
                this.addForm.detail = this.getUEContent('ueAdd');
                if (typeof done === 'function') {
                    done();
                }
            },
            destroyEditEditor(done) {
                this.editForm.detail = this.getUEContent('ueEdit');
                if (typeof done === 'function') {
                    done();
                }
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