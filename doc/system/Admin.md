# 用户管理文档

+ 作者：qqs

+ 调用： https://api.kfw001.com/模型/控制器/方法(247)

+ 参数前有*为必填

### 涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| kfw_public | 公众号管理表 |
| kfw_module | 模块管理表 |
| case_rbac_admin | 用户管理表 |



### 列表接口

+ __接口说明__： __用于显示已添加的用户账号__

+ __接口地址__： __/System/Admin/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| page | int | 当前页 默认1 |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| pages | Object | 总数据， 用于分页 |
| list | Object | 数据相关 |

>  pages 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| total | number | 总数据量  |
| pagesize | number |  每页数据 |

>  list 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | ID |
| email | string | 登录邮箱 |
| realname | string | 真名 |
| tel | string | 手机号码 |
| thumb | string | 头像 |
| status | int | 状态-1删除，0禁用，1启用 |



### 数组

+ __接口说明__： __用于获取添加修改的所有公众号和模块集__

+ __接口地址__： __/System/Admin/array__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |


+ __响应参数__

> 成功返回200状态码  

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| public | object | 所有公众号 |
| module | object | 所有模块 |



### 详情页面

+ __接口说明__： __用于获取用户详情__

+ __接口地址__： __/System/Admin/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | int | ID |


+ __响应参数__

> 成功返回200状态码  

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | ID |
| email | string | 登录邮箱 |
| realname | string | 真名 |
| tel | string | 手机号码 |
| thumb | string | 头像 |
| status | int | 状态-1删除，0禁用，1启用 |
| module_id | string | 模块集 |
| public_id | string | 公众号集 |



### 新增页面

+ __接口说明__： __用于新添加用户信息__

+ __接口地址__： __/System/Admin/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *email | string | 登录邮箱 |
| *realname | string | 真名 |
| *module_id | string | 模块集 |
| *public_id | string | 公众号集 |
| *password | string | 密码 |
| tel | string | 手机号码 |
| thumb | string | 头像 |


+ __响应参数__

> 成功返回200状态码




### 修改页面

+ __接口说明__： __用于修改用户信息__

+ __接口地址__： __/System/Admin/update__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *email | string | 登录邮箱 |
| *realname | string | 真名 |、
| *module_id | string | 模块集 |
| *public_id | string | 公众号集 |
| tel | string | 手机号码 |
| thumb | string | 头像 |
| password | string | 密码,不修改密码为空上传 |


+ __响应参数__

> 成功返回200状态码




### 修改状态

+ __接口说明__： __用于修改用户账号状态，可多选__

+ __接口地址__： __/System/Admin/status__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| ids | string | ID集，集格式为'1,2,3,4' |
| status | int | 1 开启  0 关闭  -1 删除  |


+ __响应参数__

> 成功返回200状态码

