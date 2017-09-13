# 分类管理

> 本接口用于案例模块、

###涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| case_act_category | 分类表|  |

####列表接口

> 获取案例数据

+ __接口地址__： __/Caseadmin/category/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
|*page | number | 分页  从 1 开始  |
|status | number | 分页  从 1 开始  |


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
| total | number | 总数据量  |
| pagesize | number | 没页数据 |

>  list 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | string | 分类  |
| title | string | 标题 |
| update_time | number | 更新时间 |
| status | string |状态 1 可用  0 不可以 -1 删除 |
| sort | string | 排序 |
| img | string | 图标 |




###详情页面

+ __接口地址__： __/Caseadmin/category/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
|*id | string | ID |

+ __响应参数__

> 成功返回200状态码

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | string | 分类  |
| title | string | 标题 |
| update_time | number | 更新时间 |
| status | string |状态 1 可用  0 不可以 -1 删除 |
| sort | string | 排序 |
| img | string | 图标 |
| pid | string | 上级分类 |



+ __示例__

``` javascript
```

###详情页面

+ __接口地址__： __/Caseadmin/category/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| title | string | 标题 |
| update_time | number | 更新时间 |
| status | string |状态 1 可用  0 不可以 -1 删除 |
| sort | string | 排序 |
| img | string | 图标 |
| pid | string | 上级分类 |

+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```


###详情页面

+ __接口地址__： __/Caseadmin/category/update__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | string | ID |
| title | string | 标题 |
| update_time | number | 更新时间 |
| status | string |状态 1 可用  0 不可以 -1 删除 |
| sort | string | 排序 |
| img | string | 图标 |
| pid | string | 上级分类 |

+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```

###  修改状态

+ __接口地址__： __/Caseadmin/category/status__

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

###  删除

+ __接口地址__： __/Caseadmin/category/delete__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | number |  案例ID |

+ __响应参数__

> 成功返回200状态码

+ __示例__

``` javascript
```


### 获取广告位（带深度信息）

> 用于下拉框

+ __接口地址__： __/Caseadmin/category/select_

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | Number | ID |

+ __响应参数__

>   200 成功

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | Number |ID |
| title | string | 标题 |
| dep | Number | 深度  前端请替换成空格或者图形 |
| pid | Number | 上级|
