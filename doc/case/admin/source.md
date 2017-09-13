# 来源管理

> 本接口用于案例模块、

###涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| case_source | 访问的用户信息|  |

####列表接口

> 获取案例数据

+ __接口地址__： __/Caseadmin/source/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
|*page | number | 分页  从 1 开始  |
|status | number | 状态 |


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
| id | string | 分类  |
| title | string | 标题 |
| update_time | number | 更新时间 |
| clicks | string | 访问次数 |
| status | string |状态 1 可用  0 不可以 -1 删除 |



###详情页面

+ __接口地址__： __/Caseadmin/source/info__

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
| tips | string | 摘要信息 |
| content | string | 详细信息 |
| cover | string | 头图 |
| clicks | string | 访问次数 |

+ __示例__

``` javascript
```

###详情页面

+ __接口地址__： __/Caseadmin/source/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| title | string | 标题 |
| tips | string | 摘要信息 |
| content | string | 详细信息 |
| cover | string | 头图 |
| clicks | number | 访问次数  默认0 |
| sort | number | 排序 默认255 |

+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```


###详情页面

+ __接口地址__： __/Caseadmin/source/update__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | string | ID |
| title | string | 标题 |
| tips | string | 摘要信息 |
| content | string | 详细信息 |
| cover | string | 头图 |
| clicks | string | 访问次数  默认0 |
| sort | number | 排序 默认255 |

+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```

###  修改状态

+ __接口地址__： __/Caseadmin/source/status__

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

+ __接口地址__： __/Caseadmin/source/delete__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | number |  案例ID |

+ __响应参数__

> 成功返回200状态码

+ __示例__

``` javascript
```
