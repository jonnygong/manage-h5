<template>
    <el-row class="container">
        <el-col :span="24" class="header">
            <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
                {{collapsed ? '' : sysName}}
            </el-col>
            <el-col :span="1">
                <div class="tools" @click.prevent="collapse">
                    <i class="fa fa-align-justify"></i>
                </div>
            </el-col>
            <el-col :span="12">
                <el-tooltip content="点击可切换公众号" placement="right" effect="light" style="cursor: pointer">
                    <span @click="handleChange('wechat')">当前公众号：{{ curWechat }}</span>
                </el-tooltip>
                <span style="margin: 0 10px">|</span>
                <el-tooltip content="点击可切换项目" placement="right" effect="light" style="cursor: pointer">
                    <span @click="handleChange('project')">当前项目：{{ curProject }}</span>
                </el-tooltip>
            </el-col>
            <el-col :span="4" class="userinfo">
                <el-dropdown trigger="hover">
                    <span class="el-dropdown-link userinfo-inner"><img
                            :src="this.sysUserAvatar"/> {{sysUserName}}</span>
                    <el-dropdown-menu slot="dropdown">
                        <!--<el-dropdown-item>我的消息</el-dropdown-item>-->
                        <!--<el-dropdown-item>设置</el-dropdown-item>-->
                        <!--<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>-->
                        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>
        <el-col :span="24" class="main">
            <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
                <!--导航菜单-->
                <el-menu :default-active="$route.path" class="el-menu-vertical-aliyun" @open="handleopen"
                         @close="handleclose" @select="handleselect" :collapse="collapsed"
                         unique-opened router>
                    <template v-for="(item,index) in nav">
                        <!-- 二级菜单 -->
                        <el-submenu :index="index+''"
                                    v-if="item.children && item.children.length > 0">
                            <!-- 二级菜单顶级 -->
                            <template slot="title">
                                <i :class="['icon',item.iconCls]"></i>
                                <span slot="title">{{item.name}}</span>
                            </template>
                            <!-- 二级菜单下级 -->
                            <el-menu-item-group style="overflow: hidden">
                                <!--<span slot="title">{{item.name}}</span>-->
                                <!-- && child.url-->
                                <template v-for="child in item.children">
                                    <!--无三级菜单-->
                                    <el-menu-item
                                            :index="child.url"
                                            :key="child.url"
                                            v-if="!child.children">
                                        {{child.name}}
                                    </el-menu-item>
                                    <!--有三级菜单-->
                                    <el-submenu
                                            :index="child.url"
                                            :key="child.url"
                                            v-if="child.children">
                                        <span slot="title">{{child.name}}</span>
                                        <el-menu-item v-for="subChild in child.children"
                                                      :index="subChild.url"
                                                      :key="subChild.url">
                                            {{subChild.name}}
                                        </el-menu-item>
                                    </el-submenu>
                                </template>
                            </el-menu-item-group>
                        </el-submenu>
                        <!-- 一级菜单 -->
                        <el-menu-item v-if="!item.children"
                                      :index="item.url">
                            <i :class="['icon',item.iconCls]"></i>
                            <span slot="title">{{item.name}}</span>
                        </el-menu-item>

                    </template>
                </el-menu>

            </aside>
            <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="breadcrumb-container">
                        <strong class="title">{{$route.name}}</strong>
                        <el-breadcrumb separator="/" class="breadcrumb-inner">
                            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                                {{ item.name }}
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </section>
        </el-col>
    </el-row>
</template>

<script>
  import api from '@/api';

  export default {
    data() {
      return {
        sysName: '快房传媒管理后台',
        collapsed: false,
        sysUserName: '',
        sysUserAvatar: '',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      };
    },
    computed: {
      curProject() {
        return this.$store.state.project_name;
      },
      curWechat() {
        return this.$store.state.wechat_name;
      },
      // 导航菜单
      nav() {
        return this.$store.state.nav;
      }
    },
    methods: {
      handleChange(type) {
        if (type === 'project') {
          this.$store.dispatch('clear_project');
          window.location.replace('/admin/#/project');
        } else {
          this.$store.dispatch('clear_wechat');
          window.location.replace('/admin/#/');
        }
      },
      handleopen() {
        //console.log('handleopen');
      },
      handleclose() {
        //console.log('handleclose');
      },
      handleselect(a, b) {
      },
      //退出登录
      logout() {
        let _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          this.$store.dispatch('login_out');
          _this.$router.push('/login');
        }).catch(() => {

        });
      },
      //折叠导航栏
      collapse() {
        this.collapsed = !this.collapsed;
      }
    },
    mounted() {
      this.sysUserName = sessionStorage.getItem('USER_NAME') || '';
      this.sysUserAvatar = require('@/assets/user.png');

      api.getUserAuth({}).then((res) => {
        this.listLoading = false;
        if (res.data.status === 200 && res.data.param === 'true') {
          this.$store.dispatch('add_setting_nav');
        }
      });

    }
  };

</script>

<style scoped lang="scss">
    @import "Main";
</style>