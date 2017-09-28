# 楼盘地图前端接口文档


> 本接口用于案例模块、

### 涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| kfw_project_list| 楼盘列表|


#### 获取市所有楼盘总数

> 获取案例数据

+ __接口地址__： __/Map/Houses/count__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| city_id | int(11) | 城市id 默认为杭州 |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| count | int(11) | 楼盘总数 |



### 获取区域的坐标和楼盘总数

+ __接口地址__： __/Map/Houses/citycount__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| city_id | int(11) | 城市id 默认为杭州 |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| count | int(11) | 楼盘总数 |
| longitude  | decimal(10) | 经度 |
| latitude | decimal(10) | 纬度 |


### 获取某区域的楼盘名称和均价

+ __接口地址__： __/Map/Houses/houses__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| zone_id  | int(11) | 区域id |
| page | int(11) | 页数 |
| count | int(11) | 条数 |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int(11) | 楼盘id |
| title   | varchar(255) | 楼盘名字 |
| avg_price | decimal(10) | 均价 |
| longitude | decimal(10) | 经度 |
| latitude | decimal(10) | 纬度 |
| sale_status | tinyint(1) | 售楼状态 |


### 获取楼盘详情

+ __接口地址__： __/Map/Houses/details__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id  | int(11) | 楼盘id |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int(11) | 楼盘id |
| title   | varchar(255) | 楼盘名字 |
| avg_price | decimal(10) | 均价 |
| house_type | varchar(50) | 主推户型 |
| address  | varchar(255) | 地址 |
| sell_phone  | varchar(255) | 销售热线 |
| cover   | varchar(255) | 封面图片 |



### 搜索

+ __接口地址__： __/Map/Houses/search__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| zone  | int | 区域id |
| page | int | 页数 |
| count | int | 条数 |
| search | varchar | 搜索框条件 |
| main_area | int | 户型面积 |
| underground | int | 地铁线路 |
| price | int | 均价 |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int(11) | 楼盘id |
| title   | varchar(255) | 楼盘名字 |
| avg_price | decimal(10) | 均价 |
| longitude | decimal(10) | 经度 |
| latitude | decimal(10) | 纬度 |
| sale_status | tinyint(1) | 售楼状态 |



### 搜索条件数组

+ __接口地址__： __/Map/Houses/array__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| main_area | Object | 户型面积 |
| underground   | Object | 地铁 |
| price | Objec | 均价 |
| zone | Object | 区域 |