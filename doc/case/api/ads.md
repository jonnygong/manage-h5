# 广告相关接口

> 获取广告数据接口

----------------

#  广告接口

### 获取广告数据接口

> 通过广告位置获取广告数据

+ __接口地址__： __/Cases/Ads/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *pid | Number | 广告位置: 1 首页 2 详细页 |
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

### 获取广告数据接口

> 通过广告位置获取广告数据

+ __接口地址__： __/Cases/Ads/info__ `get`

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
| order | Number |排序 |
