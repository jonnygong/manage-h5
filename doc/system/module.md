# 模块管理 接口文档

> 本接口用于案例模块、

###涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| kfw_module| 模块管理|


####列表接口

> 获取案例数据

+ __接口地址__： __/System/Module/list__

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
| name | int(11) | 模型名称 |
| create_time | int(11) |  |
| update_time | int(11) |  |
| adminurl | varchar(50) | 路由地址 |
| info | varchar(255) | 模型描述 |
| mb_url | varchar(255) | 展示端url |


###详情页面

+ __接口地址__： __/System/Module/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | int | id |

+ __响应参数__

> 成功返回200状态码

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| name | int(11) | 模型名称 |
| create_time | int(11) |  |
| update_time | int(11) |  |
| adminurl | varchar(50) | 路由地址 |
| info | varchar(255) | 模型描述 |
| mb_url | varchar(255) | 展示端url |

+ __示例__

``` javascript

```

###新增接口

+ __接口地址__： __/System/Module/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| name | int(11) | 模型名称 |
| create_time | int(11) |  |
| update_time | int(11) |  |
| adminurl | varchar(50) | 路由地址 |
| info | varchar(255) | 模型描述 |
| mb_url | varchar(255) | 展示端url |

+ __响应参数__

> 成功返回200状态码

+ __示例__

``` javascript

```


###修改接口

+ __接口地址__： __/System/Module/update__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| name | int(11) | 模型名称 |
| create_time | int(11) |  |
| update_time | int(11) |  |
| adminurl | varchar(50) | 路由地址 |
| info | varchar(255) | 模型描述 |
| mb_url | varchar(255) | 展示端url |


+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```

###  修改状态

+ __接口地址__： __/System/Module/status__

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

+ __接口地址__： __/System/Module/delete__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | number |  案例ID |

+ __响应参数__

> 成功返回200状态码

+ __示例__

``` javascript
```
