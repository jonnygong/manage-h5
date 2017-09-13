# 广告相关接口

> 获取广告数据接口

----------------
### 获取广告位置列表

> 广告位置数据

+ __接口地址__： __/Caseadmin/Adsplace/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *page | Number | 分页 默认1  |

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
| id  | String | 广告ID |
| name | String | 广告位名称 |
| width | Number | 广告位宽度 |
| height | number | 广告位高度 |
| status | number | 状态 |
| create_time | number | 创建时间 |
| pid | number | 上级 |


### 获取广告位置详细信息

+ __接口地址__： __/Caseadmin/Adsplace/info__ `get`

+ __请求参数__

> 默认情况下按最新的文字排序，就是最新的文章在最前面

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | Number | 广告位置 |

+ __响应参数__

>   param 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id  | String | 广告ID |
| name | String | 广告位名称 |
| width | Number | 广告位宽度 |
| height | number | 广告位高度 |
| status | number | 状态 |
| create_time | number | 创建时间 |
| pid | number | 上级 |

### 添加广告位置信息

+ __接口地址__： __/Caseadmin/Adsplace/add__

+ __请求参数__

> 默认情况下按最新的文字排序，就是最新的文章在最前面

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| name | String | 广告位名称 |
| width | Number | 广告位宽度 |
| height | number | 广告位高度 |
| status | number | 状态 |
| pid | number | 上级 |

+ __响应参数__

>   param 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id  | String | 广告ID |
| name | String | 广告位名称 |
| width | Number | 广告位宽度 |
| height | number | 广告位高度 |
| status | number | 状态 |
| create_time | number | 创建时间 |
| pid | number | 上级 |

### 更新广告位置信息

+ __接口地址__： __/Caseadmin/Adsplace/update__

+ __请求参数__

> 默认情况下按最新的文字排序，就是最新的文章在最前面

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id  | String | 广告ID |
| name | String | 广告位名称 |
| width | Number | 广告位宽度 |
| height | number | 广告位高度 |
| status | number | 状态   1 可以使用 0 不可以使用 -1 删除 |
| pid | number | 上级 |

+ __响应参数__

>   param 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id  | String | 广告ID |
| name | String | 广告位名称 |
| width | Number | 广告位宽度 |
| height | number | 广告位高度 |
| status | number | 状态 |
| create_time | number | 创建时间 |
| pid | number | 上级 |


+ __接口地址__： __/Caseadmin/Adsplace/delete__

+ __请求参数__

> 默认情况下按最新的文字排序，就是最新的文章在最前面

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *token | Number | token |
| *id  | String | 广告ID |
+ __响应参数__

> 成功返回200 是否返回情况状态码文档

### 状态修改接口

> 通过广告位置获取广告数据

+ __接口地址__： __/Caseadmin/Adsplace/status_

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | Number | 广告ID |
| *status | Number | 状态修改 1 开启  0 关闭  -1 删除 |

+ __响应参数__

>   200 成功

### 获取广告位（带深度信息）

> 用于下拉框

+ __接口地址__： __/Caseadmin/Adsplace/select_

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | Number | ID |

+ __响应参数__

>   200 成功

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | Number | ID |
| title | string | 标题 |
| dep | Number | 深度  前端请替换成空格或者图形 |
| pid | Number | 上级|
