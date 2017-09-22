# 楼盘列表 接口文档

> 本接口用于案例模块、

###涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| kfw_project_list| 楼盘列表|
| kfw_project_detail| 楼盘详情表|
| kfw_project_subway| 地铁表表|


####列表接口

> 获取案例数据

+ __接口地址__： __/Mapadmin/List/list__

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
| kind_id | int(11) | 分类ID |
| cover | varchar(255) | 封面图片 |
| title | varchar(255) | 项目标题 |
| info | varchar(255) | 项目简介 |
| type | varchar(255) | 类型 |
| sort | int(11) | 排序（数字越大越优先） |
| click | int(11) | 点击量 |
| status | tinyint(1) | 状态 |
| next_open | int(11) | 下次开盘时间 |
| avg_price | decimal(10,2) | 均价 |
| sell_phone | varchar(255) | 销售热线 |
| address | varchar(255) | 地址 |
| latitude | decimal(10,6) | 纬度 |
| longitude | decimal(10,6) | 经度 |
| tags | varchar(255) | 标签 |
| see_open | tinyint(1) | 是否开放看房报名 |
| admin_id | int(11) | 管理员编号 |
| client_id | int(11) | 客户编号 |
| update_time | int(11) | 更新时间 |
| create_time | int(11) | 创建时间 |
| qrcode_img | varchar(255) | 二维码图片 |
| link_url | varchar(255) | 链接地址 |
| share_title | varchar(255) | 分享标题 |
| share_content | varchar(255) | 分享内容 |
| share_img | varchar(255) | 分享图片 |
| link_title | varchar(255) | 微楼书标题 |
| main_area | varchar(50) | 主推面积1、90平米以下，2、90-120平米，3、120-150平米，4、150-200平米，5、200平米以上 |
| mainhouseing | varchar(200) | 主力户型 |
| house_type | varchar(50) | 户型1'别墅2'排屋3'洋房4'小高层5'高层6'酒店式公寓7'商业 |
| sale_status | tinyint(1) | 1已售,2在售,3已交付 |
| city_id | int(11) | 区域对应的城市 region_city表id |
| enroll_count | int(11) | 参加人数 |
| metro_id | varchar(32) | 地铁 |
| metrostation_id | varchar(32) | 地铁站Id |
| zone_id | int(11) | 区域id |
| plate_id | int(11) | 板块（区域的下级） |
| oldid | int(11) |  |
| is_cooperation | tinyint(1) | 是否合作，默认0，合作为1 |


### 数组接口，楼盘列表所有下拉菜单数组

+ __接口地址__： __/Mapadmin/List/array__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| main_area | Object | 户型面积，主推面积 |
| house_type | Object | 户型 |
| tags | Object | 楼盘标签 |
| underground | Object | 地铁线路 |
| zone | Object | 区域 |
| price | Object | 均价 |

>  main_area 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | id编号  |
| name | string |  分类名 |

>  house_type 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | id编号  |
| name | string |  分类名 |

>  tags 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | id编号  |
| name | string |  分类名 |

>  underground 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | id编号  |
| name | string |  分类名 |

>  zone 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | id编号  |
| name | string |  分类名 |

>  price 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | id编号  |
| name | string |  分类名 |


### 根据路线查询站点接口

+ __接口地址__： __/Mapadmin/List/getstation__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | 路线id |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| data | Object | 数组 |

>  data 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | id编号  |
| name | string |  站台名 |


### 根据区域id查询下级模块

+ __接口地址__： __/Mapadmin/List/getplate__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| zone_id | int | 区域id |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| data | Object | 数组 |

>  data 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | id编号  |
| name | string |  名字 |


### 楼盘信息修改 点击修改按钮后调用

+ __接口地址__： __/Mapadmin/List/edit__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | 楼盘id |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| data | Object | 数组 |

