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
            <el-table-column prop="active_title" label="活动标题" min-width="120"></el-table-column>
            <el-table-column prop="active_time" label="活动时间" min-width="200">
                <template scope="scope">
                    <div v-for="(item, index) in scope.row.active_time" :key="index">
                        <p>{{new Date(item.start).toLocaleString()}} 至 {{new Date(item.end).toLocaleString()}}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="active_type" label="活动类型" min-width="120">
                <template scope="scope">
                    {{options.type[scope.row.active_type]}}
                </template>
            </el-table-column>
            <el-table-column prop="template" label="类型" min-width="120">
                <template scope="scope">
                    {{options.template[scope.row.template]}}
                </template>
            </el-table-column>
            <el-table-column prop="status" label="是否启用活动" width="120">
                <template scope="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : scope.row.status === -1 ? 'gray' : 'danger'">
                        {{ scope.row.status === 1 ? '可用' : scope.row.status === -1 ? '已删除' : '不可用' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="80" fixed="right">
                <template scope="scope">
                    <!--<el-button size="small" @click="statusSubmit(scope.$index, scope.row)"-->
                    <!--:disabled="scope.row.status === -1">-->
                    <!--{{ scope.row.status === 1 ? '停用' : scope.row.status === 0 ? '启用' : '已删除' }}-->
                    <!--</el-button>-->
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <!--<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>-->
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <!--<el-button type="danger" @click="batchAction('remove')" :disabled="this.sels.length===0">批量删除-->
            <!--</el-button>-->
            <!--<el-button type="warning" @click="batchAction('disable')" :disabled="this.sels.length===0">批量禁用-->
            <!--</el-button>-->
            <!--<el-button type="primary" @click="batchAction('active')" :disabled="this.sels.length===0">批量启用-->
            <!--</el-button>-->
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pagesize"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>
    </section>
</template>

<script>
  import util from '@/utils/js';
  import UE from '@/components/UEditor';
  import Uploader from '@/components/Uploader';

  export default {
    data() {
      return {
        options: {
          type: {
            1: '普通',
            2: '奖励'
          },
          // 10：刮刮卡 11 大转盘 12 红包
          template: {
            10: '刮刮卡',
            11: '大转盘',
            12: '红包'
          }
        },
        filters: {
          value: '',
          key: '',
          options: [{value: '', label: '全部'}]
        },
        list: [],
        value: '',
        total: 0,
        page: 1,
        pagesize: 10,
        listLoading: false,
        sels: [] //列表选中列
      };
    },
    methods: {
      // 格式化更新时间
      formateDate(row, column) {
        return ` ${util.formatDate.format(
          new Date(row.update_time * 1000),
          'yyyy-MM-dd hh:mm:ss'
        )}`;
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
        const res = await this.$http.post(`adminActivityList`, params);
        this.listLoading = false;
        if (res === null) return;
        this.pagesize = res.param.pages.pagesize;
        this.total = res.param.pages.total;
        this.list = res.param.list;
        this.list.forEach(item => {
          if(item.active_time === '') return;
          item.active_time = JSON.parse(item.active_time);
        });
      },
      //删除
      // handleDel(index, row) {
      //   this.$confirm('确认删除该记录吗?', '提示', {
      //     type: 'warning'
      //   })
      //     .then(async () => {
      //       let params = {
      //         id: row.id,
      //         status: -1
      //       };
      //
      //       const res = await this.$http.post(`adminActivityStatus`, params);
      //       if (res === null) return;
      //       this.$message({
      //         message: '状态修改成功',
      //         type: 'success'
      //       });
      //       row.status = -1;
      //       this.getListData();
      //     })
      //     .catch(() => {});
      // },
      //显示编辑界面
      handleEdit(index, row) {
        this.$router.push({name: '编辑活动', params: {id: row.id}});
      },
      //显示新增界面
      handleAdd() {
        this.$router.push({name: '创建活动'});
      },
      // 修改状态
      // async statusSubmit(index, row) {
      //   let params = {
      //     ids: row.id,
      //     status: 1 - row.status
      //   };
      //
      //   const res = await this.$http.post(`adminActivityStatus`, params);
      //   if (res === null) return;
      //   this.$message({
      //     message: "状态修改成功",
      //     type: "success"
      //   });
      //   row.status = 1 - row.status;
      // },
      selsChange(sels) {
        this.sels = sels;
      },
      //批量删除
      batchAction(action) {
        //                mapadminAreaStatus
        // 三种操作：remove disable active
        let ids = this.sels.map(item => item.id).toString();
        const actions = {
          remove: {
            tip: '删除',
            api: `adminActivityStatus`
          },
          disable: {
            tip: '停用',
            api: `adminActivityStatus`,
            status: 0
          },
          active: {
            tip: '启用',
            api: `adminActivityStatus`,
            status: 1
          }
        };
        this.$confirm(`确认${actions[action].tip}选中记录吗？`, '提示', {
          type: 'warning'
        })
          .then(async () => {
            this.listLoading = true;
            // 非批量删除，带上 status
            let params = action !== 'remove' ? Object.assign({id: ids + '', status: actions[action].status}, params) : {ids: ids + ''};
            const res = await this.$http.post(actions[action].api, params);
            this.listLoading = false;
            if (res === null) return;
            this.$message({
              message: res.info,
              type: 'success'
            });
            this.getListData();
          })
          .catch(() => {});
      }
    },
    mounted() {
      this.getListData();
    },
    components: {
      'i-uploader': Uploader
    }
  };
</script>

<style lang="scss">

</style>