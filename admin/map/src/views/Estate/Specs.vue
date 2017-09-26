<template>
    <section class="setting-wrapper">
        <!--编辑界面-->
        <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
            <el-form-item :label="item.label" :prop="item.prop" v-for="(item, index) in formItems">
                <el-input v-model.number="editForm[item.prop]"
                          v-if="item.type==='number'"
                          auto-complete="off"></el-input>
                <el-input v-model="editForm[item.prop]"
                          v-else
                          auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">保存</el-button>
                <el-button @click.native="handleRedirect('/estate')">返回上层</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
    import util from '@/utils/js'

    const MODEL_NAME = 'Specs';

    export default {
        data() {
            return {
                formItems: [
                    {prop: 'floor_space', label: '占地面积'},
                    {prop: 'building_space', label: '建筑面积'},
                    {prop: 'space_ratio', label: '容积率'},
                    {prop: 'green_space', label: '绿化面积'},
                    {prop: 'plan_room_num', label: '规划户数', type: 'number'},
                    {prop: 'park_num', label: '停车位数量', type: 'number'},
                    {prop: 'fitment', label: '装修'},
                    {prop: 'lift_brand', label: '电梯品牌'},
                    {prop: 'outer_wall', label: '外立面材料'},
                    {prop: 'property_company', label: '物业公司'},
                    {prop: 'traffic_info', label: '交通配套'},
                    {prop: 'education_info', label: '教育配套'},
                    {prop: 'hospital_info', label: '医疗配套'},
                    {prop: 'bussiness_info', label: '商业配套'},
                    {prop: 'building_company', label: '开发商'},
                    {prop: 'property_type', label: '地块物业类型'},
                    {prop: 'property_limit', label: '产权年限'}
                ],
                editLoading: false,
                editFormRules: {
                    floor_space: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    building_space: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    space_ratio: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    green_space: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    plan_room_num: [
                        {type: 'number', required: true, message: '请输入数字', trigger: 'blur'}
                    ],
                    park_num: [
                        {type: 'number', required: true, message: '请输入数字', trigger: 'blur'}
                    ],
                    fitment: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    lift_brand: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    outer_wall: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    property_company: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    traffic_info: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    education_info: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    hospital_info: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    bussiness_info: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    building_company: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    property_type: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    property_limit: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                },
                //编辑界面数据
                editForm: {
                    floor_space: '',
                    building_space: '',
                    space_ratio: '',
                    green_space: '',
                    plan_room_num: '',
                    park_num: '',
                    fitment: '',
                    lift_brand: '',
                    outer_wall: '',
                    property_company: '',
                    traffic_info: '',
                    education_info: '',
                    hospital_info: '',
                    bussiness_info: '',
                    building_company: '',
                    property_type: '',
                    property_limit: ''
                },
            }
        },
        methods: {
            handleRedirect(path) {
                this.$router.push(path);
            },
            // 获取用户个人资料
            async getListData() {
                const res = await this.$http.post(`mapadminSpecsEdit`, {project_id:this.$route.params.id});
                if (res === null) return;
                this.editForm = res.param;
            },
            //编辑
            editSubmit() {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(async () => {
                            this.editLoading = true;
                            let params = Object.assign({project_id: this.$route.params.id}, this.editForm);
                            const res = await this.$http.post(`mapadminSpecsSave`, params);
                            this.editLoading = false;
                            if (res === null) return;
                            this.$message({
                                message: res.info,
                                type: 'success'
                            });
                            this.$router.back();
                        }).catch(() => {

                        });
                    }
                });
            }
        },
        mounted() {
            this.getListData();
        }
    }
</script>

<style lang="scss" scoped>
    .setting-wrapper {
        width: 70%;
        margin: 30px;
    }
</style>