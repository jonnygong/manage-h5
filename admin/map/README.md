# 楼盘地图后台管理系统

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
│  │
│  ├─api                            # 接口文件
│  │      api.js
│  │      index.js
│  │     
│  ├─assets                         # 模块静态资源（可被 webpack 打包）
│  │  ├─images                      # 图片资源 
│  │  │       loggeduser.png
│  │  │       logo.png
│  │  │      
│  │  └─theme                       # 后台模板主题文件
│  │      ├─theme-darkblue
│  │      └─theme-green
│  │        
│  ├─configs                        # 项目配置文件 
│  │      api.js                    # 接口
│  │      index.js
│  │      
│  ├─plugins                        # 项目插件
│  │  │  index.js
│  │  │  
│  │  ├─axios                       # Ajax 请求 
│  │  │  │  index.js
│  │  │  │  
│  │  │  └─fn
│  │  │          config.js          # axios 相关配置
│  │  │          index.js
│  │  │          
│  │  ├─fastclick                   # 移动端防止点击穿透 
│  │  │      index.js
│  │  │         
│  │  ├─router                      # Vue Router
│  │  │  │  index.js
│  │  │  │  
│  │  │  └─routes
│  │  │          index.js
│  │  │          
│  │  ├─store                       # Vuex
│  │  │  │  index.js
│  │  │  │  
│  │  │  ├─actions
│  │  │  │      data.js
│  │  │  │      index.js
│  │  │  │      
│  │  │  ├─getters
│  │  │  │      index.js
│  │  │  │      
│  │  │  ├─mutations
│  │  │  │      index.js
│  │  │  │      
│  │  │  └─state
│  │  │          index.js
│  │  │          
│  │  ├─tree-grid                   # 树形表格 
│  │  │      index.js
│  │  │      
│  │  └─vue-baidu-map               # 百度地图 
│  │          index.js
│  │    
│  ├─components                     # UI通用组件
│  │  │  .gitkeep
│  │  │  
│  │  ├─UEditor                     # 富文本组件
│  │  │      index.js
│  │  │      UEditor.vue
│  │  │      
│  │  └─Uploader                    # 单图片上传组件
│  │          index.js
│  │          Uploader.vue
│  │               
│  ├─styles                         # 通用样式
│  │      vars.scss
│  │      
│  ├─utils                          # 通用工具函数
│  │  └─js
│  │          index.js
│  │          
│  └─views                          # 后台页面文件
│      ├─Adv                        # 广告管理
│      │      Adv.vue
│      │      
│      ├─Area                       # 地区管理
│      │      Area.vue
│      │      
│      ├─Estate                     # 楼盘管理
│      │      Album.vue
│      │      Estate.vue
│      │      Specs.vue
│      │      
│      ├─Main                       # 页面主结构
│      │      Main.scss
│      │      Main.vue
│      │      
│      ├─Subway                     # 地铁管理
│      │      Subway.vue
│      │      SubwayPlate.vue
│      │      
│      └─Welcome                    # 欢迎页
│              Welcome.scss
│              Welcome.vue
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

> 发布目录 /admin/map