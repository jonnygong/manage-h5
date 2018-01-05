# 快房问答后台管理系统

## 目录结构

```
.
│  .babelrc                         # babel 配置
│  .gitignore                       # git 忽略文件或文件夹配置
│  debug.log                        # 日志文件
│  package-lock.json                # npm 安装依赖后存在的文件
│  LICENSE                          # 版权说明
│  README.md                        # 说明文档
│  index.html                       # 页面入口
│  package.json                     # 构建项目所需的命令及依赖
│
├─build                             # webpack 配置文件
│      build.js
│      check-versions.js
│      dev-client.js
│      dev-server.js
│      utils.js
│      vue-loader.conf.js
│      webpack.base.conf.js
│      webpack.dev.conf.js
│      webpack.prod.conf.js
│      
├─config                            # 项目主配置文件
│      dev.env.js
│      index.js                     # 用于调试端口修改及发布路径修改
│      prod.env.js
│      
├─src
│  │  App.vue                       # app 主组件
│  │  main.js                       # app 入口文件
│  │  routes.js                     # 路由文件
│  │
│  ├─api                            # 接口文件
│  │      api.js
│  │      index.js
│  │     
│  ├─assets                         # 模块静态资源（可被 webpack 打包）
│  │  ├─images                      # 图片资源 
│  │  │      loggeduser.png
│  │  │      logo.png
│  │  │      
│  │  └─theme                       # 后台模板主题文件
│  │      ├─theme-darkblue
│  │      └─theme-green
│  │        
│  ├─common
│  │  └─js                          # 通用js文件
│  │          util.js
│  │
│  ├─components                     # UI通用组件
│  │  │  .gitkeep
│  │  │  
│  │  └─UEditor                     # 富文本组件
│  │          UEditor.vue
│  │          
│  ├─styles                         # 通用样式
│  │      vars.scss
│  │      
│  ├─utils                          # 通用工具函数
│  │  └─js
│  │          index.js
│  │          
│  ├─views                          # 后台页面文件
│  │  ├─KfwQA                       # 快房问答后台
│  │  │  ├─Expert                   # 专家管理
│  │  │  │      Expert.vue
│  │  │  │      
│  │  │  ├─Questions                # 快房问答
│  │  │  │      Pump.vue
│  │  │  │      Questions.vue
│  │  │  │      
│  │  │  └─QuestionsType            # 问答分类
│  │  │          QuestionsType.vue
│  │  │          
│  │  ├─Main                        # 主页面框架
│  │  │      Main.scss
│  │  │      Main.vue
│  │  │      
│  │  └─Welcome                     # 欢迎页
│  │          Welcome.scss
│  │          Welcome.vue
│  │
│  └─vuex                           # vuex
│          actions.js
│          getters.js
│          store.js
│          
└─static                            # 静态资源（不被 webpack 处理）
    │  .gitkeep
    │  
    └─ueditor                       # UEditor 库
        │  ueditor.config.js        # UEditor 库配置文件
        └─ ...
```

## 测试、部署说明

### 开发调试
```bash
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

> 发布目录 /admin/ask