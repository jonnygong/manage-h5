# 初始化模块数据文档

+ 作者：qqs

+ 调用： https://api.kfw001.com/模型/控制器/方法(247)

+ 参数前有*为必填

### 涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| kfw_module | 模型管理表 |



### 获取设置信息

+ __接口说明__： __用于获取该模块设置信息__

+ __接口地址__： __/Newsadmin/Set/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *public_id | int | 公众号id |
| *project_id | int | 模块id |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| name | string | 模型名称 |
| info | string | 模型描述 |
| mb_url | string | 展示端url |
| custom | string | 自定义属性 |
| img | string | 首页头图 |



### 保存设置信息

+ __接口说明__： __用于保存该模块设置信息__

+ __接口地址__： __/Newsadmin/Set/save__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *name | string | 模块名称 |
| *info | int | 模型描述 |
| *mb_url | int | 展示端url |
| *img | int | 首页头图 |
| *project_id | int | 模块id |
| *public_id | int | 公众号id |
| *custom | int | 自定义属性 |


+ __响应参数__

> 成功返回200状态码