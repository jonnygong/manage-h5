

# 广告管理接口文档

> 本接口用于案例模块、

###涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| kfw_project_ad| 区域管理|


####列表接口

> 获取案例数据

+ __接口地址__： __/Map/Ad/list__

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
| name | varchar(50) | 广告名称 |
 cove | varchar(500) | 图片地址 |
| link | varchar(500) | 图片地址 |
| place | varchar(32) | 位置：1首页2搜索文件广告99其它位置 |
| sort | int(11) | 排序 |

###详情页面

+ __接口地址__： __/Map/Ad/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | int | id |


+ __响应参数__

> 成功返回200状态码

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| name | varchar(50) | 广告名称 |
| end_time | int(11) | 结束时间 |
| start_time | int(11) | 开始时间 |
| cove | varchar(500) | 图片地址 |
| link | varchar(500) | 图片地址 |
| cid | int(11) | 客户Id |


+ __示例__

``` javascript

```