>  data 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | id编号  |
| zone_id | int |  区域id |
| cover | varchar |  封面图片 |
| title | int |  项目标题 |
| info | int |  项目简介 |
| sort | int |  排序 |
| next_open | int |  次开盘时间 |
| avg_price | int |  均价 |
| address | int |  项目地址 |
| longitude | int |  经度 |
| latitude | int |  纬度 |
| tags | int |  标签 |
| see_open | int |  是否开放预约 |
| qrcode_img | int |  二维码图片 |
| link_url | int |  链接地址 |
| share_title | int |  分享标题 |
| share_img | int |  分享图片 |
| link_title | int |  微楼书标题 |
| main_area | int |  主推面积 |
| sale_status | int |  销售状态 |
| house_type | int |  户型 |
| metro_id | int |  地铁线路 |
| metrostation_id | int |  地铁站点 |
| detail | int |  项目详情 |


###楼盘信息保存   新增

+ __接口地址__： __/Mapadmin/List/addsave__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| cover | varchar(255) | 封面图片 |
| title | varchar(255) | 项目标题 |
| info | varchar(255) | 项目简介 |
| sort | int(11) | 排序（数字越大越优先） |
| next_open | int(11) | 下次开盘时间 |
| avg_price | decimal(10,2) | 均价 |
| sell_phone | varchar(255) | 销售热线 |
| address | varchar(255) | 地址 |
| latitude | decimal(10,6) | 纬度 |
| longitude | decimal(10,6) | 经度 |
| tags | varchar(255) | 标签 |
| see_open | tinyint(1) | 是否开放看房报名 |
| qrcode_img | varchar(255) | 二维码图片 |
| link_url | varchar(255) | 链接地址 |
| share_title | varchar(255) | 分享标题 |
| share_content | varchar(255) | 分享内容 |
| share_img | varchar(255) | 分享图片 |
| link_title | varchar(255) | 微楼书标题 |
| main_area | varchar(50) | 主推面积1、90平米以下，2、90-120平米，3、120-150平米，4、150-200平米，5、200平米以上 |
| house_type | varchar(50) | 户型1'别墅2'排屋3'洋房4'小高层5'高层6'酒店式公寓7'商业 |
| sale_status | tinyint(1) | 1已售,2在售,3已交付 |
| metro_id | varchar(32) | 地铁 |
| metrostation_id | varchar(32) | 地铁站Id |
| zone_id | int(11) | 区域id |
| plate_id | int(11) | 板块（区域的下级） |
| is_cooperation | tinyint(1) | 是否合作，默认0，合作为1 |


+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```


###楼盘信息保存   修改

+ __接口地址__： __/Mapadmin/List/editsave__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int(11) | 楼盘信息id |
| cover | varchar(255) | 封面图片 |
| title | varchar(255) | 项目标题 |
| info | varchar(255) | 项目简介 |
| sort | int(11) | 排序（数字越大越优先） |
| next_open | int(11) | 下次开盘时间 |
| avg_price | decimal(10,2) | 均价 |
| sell_phone | varchar(255) | 销售热线 |
| address | varchar(255) | 地址 |
| latitude | decimal(10,6) | 纬度 |
| longitude | decimal(10,6) | 经度 |
| tags | varchar(255) | 标签 |
| see_open | tinyint(1) | 是否开放看房报名 |
| qrcode_img | varchar(255) | 二维码图片 |
| link_url | varchar(255) | 链接地址 |
| share_title | varchar(255) | 分享标题 |
| share_content | varchar(255) | 分享内容 |
| share_img | varchar(255) | 分享图片 |
| link_title | varchar(255) | 微楼书标题 |
| main_area | varchar(50) | 主推面积1、90平米以下，2、90-120平米，3、120-150平米，4、150-200平米，5、200平米以上 |
| house_type | varchar(50) | 户型1'别墅2'排屋3'洋房4'小高层5'高层6'酒店式公寓7'商业 |
| sale_status | tinyint(1) | 1已售,2在售,3已交付 |
| metro_id | varchar(32) | 地铁 |
| metrostation_id | varchar(32) | 地铁站Id |
| zone_id | int(11) | 区域id |
| plate_id | int(11) | 板块（区域的下级） |
| is_cooperation | tinyint(1) | 是否合作，默认0，合作为1 |


+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```

###  修改状态

+ __接口地址__： __/Mapadmin/List/status__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *ids | number |  案例ID |
| *status | number | 1 开启  0 关闭  -1 删除  |

+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```

###  图片上传

+ __接口地址__： __/Mapadmin/List/upload__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| uploadimg | varchar |  图片 |

+ __响应参数__

> 成功返回200状态码

+ __示例__

``` javascript
```
