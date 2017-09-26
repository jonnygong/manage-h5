
# 区域管理 接口文档

> 本接口用于案例模块、

###涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| kfw_project_area| 区域管理|


####列表接口

> 获取案例数据

+ __接口地址__： __/Mapadmin/Area/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *page | int | 当前页 默认1 |
| pid  | int | 当前页 默认0   |


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
| zone_id | int(11) | 区域id |
| longitude | decimal(10,6) | 经度 |
| latitude | decimal(10,6) | 纬度 |
| status | tinyint(1) |  |
| name | varchar(255) | 区域名字 |
| pid | int(11) | 上级 |
| house_count | int(11) |  可售楼盘 |
| avg_price | decimal(9,1) | 区域均价 |
| city_id | int(11) | 城市 |
| sort | int(3) | 排序 |




###详情页面

+ __接口地址__： __/Mapadmin/Area/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | int | id |


+ __响应参数__

> 成功返回200状态码

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| zone_id | int(11) | 区域id |
| longitude | decimal(10,6) | 经度 |
| latitude | decimal(10,6) | 纬度 |
| status | tinyint(1) |  |
| name | varchar(255) | 区域名字 |
| pid | int(11) | 上级 |
| house_count | int(11) | 可售楼盘 |
| avg_price | decimal(9,1) | 区域均价 |
| city_id | int(11) | 城市 |
| sort | int(3) | 排序 |


+ __示例__

``` javascript

```

###新增接口

+ __接口地址__： __/Mapadmin/Area/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| zone_id | int(11) | 区域id |
| longitude | decimal(10,6) | 经度 |
| latitude | decimal(10,6) | 纬度 |
| status | tinyint(1) |  |
| name | varchar(255) | 区域名字 |
| pid | int(11) | 上级 |
| house_count | int(11) | 区域可售楼盘 |
| avg_price | decimal(9,1) | 区域均价 |
| city_id | int(11) | 城市 |
| sort | int(3) | 排序 |


+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```


###修改接口

+ __接口地址__： __/Mapadmin/Area/update__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| zone_id | int(11) | 区域id |
| longitude | decimal(10,6) | 经度 |
| latitude | decimal(10,6) | 纬度 |
| status | tinyint(1) |  |
| name | varchar(255) | 区域名字 |
| pid | int(11) | 上级 |
| house_count | int(11) | 区域可售楼盘 |
| avg_price | decimal(9,1) | 区域均价 |
| city_id | int(11) | 城市 |
| sort | int(3) | 排序 |


+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```

###  修改状态

+ __接口地址__： __/Mapadmin/Area/status__

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

+ __接口地址__： __/Mapadmin/Area/delete__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | number |  案例ID |

+ __响应参数__

> 成功返回200状态码

+ __示例__

``` javascript
```
