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
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="区域ID" width="100" sortable></el-table-column>
            <el-table-column prop="name" label="区域名字" min-width="120"></el-table-column>
            <!--<el-table-column prop="zone_id" label="所属区域" min-width="120">-->
            <!--<template scope="scope">-->
            <!--&lt;!&ndash;{{ zoneList[scope.row.zone_id] }}&ndash;&gt;-->
            <!--顶级-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="city_id" label="城市" min-width="120">
                <template scope="scope">
                    <!--{{ zoneList[scope.row.zone_id] }}-->
                    杭州市
                </template>
            </el-table-column>
            <el-table-column prop="longitude" label="经度" min-width="120"></el-table-column>
            <el-table-column prop="latitude" label="纬度" min-width="120"></el-table-column>
            <el-table-column prop="house_count" label="库存量" min-width="120"></el-table-column>
            <el-table-column prop="avg_price" label="区域均价" min-width="120"></el-table-column>
            <el-table-column prop="sort" label="排序" min-width="120"></el-table-column>
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
                <el-form-item label="区域ID" prop="pid">
                    <el-select v-model.number="editForm.pid" placeholder="请选择">
                        <el-option
                                v-for="(item, index) in zoneList"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="区域名字" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="区域均价" prop="avg_price">
                    <el-input v-model.number="editForm.avg_price" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="库存量" prop="house_count">
                    <el-input v-model.number="editForm.house_count" auto-complete="off"></el-input>
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
                        <baidu-map class="bm-view" style="width: 100%; height: 400px;margin-top: 10px;"
                                   :center="{lng: this.map.lng, lat: this.map.lat}" :zoom="15"
                                   :scroll-wheel-zoom="true">
                            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                            <bm-view style="width: 100%; height: 400px;margin-top: 10px;"></bm-view>
                            <bm-context-menu>
                                <bm-context-menu-item :callback="locationSuccess" text="使用此位置"></bm-context-menu-item>
                            </bm-context-menu>
                            <bm-marker :position="{lng: this.map.lng, lat: this.map.lat}"
                                       :dragging="true"
                                       @dragend="locationSuccess"></bm-marker>
                            <bm-local-search :keyword="map.keyword"
                                             :auto-viewport="true"
                                             :panel="false"
                                             @infohtmlset="locationSuccess"></bm-local-search>
                        </baidu-map>
                    </div>

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
                <el-form-item label="上级区域" prop="pid">
                    <el-select v-model.number="addForm.pid" placeholder="请选择">
                        <el-option
                                v-for="(item, index) in zoneList"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="区域名字" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="区域均价" prop="avg_price">
                    <el-input v-model.number="addForm.avg_price" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="可售楼盘" prop="house_count">
                    <el-input v-model.number="addForm.house_count" auto-complete="off"></el-input>
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
                        <baidu-map class="bm-view" style="width: 100%; height: 400px;margin-top: 10px;"
                                   :center="{lng: this.map.lng, lat: this.map.lat}" :zoom="15"
                                   :scroll-wheel-zoom="true">
                            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                            <bm-view style="width: 100%; height: 400px;margin-top: 10px;"></bm-view>
                            <bm-context-menu>
                                <bm-context-menu-item :callback="locationSuccess" text="使用此位置"></bm-context-menu-item>
                            </bm-context-menu>
                            <bm-marker :position="{lng: this.map.lng, lat: this.map.lat}"
                                       :dragging="true"
                                       @dragend="locationSuccess"></bm-marker>
                            <bm-local-search :keyword="map.keyword"
                                             :auto-viewport="true"
                                             :panel="false"
                                             @infohtmlset="locationSuccess"></bm-local-search>
                        </baidu-map>
                    </div>
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
                map: {
                    display: false,
                    keyword: '',
                    lat: '',
                    lng: ''
                },
                filters: {
                    value: '',
                    key: '',
                    options: [
                        {value: '', label: '全部'},
                    ]
                },
                list: [],
                zoneList: [],
                value: '',
                zone: '',
                total: 0,
                page: 1,
                pagesize: 10,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    pid: [
                        {type: 'number', required: true, message: '请选择区域', trigger: 'blur'}
                    ],
                    latitude: [
                        {type: 'number', required: true, message: '请选择纬度', trigger: 'blur'}
                    ],
                    longitude: [
                        {type: 'number', required: true, message: '请选择经度', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                    house_count: [
                        {type: 'number', required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    avg_price: [
                        {type: 'number', required: true, message: '请输入均价', trigger: 'blur'}
                    ],
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    longitude: '',
                    latitude: '',
                    status: 0,
                    name: '',
                    pid: 0,
                    house_count: '',
                    avg_price: '',
                    city_id: 87,
                    sort: 0
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    pid: [
                        {type: 'number', required: true, message: '请选择区域', trigger: 'blur'}
                    ],
                    latitude: [
                        {type: 'number', required: true, message: '请选择纬度', trigger: 'blur'}
                    ],
                    longitude: [
                        {type: 'number', required: true, message: '请选择经度', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                    house_count: [
                        {type: 'number', required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    avg_price: [
                        {type: 'number', required: true, message: '请输入均价', trigger: 'blur'}
                    ],
                },
                //新增界面数据
                addForm: {
                    longitude: '',
                    latitude: '',
                    status: 0,
                    name: '',
                    pid: 0,
                    house_count: '',
                    avg_price: '',
                    city_id: 87,
                    sort: 0
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
            handleCurrentChange(val) {
                this.page = val;
                this.getListData();
            },
            //获列表
            async getListData() {
                this.listLoading = true;
                let params = {
                    page: this.page,
                    pid: 0,
                    key: this.filters.key, // 可选参数查询
                    value: this.filters.value // 可选参数查询
                };
                const res = await this.$http.post(`mapadminAreaList`, params);
                this.listLoading = false;
                if (res === null) return;
                this.pagesize = res.param.pages.pagesize;
                this.total = res.param.pages.total;
                this.list = res.param.list;
            },
            //获区域列表
            async getListZone() {
                this.listLoading = true;
                let params = {
                    pid: 0
                };
                const res = await this.$http.post(`mapadminAreaSelect`, params);
                this.listLoading = false;
                if (res === null) return;
                this.zoneList = res.param;
                this.zoneList.push({id: 0, pid: 0, name: '顶级'})
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

                    const res = await this.$http.post(`mapadminAreaDelete`, params);
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
                const res = await this.$http.post(`mapadminAreaInfo`, params);
                if (res === null) return;
                this.map.lng = Number(res.param.longitude);
                this.map.lat = Number(res.param.latitude);
                this.editForm = Object.assign({}, res.param);
                this.editForm.avg_price = Number(res.param.avg_price);
                this.getListZone();
            },
            //显示新增界面
            handleAdd() {
                this.addFormVisible = true;
                this.addForm = {
                    zone_id: '',
                    longitude: '',
                    latitude: '',
                    status: 0,
                    name: '',
                    pid: '',
                    house_count: '',
                    avg_price: '',
                    city_id: 87,
                    sort: 0
                };
                this.getListZone();

            },
            //编辑
            editSubmit() {
                this.editForm.latitude = this.map.lat;
                this.editForm.longitude = this.map.lng;
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(async () => {
                            this.editLoading = true;
                            let params = Object.assign({}, this.editForm);
                            params.latitude = this.map.lat;
                            params.longitude = this.map.lng;
                            params.city_id = 87;
                            const res = await this.$http.post(`mapadminAreaUpdate`, params);
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
                this.addForm.latitude = this.map.lat;
                this.addForm.longitude = this.map.lng;
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(async () => {
                            this.addLoading = true;
                            let params = Object.assign({}, this.addForm);
                            params.latitude = this.map.lat;
                            params.longitude = this.map.lng;
                            params.city_id = 87;
                            const res = await this.$http.post(`mapadminAreaAdd`, params);
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
            // 修改状态
            async statusSubmit(index, row) {
                let params = {
                    id: row.id,
                    status: 1 - row.status
                };

                const res = await this.$http.post(`mapadminAreaStatus`, params);
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
                        api: `mapadminAreaDelete`
                    },
                    'disable': {
                        tip: '停用',
                        api: `mapadminAreaStatus`,
                        status: 0
                    },
                    'active': {
                        tip: '启用',
                        api: `mapadminAreaStatus`,
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
            this.getListZone();

        },
        components: {
            'i-uploader': Uploader
        },
    }

</script>

<style lang="scss">
</style>