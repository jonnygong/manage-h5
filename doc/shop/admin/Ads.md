﻿# 广告 接口文档

+ 作者：qqs

+ 相关表结构

+ 参数前有*为非必填

### 涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| shop_ads_place | 广告位 |
| shop_ads_list | 广告 |


### 列表接口

+ __接口说明__： __用于显示已添加的广告__

+ __接口地址__： __/Shopadmin/Ads/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| page | int | 当前页 默认1 |
| *shop_id | int | 商铺id |


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
| place_id | int(11) | 分类ID |
| cover | varchar(255) | 封面图片 |
| title | varchar(255) | 广告标题 |
| start_time | int(11) | 开始时间 |
| end_time | int(11) | 结束时间 |
| type | tinyint(1) | 类型 |
| link | varchar(255) | 广告外链 |
| sort | int(11) | 排序（数字越大越优先） |
| click | int(11) | 点击量 |
| status | tinyint(1) | 状态 |
| update_time | int(11) | 更新时间 |
| create_time | int(11) | 创建时间 |



### 广告管理需要用到的数组集合，用于前端显示或添加修改选择

+ __接口说明__： __用于获取修改添加需要选择的选择项__

+ __接口地址__： __/Shopadmin/Ads/array__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| place | Object | 广告位 |



### 详情页面

+ __接口说明__： __用于获取某广告详情数据__

+ __接口地址__： __/Shopadmin/Ads/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | id |


+ __响应参数__

> 成功返回200状态码  

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| place_id | int(11) | 分类ID |
| cover | varchar(255) | 封面图片 |
| title | varchar(255) | 广告标题 |
| start_time | int(11) | 开始时间 |
| end_time | int(11) | 结束时间 |
| type | tinyint(1) | 类型 |
| link | varchar(255) | 广告外链 |
| sort | int(11) | 排序（数字越大越优先） |
| click | int(11) | 点击量 |
| status | tinyint(1) | 状态 |
| update_time | int(11) | 更新时间 |
| create_time | int(11) | 创建时间 |



### 新增页面

+ __接口说明__： __用于新添加广告数据__

+ __接口地址__： __/Shopadmin/Ads/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| place_id | int(11) | 分类ID |
| cover | varchar(255) | 封面图片 |
| title | varchar(255) | 广告标题 |
| start_time | int(11) | 开始时间 |
| end_time | int(11) | 结束时间 |
| link | varchar(255) | 广告外链 |
| sort | int(11) | 排序（数字越大越优先） |



+ __响应参数__

> 成功返回200状态码



### 修改页面

+ __接口说明__： __用于修改广告数据__

+ __接口地址__： __/Shopadmin/Ads/update__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int(11) | 广告id |
| place_id | int(11) | 分类ID |
| cover | varchar(255) | 封面图片 |
| title | varchar(255) | 广告标题 |
| start_time | int(11) | 开始时间 |
| end_time | int(11) | 结束时间 |
| link | varchar(255) | 广告外链 |
| sort | int(11) | 排序（数字越大越优先） |


+ __响应参数__

> 成功返回200状态码



### 修改状态

+ __接口说明__： __用于修改广告状态，可多选__

+ __接口地址__： __/Shopadmin/Ads/status__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | varchar | ID集，集格式为'1,2,3,4' |
| status | int | 1 开启  0 关闭  -1 删除  |


+ __响应参数__

> 成功返回200状态码