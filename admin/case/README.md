# 快房传媒案例展示管理后台

## 目录结构
```
.
├── LICENSE                          # 版权说明
├── README.md                        # 说明文档
├── build                            # webpack 配置文件
│   ├── build.js                     
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config                           # 项目主配置文件
│   ├── dev.env.js
│   ├── index.js                     # 用于调试端口修改及发布路径修改
│   └── prod.env.js
├── index.html                       # 页面入口
├── package.json                     # 构建项目所需的命令及依赖
├── src
│   ├── App.vue                      # app 主组件
│   ├── assets                       # 模块静态资源（可被 webpack 打包）
│   │   ├── bg1.jpg                  # demo 用图（未使用）
│   │   ├── user.png                 # 用户头像
│   │   └── theme                    # 后台模板主题文件
│   │       ├── theme-darkblue
│   │       └── theme-green
│   ├── components                   # UI 通用组件
│   │   └── UEditor                  # UEditor 富文本编辑器
│   │       ├── UEditor.vue
│   │       └── index.js
│   ├── api
│   │   ├── api.js                   # 接口
│   │   └── index.js
│   ├── main.js                      # app 入口文件
│   ├── routes.js                    # Vue Router
│   ├── styles                       # 通用样式
│   │   └── vars.scss
│   ├── common
│   │   └── js
│   │       └── util.js              # 通用工具函数
│   ├── views
│   │   ├── Ads
│   │   │   ├── Ads.vue              # 广告管理
│   │   │   ├── AdsPosition.vue      # 广告位
│   │   │   └── index.js
│   │   ├── Analysis
│   │   │   └── Analysis.vue         # 统计分析
│   │   ├── Case
│   │   │   ├── CaseAct.vue          # 案例活动
│   │   │   ├── Category.vue         # 案例分类
│   │   │   └── index.js
│   │   ├── Client                   # 客户管理
│   │   │   ├── Client.scss
│   │   │   └── Client.vue
│   │   ├── Login                    # 登录页面 
│   │   │   └── Login.vue
│   │   ├── Main                     # 主页面框架
│   │   │   ├── Main.scss
│   │   │   └── Main.vue
│   │   ├── Share                    # 分享配置
│   │   │   └── Share.vue
│   │   └── Welcome                  # 欢迎界面
│   │       ├── Welcome.scss
│   │       └── Welcome.vue
│   └── vuex                         # Vuex
│       ├── actions.js
│       ├── getters.js
│       └── store.js
├── static                           # 静态资源（不被 webpack 处理）
│   └── ueditor                      # UEditor 库
│       ├── ...
├── .babelrc                         # babel 配置
├── .gitignore                       # git 忽略文件或文件夹配置
├── .postcssrc.js                    # postcss 配置
└── yarn.lock                        # yarn 安装依赖后存在的文件

```

## 测试、部署说明

### 开发调试
> 为解决跨域问题，本地需配置 `hosts` 
```
dev.kfw001.com 127.0.0.1
```
``` bash
# 安装依赖
npm install 或 yarn

# 本地调试 dev.kfw001.com:8080
npm run dev
```

### 上线部署

```
# 构建部署
npm run build
```

> 发布目录 `/admin/case`
