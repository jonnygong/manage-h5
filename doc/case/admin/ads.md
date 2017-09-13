# 广告相关接口

#  广告接口

### 获取广告数据接口

> 通过广告位置获取广告数据

+ __接口地址__： __/Caseadmin/Ads/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *pid | Number | 广告位置: 1 首页 2 详细页 |

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
| name | String | 广告名称 |
| cover | Number | 广告头图 |
| link | String | 广告链接，点击头图需要跳转的 |
| create_time | Number | 创建时间 |
| start_time | Number | 开始时间 |
| end_time | Number | 结束时间 |
| click | Number | 点击量 |
| status | Number | 状态 1  |



### 获取广告数据接口

> 通过广告位置获取广告数据

+ __接口地址__： __/Caseadmin/Ads/info__ `get`

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | Number | 广告id |

+ __响应参数__

>   param 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id  | String | 广告ID |
| name | String | 广告名称 |
| cover | Number | 广告头图 |
| link | String | 广告链接，点击头图需要跳转的 |
| create_time | Number | 创建时间 |
| click | Number | 点击量 |
| start_time | Number |广告活动开始时间 |
| end_time | Number |广告活动结束时间 |
| status | Number |活动状态 |
| paid | Number |广告位置id |
| sort | Number |排序   默认255 |


### 添加广告数据接口

> 通过广告位置获取广告数据

+ __接口地址__： __/Caseadmin/Ads/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| name | String | 广告名称 |
| cover | Number | 广告头图 |
| link | String | 广告链接，点击头图需要跳转的 |
| start_time | Number |广告活动开始时间 |
| end_time | Number |广告活动结束时间 |
| paid | Number |广告位置id |
| sort | Number |排序 |

+ __响应参数__

>   param 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id  | String | 广告ID |
| name | String | 广告名称 |
| cover | Number | 广告头图 |
| link | String | 广告链接，点击头图需要跳转的 |
| click | Number | 点击量 |
| start_time | Number |广告活动开始时间 |
| end_time | Number |广告活动结束时间 |
| status | Number |活动状态 |
| paid | Number |广告位置id |
| sort | Number |排序 |

### 更新广告数据接口

> 通过广告位置获取广告数据

+ __接口地址__： __/Caseadmin/Ads/update__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | Number | 广告ID |
| name | String | 广告名称 |
| cover | Number | 广告头图 |
| link | String | 广告链接，点击头图需要跳转的 |
| click | Number | 点击量 |
| start_time | Number |广告活动开始时间 |
| end_time | Number |广告活动结束时间 |
| status | Number |活动状态 |
| paid | Number |广告位置id |
| sort | Number |排序 |

+ __响应参数__

>   param 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id  | String | 广告ID |
| name | String | 广告名称 |
| cover | Number | 广告头图 |
| link | String | 广告链接，点击头图需要跳转的 |
| click | Number | 点击量 |
| start_time | Number |广告活动开始时间 |
| end_time | Number |广告活动结束时间 |
| status | Number |活动状态 |
| paid | Number |广告位置id |
| order | Number |排序 |

### 删除广告数据接口

> 通过广告位置获取广告数据

+ __接口地址__： __/Caseadmin/Ads/delete__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | Number | 广告ID |

+ __响应参数__

>   200 成功

### 状态修改接口

> 通过广告位置获取广告数据

+ __接口地址__： __/Caseadmin/Ads/status_

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | Number | 广告ID |
| *status | Number | 状态修改 1 开  0 关闭  -1 删除 |

+ __响应参数__

>   200 成功
