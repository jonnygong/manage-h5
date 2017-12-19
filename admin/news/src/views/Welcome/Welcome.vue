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
            <el-form-item label="首页头图" prop="img">
                    <el-input v-model="addForm.img"></el-input>
                    <el-upload
                            class="avatar-uploader"
                            action="https://api.kfw001.com/Newsadmin/Reporter/upload"
                            :http-request="customEditUpload"
                            :show-file-list="false"
                            :before-upload="beforeImageUpload">
                        <img v-if="addForm.img" :src="addForm.img" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="margin-left: 100px">
            <el-button @click.native="addSubmit" :loading="addLoading">提交更改</el-button>
        </div>
    </div>
</template>

<script>
import util from "@/common/js/util";
import api from "@/api";

export default {
  data() {
    return {
      list: [],
      listLoading: false,

      addLoading: false,
      addFormRules: {},
      addForm: {
        name: "xx爆料",
        info: "xx爆料列表",
        mb_url: `http://h.kfw001.com/web/lsbl/index.html#/?public_id=${window.sessionStorage.getItem(
          "WECHAT_ID"
        ) === null
          ? 0
          : window.sessionStorage.getItem("WECHAT_ID")}`,
        img:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513589622202&di=d41b01f6f888588044497599a0d46d4d&imgtype=0&src=http%3A%2F%2Fawb.img.xmtbang.com%2Fimg%2Fuploadnew%2F201506%2F15%2F354dad559482425997016a848fb8dc0e.jpg",
        custom: "无"
      }
    };
  },
  methods: {
    // 处理编辑页面上传
    customEditUpload(file) {
      this._uploadImage(file, this.editForm);
    },
    // 图片上传前限制条件
    beforeImageUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
      reader.onload = function() {
        // 拿到 base64 代码
        let param = {
          uploadimg: reader.result
        };
        api.imageUpload(param).then(res => {
          if (res.data.status === 200) {
            type.img = res.data.param.path;
          }
        });
      };
    },
    addSubmit() {
      let para = Object.assign(
        {
          public_id: window.sessionStorage.getItem("WECHAT_ID"),
          project_id: window.sessionStorage.getItem("PROJECT_ID"),
        },
        this.addForm
      );
      api.publicSave(para).then(res => {
        if (res.data.status === 200) {
          this.$message({
            message: res.data.info,
            type: "success"
          });
          this.getListData();
        }
      });
    },
    getListData() {
      let para = {
        public_id: window.sessionStorage.getItem("WECHAT_ID"),
        project_id: window.sessionStorage.getItem("PROJECT_ID"),
      };
      api.publicInfo(para).then(res => {
        if (res.data.status === 200) {
          if (typeof res.data.param !== "object") {
            this.addForm = {
              id: 0,
              name: "xx爆料",
              info: "xx爆料列表",
              mb_url: `http://h.kfw001.com/web/lsbl/index.html#/?public_id=${window.sessionStorage.getItem(
                "WECHAT_ID"
              ) === null
                ? 0
                : window.sessionStorage.getItem("WECHAT_ID")}`,
              img:
                "http://kfw-mtd.oss-cn-hangzhou.aliyuncs.com/images/2017-12-07/5a29050e626ca.jpg",
              custom: "无"
            };
          } else {
            this.addForm = res.data.param;
          }
        }
      });
    }
  },
  mounted() {
    this.getListData();
  }
};
</script>

<style lang="scss" scoped>
@import "Welcome";
</style>