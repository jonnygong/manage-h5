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
                    <el-button type="primary" icon="search" @click="getList">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList">刷新</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">添加</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="list" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="news" label="网友爆料信息" width="200">
            </el-table-column>
            <el-table-column prop="answer" label="记者回答" width="200">
            </el-table-column>
            <el-table-column prop="tel" label="联系电话" width="130">
            </el-table-column>
            <el-table-column prop="category_id" label="爆料类别" width="120">
                <template scope="scope">
                    {{ selectTypeName[scope.row.category_id] }}
                </template>
            </el-table-column>
            <el-table-column prop="thumb" label="相关图片" width="120">
                <template scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <div class="ad-img">
                            <img :src="scope.row.thumb" :alt="scope.row.name" width="200" height="auto"
                                 v-if="scope.row.thumb !== ''">
                            <p v-else>暂无图片</p>
                        </div>
                        <div slot="reference" class="name-wrapper">
                            <el-tag>查看图片</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="is_show" label="是否展示" width="100">
                <template scope="scope">
                    <el-tag :type="scope.row.is_show === 1 ? 'success' :'warning'">
                        {{ scope.row.is_show === 1 ? '展示' : '不展示' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="is_answer" label="是否回复" width="100">
                <template scope="scope">
                    <el-tag :type="scope.row.is_answer === 1 ? 'success' : 'warning'">
                        {{ scope.row.is_answer === 1 ? '已回复' : '未回复' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="是否启用" width="100">
                <template scope="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : 'warning'">
                        {{ scope.row.status === 1 ? '启用' : '禁用' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="update_time" label="更新时间" width="200" :formatter="formateDate">
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="200" :formatter="formateDate">
            </el-table-column>
            
            <el-table-column label="操作" width="300" fixed="right">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button :type="scope.row.status === 1 ? 'warning' : 'success'" size="small"
                               @click="statusSubmit(scope.$index, scope.row)">
                        {{ scope.row.status === 1 ? '禁用' : '启用'}}
                    </el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除
                    </el-button>
                    <el-button type="primary" size="small" @click="handleAddInfo(scope.$index, scope.row)"
                               :disabled="scope.row.is_answer===0">添加后续
                    </el-button>
                </template>

            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove('remover')"
                       :disabled="this.sels.length===0">批量删除
            </el-button>
            <el-button type="warning" @click="batchRemove('disable')" :disabled="this.sels.length===0">批量禁用</el-button>
            <el-button type="success" @click="batchRemove('active')" :disabled="this.sels.length===0">批量启用</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange"
                           :page-size="pagesize"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <!-- <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="爆料内容" prop="news">
                    <el-input type="textarea" v-model="editForm.news" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="记者回复" prop="answer">
                    <el-input type="textarea" v-model="editForm.answer"></el-input>
                </el-form-item>
                <el-form-item label="是否展示" prop="is_show">
                    <el-radio
                            class="is_show"
                            v-model.number="editForm.is_show"
                            :label="item.label"
                            :key="index"
                            v-for="(item,index) in radio">
                        {{ item.name }}
                    </el-radio>
                </el-form-item>
                <el-form-item label="爆料类别" prop="category_id">
                    <el-select v-model.number="editForm.category_id" placeholder="请选择">
                        <el-option
                                v-for="(item, index) in categoryType.options"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="调查文章" prop="article">
                    <el-input type="textarea" v-model="editForm.article"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog> -->

        <!--添加后续信息界面-->
        <el-dialog title="添加后续信息" v-model="addInfoVisible" :close-on-click-modal="false">
            <el-form :model="addInfo" label-width="80px" :rules="addInfoRules" ref="addInfo">
                <el-form-item label="后续信息" prop="follow">
                    <el-input type="textarea" v-model="addInfo.follow"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addInfoVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addFollow" :loading="addInfoLoading">提交</el-button>
            </div>
        </el-dialog>

<!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
                <el-form-item label="网友爆料信息" prop="news">
                    <el-input v-model="editForm.news" disabled></el-input>
                </el-form-item>
                 <el-form-item label="相关图片" prop="thumb">
                    <img v-if="editForm.thumb" :src="editForm.thumb" class="avatar">
                </el-form-item>
                <el-form-item label="联系电话" prop="tel">
                    <el-input v-model="editForm.tel" disabled></el-input>
                </el-form-item>
                <el-form-item label="记者回答" prop="answer">
                    <el-input type="textarea" v-model="editForm.answer"></el-input>
                </el-form-item>
                <el-form-item label="所属分类" prop="category_id">
                    <el-select v-model="editForm.category_id" placeholder="请选择上级分类">
                        <el-option
                                v-for="(item,index) in selectType"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="微信端是否显示" prop="is_show">
                    <el-select v-model="editForm.is_show" placeholder="请选择是否显示在微信端">
                        <el-option
                                v-for="(item,index) in isShow"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="调查文章" prop="article">
                    <el-input type="textarea" v-model="editForm.article"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
                <el-form-item label="网友爆料信息" prop="news">
                    <el-input v-model="addForm.news"></el-input>
                </el-form-item>
                <el-form-item label="记者回答" prop="answer">
                    <el-input type="textarea" v-model="addForm.answer"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="tel">
                    <el-input v-model="addForm.tel"></el-input>
                </el-form-item>
                <el-form-item label="所属分类" prop="category_id">
                    <el-select v-model="addForm.category_id" placeholder="请选择上级分类">
                        <el-option
                                v-for="(item,index) in selectType"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="相关图片" prop="thumb">
                    <el-input v-model="addForm.thumb"></el-input>
                    <el-upload
                            class="avatar-uploader"
                            action="https://api.kfw001.com/Newsadmin/Reporter/upload"
                            :http-request="customAddUpload"
                            :show-file-list="false"
                            :before-upload="beforeImageUpload">
                        <img v-if="addForm.thumb" :src="addForm.thumb" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="微信端是否显示" prop="is_show">
                    <el-select v-model="addForm.is_show" placeholder="请选择是否显示在微信端">
                        <el-option
                                v-for="(item,index) in isShow"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="调查文章" prop="article">
                    <el-input type="textarea" v-model="addForm.article"></el-input>
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
import util from "@/common/js/util";
import api from "@/api";

export default {
  data() {
    return {
      filters: {
        value: "",
        key: "news",
        options: [{ value: "news", label: "爆料内容" }]
      },
      selectType: [],
      selectTypeName: [],
      follow: "",
      categoryType: {
        value: "",
        key: "",
        options: []
      },
      list: [],
      radio: [{ label: 1, name: "展示" }, { label: 0, name: "不展示" }],
      cat: [],
      isShow: [{ name: "不显示", id: 0 }, { name: "显示", id: 1 }],
      page: 1,
      total: 0,
      pagesize: 10,
      listLoading: false,
      sels: [], //列表选中列

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        category_id: [
          { type: "number", required: true, message: "请选择分类", trigger: "blur" }
        ],
        news: [{ required: true, message: "请输入爆料内容", trigger: "blur" }],
        tel: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        answer: [{ required: true, message: "请输入回答内容", trigger: "blur" }],
        is_show: [
          {
            type: "number",
            required: true,
            message: "请选择是否展示",
            trigger: "blur"
          }
        ],
        thumb: [{ required: true, message: "请选择图片", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        id: "",
        news: "",
        answer: "",
        thumb: "",
        tel: "",
        category_id: "",
        is_show: "",
        article: ""
      },

      addFormVisible: false, //编辑界面是否显示
      addLoading: false,
      addFormRules: {
        category_id: [
          { type: "number", required: true, message: "请选择分类", trigger: "blur" }
        ],
        news: [{ required: true, message: "请输入爆料内容", trigger: "blur" }],
        tel: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        answer: [{ required: true, message: "请输入回答内容", trigger: "blur" }],
        is_show: [
          {
            type: "number",
            required: true,
            message: "请选择是否展示",
            trigger: "blur"
          }
        ],
        thumb: [{ required: true, message: "请选择图片", trigger: "blur" }]
      },
      //编辑界面数据
      addForm: {
        news: "",
        answer: "",
        thumb: "",
        tel: "",
        category_id: "",
        is_show: "",
        article: ""
      },

      addInfoVisible: false, //编辑界面是否显示
      addInfoLoading: false,
      addInfoRules: {
        follow: [{ required: true, message: "请选择内容", trigger: "blur" }]
      },
      //编辑界面数据
      addInfo: {
        id: "",
        follow: ""
      }
    };
  },
  methods: {
    // 格式化创建时间
    formateDate(row, column) {
      return util.formatDate.format(
        new Date(row.create_time * 1000),
        "yyyy-MM-dd hh:mm:ss"
      );
    },
    // 分页切换
    handleCurrentChange(val) {
      this.page = val;
      // 获取数据
      this.getList();
    },
    // 修改单个状态
    statusSubmit(index, row) {
      let para = {
        ids: row.id,
        status: 1 - row.status
      };
      api.changeShowStatus(para).then(res => {
        if (res.data.status === 200) {
          this.$message({
            message: "状态修改成功",
            type: "success"
          });
          row.status = 1 - row.status;
        }
      });
    },

    //获取列表
    getList() {
      this.listLoading = true;
      let para = {
        page: this.page,
        search: this.filters.value
      };
      this.getTypeListName();
      this.listLoading = true;
      api.getQaList(para).then(res => {
        if (res.data.status === 200) {
          this.listLoading = false;
          this.total = res.data.param.count;
          this.list = res.data.param.list;
          // this.is_show = res.data.param.list.is_show;
        }
      });
    },
    // 获取顶级分类列表
    getTypeList(index, row) {
      let para = {
      };
      api.getTypeList(para).then(res => {
        if (res.data.status === 200) {
          this.listLoading = false;
          this.selectType = res.data.param;
        }
      });
    },
    getTypeListName(index, row) {
      let para = {
      };
      api.getTypeList(para).then(res => {
        if (res.data.status === 200) {
          this.listLoading = false;
          res.data.param.forEach(item => {
            this.selectTypeName[item.id] = item.name;
          });
        }
      });
    },
    // 获取顶级分类名称列表
    // getTopListName(index, row) {
    //     let para = {
    //         project_id: 1,
    //     };
    //     api.getRebellionTopTypeList(para).then((res) => {
    //         if (res.data.status === 200) {
    //             this.listLoading = false;
    //             this.cat = res.data.param;
    //         }
    //     });
    // },
    // 获取子分类列表
    // getSonTypeList(index, row) {
    //     let para = {
    //         pid: row.k_id,
    //     };
    //     api.getSonType(para).then((res) => {
    //         if (res.data.status === 200) {
    //             this.listLoading = false;
    //             this.categoryType.options = res.data.param;

    //         }
    //     });
    // },

    //显示分类编辑界面
    handleEdit(index, row) {
      this.editFormVisible = true;
      this.getTypeList();
      let para = {
        id: row.id
      };
      api.getReporterInfo(para).then(res => {
        if (res.data.status === 200) {
          this.listLoading = false;
          // this.total = res.data.param.count;
          this.editForm = res.data.param;
          if (res.data.param.category_id == 0) {
            this.editForm.category_id = "";
          }
        }
      });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          let para = {
            ids: row.id,
            status: -1
          };

          api.changeShowStatus(para).then(res => {
            if (res.data.status === 200) {
              this.listLoading = false;
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getList();
            }
          });
        })
        .catch(() => {});
    },

    //编辑
    editSubmit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let params = {
              id: this.editForm.id,
              news: this.editForm.news,
              answer: this.editForm.answer,
              thumb: this.editForm.thumb,
              tel: this.editForm.tel,
              category_id: this.editForm.category_id,
              is_show: this.editForm.is_show,
              article: this.editForm.article
            };
            api.getReporterUpdate(params).then(res => {
              if (res.data.status === 200) {
                this.editLoading = false;
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.$refs["editForm"].resetFields();
                this.editFormVisible = false;
                this.getList();
              }
            });
          });
        }
      });
    },
    //显示新增界面
    handleAdd() {
      this.addFormVisible = true;
      this.addForm = {
        news: "",
        answer: "",
        thumb: "",
        category_id: "",
        is_show: "",
        article: "",
        tel: ""
      };
      this.getTypeList();
    },
    //新增
    addSubmit() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            let params = {
              news: this.addForm.news,
              answer: this.addForm.answer,
              thumb: this.addForm.thumb,
              tel: this.addForm.tel,

              category_id: this.addForm.category_id,
              is_show: this.addForm.is_show,
              article: this.addForm.article
            };

            api.getReporterAdd(params).then(res => {
              this.addLoading = false;
              if (res.data.status === 200) {
                this.$message({
                  message: res.data.info,
                  type: "success"
                });

                this.$refs["addForm"].resetFields();
                this.addFormVisible = false;
                this.getList();
              }
            });
          });
        }
      });
    },

    //显示新增界面
    handleAddInfo(index, row) {
      this.addInfoVisible = true;
      // let para = {
      //     id: row.id,
      // };
      // api.getQaList(para).then((res) => {
      //     if (res.data.status === 200) {
      //         this.listLoading = false;
      //         this.addInfo.follow = res.data.param.list.follow;
      //     }
      // });
      this.addInfo = {
        id: row.id,
        follow: row.follow
      };
    },
    //新增
    addFollow() {
      this.$refs.addInfo.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addInfoLoading = true;
            let params = {
              id: this.addInfo.id,
              follow: this.addInfo.follow
            };

            api.addAtList(params).then(res => {
              this.addInfoLoading = false;
              if (res.data.status === 200) {
                this.$message({
                  message: res.data.info,
                  type: "success"
                });

                this.$refs["addInfo"].resetFields();
                this.addInfoVisible = false;
                this.getList();
              }
            });
          });
        }
      });
    },
    //批量操作
    batchRemove(action) {
      // 三种操作：remove disable active
      let ids = this.sels.map(item => item.id).toString();
      const actions = {
        remove: {
          tip: "删除",
          api: `changeShowStatus`,
          status: -1
        },
        disable: {
          tip: "禁用",
          api: `changeShowStatus`,
          status: 0
        },
        active: {
          tip: "启用",
          api: `changeShowStatus`,
          status: 1
        }
      };
      this.$confirm("确认修改选中项状态吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          // 非批量删除，带上 status
          let para = Object.assign(
            {
              ids: ids + "",
              status: actions[action].status
            },
            para
          );
          api.changeShowStatus(para).then(res => {
            this.listLoading = false;
            this.$message({
              message: res.data.info,
              type: "success"
            });
            this.getList();
          });
        })
        .catch(() => {});
    },

    selsChange(sels) {
      this.sels = sels;
    },
    // 处理新增页面上传
    customAddUpload(file) {
      this._uploadImage(file, this.addForm);
    },
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
            type.thumb = res.data.param.path;
          }
        });
      };
    }
  },
  mounted() {
    this.getList();
    // this.getTopListName();
  }
};
</script>

<style lang="scss">

</style>