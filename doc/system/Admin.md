# 用户管理 接口文档

> 本接口用于案例模块、

###涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| case_rbac_admin| 用户管理|


####列表接口

- 获取用户列表，但是不会获取超级用户

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
| pid | int(11) | 父级ID |
| level | int(11) | 人员等级 |
| email | varchar(255) | 用户名 |
| status | tinyint(1) | 状态 |
| realname | varchar(255) | 真名 |
| tel | varchar(255) | 联系电话 |
| thumb | varchar(255) | 用户头像 |
| password | varchar(255) | 密码 |
| path | varchar(255) | 层级路径 |
| role_id | int(1) | 角色ID |
| client_id | int(11) | 客户编号 |
| update_time | int(11) | 更新时间 |
| create_time | int(11) | 创建时间 |



###详情页面

+ __接口地址__： __/System/Admin/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | int | id |


+ __响应参数__

> 成功返回200状态码

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| pid | int(11) | 父级ID |
| level | int(11) | 人员等级 |
| email | varchar(255) | 用户名 |
| status | tinyint(1) | 状态 |
| realname | varchar(255) | 真名 |
| tel | varchar(255) | 联系电话 |
| thumb | varchar(255) | 用户头像 |
| password | varchar(255) | 密码 |
| path | varchar(255) | 层级路径 |
| role_id | int(1) | 角色ID |
| client_id | int(11) | 客户编号 |
| update_time | int(11) | 更新时间 |
| create_time | int(11) | 创建时间 |


+ __示例__

``` javascript

```

###新增接口

+ __接口地址__： __/System/Admin/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *email | varchar(255) | 用户名 |
| *password | varchar(255) | 密码 |
| *realname | varchar(255) | 真名 |
| status | tinyint(1) | 状态 |
| tel | varchar(255) | 联系电话 |
| thumb | varchar(255) | 用户头像 |
| pid | int(11) | 父级ID |
| level | int(11) | 人员等级 |
| path | varchar(255) | 层级路径 |
| role_id | int(1) | 角色ID |
| client_id | int(11) | 客户编号 |
| update_time | int(11) | 更新时间 |
| create_time | int(11) | 创建时间 |


+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```

###修改接口

+ __接口地址__： __/System/Admin/update__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *email | varchar(255) | 用户名 |
| *password | varchar(255) | 密码 |
| *realname | varchar(255) | 真名 |
| status | tinyint(1) | 状态 |
| tel | varchar(255) | 联系电话 |
| thumb | varchar(255) | 用户头像 |
| pid | int(11) | 父级ID |
| level | int(11) | 人员等级 |
| path | varchar(255) | 层级路径 |
| role_id | int(1) | 角色ID |
| client_id | int(11) | 客户编号 |
| update_time | int(11) | 更新时间 |
| create_time | int(11) | 创建时间 |

+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```

###  修改状态

+ __接口地址__： __/System/Admin/status__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | number |  案例ID |
| *status | number | 1 开启  0 关闭  -1 删除  |

+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```

###  删除接口

- 不可以删除root 用户

+ __接口地址__： __/System/Admin/delete__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | number |  案例ID |

+ __响应参数__

> 成功返回200状态码

+ __示例__

``` javascript
```

###  用户模块授权接口

- 允许一次授权多个模块

+ __接口地址__： __/System/Admin/module__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | number |  案例ID |
| ids | number |  模块ID |

+ __响应参数__

> 成功返回200状态码

+ __示例__

``` javascript
```

### 获取用户可用模块

- 通过用户的ID，获取用户可用的模块数据

+ __接口地址__： __/System/Admin/modules__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | string | 用户ID |

+ __响应参数__

>   param 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| name | string | 模块名称 |
| url | string | 模块路由 |
