<template>
  <div class="join">
    <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
    <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>

    <span class="btn btn--enable"
          :style="{backgroundColor: `${otherData.button_bgc}`, color: `${otherData.button_color}`}"
          @click="handleJoin">立即提交
    </span>
  </div>
</template>

<script>
  export default {
    name: 'join',
    data() {
      return {
        'otherData': {
          'header': 'http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/header02.jpg',
          'qrcode': 'http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/qrcode02A.png',
          'rule': '<B>活动时间</B>：2017年12月30日——2018年1月11日中午12点 <br/><br/><B>投票规则</B>：<br/>1、每个微信ID在“滨江生活圈”和“滨江发布”两个平台均有投票机会，且票数可以叠加；<br/><br/>2、在同一个平台，每个微信ID每次仅可选择三家餐厅，且对同一家餐厅每天只可投1票，次日可继续投；<br/><br/>3、餐厅展示以首字母顺序排列，点击图片可查看餐厅详细介绍；<br/><br/>4、为了评选活动的公平进行，请勿刷票，一经发现将作废所有票数。',
          'attention': '识别图中二维码进入微信公众号，<br/>点击底部菜单栏中的“人气餐厅评选”按钮即可进入评选界面参与投票！',
          'follow': [],
          'rule_fontsize': '1.4',
          'rule_color': '#824314',
          'cat_icon': 'http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/cat_02.png',
          'cat_bgc': '#f6b51d',
          'body_bgc': '#f9e4d7',
          'button_bgc': '#f6b51d',
          'button_color': '#e2812b',
          'modal_bg': 'http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/modal_bg02.png',
          'modal_color': '#fff',
          'col_num': 2,
          'cat_max_vote': 0,
          'least_vote': [
            '=',
            '3'
          ],
          'link': ''
        },
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import "~scss_vars";

  .join {
    margin-top: 2 * $padding;
  }
</style>
