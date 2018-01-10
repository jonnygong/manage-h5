export default {
  // 接口请求baseUrl
  baseUrl: 'http://mp.kfw001.com/',
  // 接口文档地址
  api: {
    apiForAuth: 'http://api.mp.kfw001.com/auth/wechat/getMember',
    // apiForConfig: 'http://game.kfw001.com/game/index.php?s=share/index',
    apiForConfig: 'http://api.mp.kfw001.com/auth/wechat/jssdk',
    apiForShare: 'http://game.kfw001.com/game/index.php?s=vote/info',
    voteShow: 'vote/vote/show',
    votePoll: 'vote/vote/poll',
    voteData: 'vote/vote/info'
  }
};
