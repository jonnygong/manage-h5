# 初始化模块数据文档

+ 作者：qqs

+ 调用： https://api.kfw001.com/模型/控制器/方法(252)

+ 参数前有*为必填

### 涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| shop_config | 模型管理表 |



### 获取设置信息

+ __接口说明__： __用于获取该商铺配置信息__

+ __接口地址__： __/Shopadmin/Config/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *public_id | int | 公众号id |
| *project_id | int | 模块id |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| name | string | 商铺名称 |
| description | string | 商铺描述 |
| logo | string | 店铺logo |
| link_man | string | 联系人 |
| link_tel | string | 联系人电话 |
| link_address | string | 联系人地址 |
| type | int | 页面模式1双栏，2单栏 |
| color | string | 主色调 |



### 保存设置信息

+ __接口说明__： __用于保存该商铺配置信息__

+ __接口地址__： __/Shopadmin/Config/save__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *name | string | 商铺名称 |
| *description | string | 商铺描述 |
| *logo | string | 店铺logo |
| *link_man | string | 联系人 |
| *link_tel | string | 联系人电话 |
| *link_address | string | 联系人地址 |
| type | int | 页面模式1双栏，2单栏 |
| color | string | 主色调 |
| *project_id | int | 项目id |
| *public_id | int | 公众号id |
| id | int | id，第一次设置为创建无id，第二次及后设置为修改有id |


+ __响应参数__

> 成功返回200状态码