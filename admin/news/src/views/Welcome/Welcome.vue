<template>
    <div class="content">
        <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
            <el-form-item label="模型名称" prop="name">
                <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="模型描述" prop="info">
                <el-input type="textarea" v-model="addForm.info"></el-input>
            </el-form-item>
            <el-form-item label="展示端url" prop="mb_url">
                <el-input v-model="addForm.mb_url"></el-input>
            </el-form-item>
            <el-form-item label="自定义属性" prop="custom">
                <el-input type="textarea" v-model="addForm.custom"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="margin-left: 100px">
            <el-button @click.native="addSubmit" :loading="addLoading">提交更改</el-button>
        </div>
    </div>
</template>

<script>
  import util from '@/common/js/util'
  import api from '@/api'

  export default {
    data() {
      return {
        addLoading: false,
        addFormRules: [],
        addForm: {
          name: '',
          info: '',
          mb_url: '',
          custom: ''
        }
      }
    },
    methods: {
      addSubmit() {
        let para = Object.assign({
          public_id: 2 || window.localStorage.getItem('WECHAT_ID'),
          project_id: 2,
        }, this.addForm);
        api.publicSave(para).then((res) => {
          if (res.data.status === 200) {
            this.$message({
              message: res.data.info,
              type: 'success'
            });
          }
        });
      }
    },
    mounted() {
      let para = {
        public_id: 2 || window.localStorage.getItem('WECHAT_ID'),
        project_id: 2
      };
      api.publicInfo(para).then((res) => {
        if (res.data.status === 200) {
          if (res.data.param) {
            this.addForm = res.data.param;
          }
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
    @import "Welcome";
</style>