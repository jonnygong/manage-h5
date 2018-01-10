# 快房传媒幸运大转盘管理后台

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
│   │   ├── images
│   │   │   ├── loggeduser.png       # 用户头像
│   │   │   ├── logo.png             # 快房传媒 logo
│   │   │   └── phone.png            # 手机外框图
│   │   └── theme                    # 后台模板主题文件
│   │       ├── theme-darkblue
│   │       └── theme-green
│   ├── configs                      # 项目配置文件 
│   │   ├── api.js                   # 接口
│   │   └── index.js
│   ├── components                   # UI 通用组件
│   │   ├── UEditor                  # UEditor 富文本编辑器
│   │   │   └── UEditor.vue
│   │   └── Uploader                 # 单个图片上传
│   │       ├── Uploader.vue
│   │       └── index.js
│   ├── main.js                      # app 入口文件
│   ├── plugins                      # 项目插件
│   │   ├── axios                    # Ajax 请求 
│   │   │   ├── fn
│   │   │   │   ├── config.js        # axios 相关配置
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   ├── fastclick                # 移动端防止点击穿透 
│   │   │   └── index.js
│   │   ├── index.js
│   │   ├── router                   # Vue Router
│   │   │   ├── index.js
│   │   │   └── routes
│   │   │       └── index.js
│   │   ├── store                    # Vuex
│   │   │   ├── actions
│   │   │   │   ├── data.js
│   │   │   │   └── index.js
│   │   │   ├── getters
│   │   │   │   └── index.js
│   │   │   ├── index.js
│   │   │   ├── mutations
│   │   │   │   └── index.js
│   │   │   └── state
│   │   │       └── index.js
│   │   ├── tree-grid                # 树形表格 
│   │   │   └── index.js
│   │   └── vue-baidu-map            # 百度地图 
│   │       └── index.js
│   ├── styles                       # 通用样式
│   │   └── vars.scss
│   ├── utils                        # 通用工具函数
│   │   └── js
│   │       └── index.js
│   └── views
│       ├── .DS_Store
│       ├── Create                   # 新增
│       │   ├── Create.scss
│       │   └── Create.vue
│       ├── Edit                     # 编辑
│       │   ├── Edit.scss
│       │   └── Edit.vue
│       ├── List                     # 活动列表
│       │   ├── List.scss
│       │   └── List.vue
│       ├── Main                     # 主页面框架
│       │   ├── Main.scss
│       │   └── Main.vue
│       └── Welcome                  # 欢迎界面
│           ├── Welcome.scss
│           └── Welcome.vue
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
``` bash
# 安装依赖
npm install 或 yarn

# 本地调试 localhost:8080
npm run dev
```

### 上线部署

```
# 构建部署
npm run build
```

> 发布目录 `/admin/wheel`

