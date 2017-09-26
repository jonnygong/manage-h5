# 项目管理 接口文档

> 本接口用于案例模块、

###涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| kfw_project_list| 项目管理|


####列表接口

> 获取案例数据

+ __接口地址__： __/Mapadmin/List/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| page | int | 当前页 默认1 |
| keyword | string | 查询关键字 |
| price | int | 均价  |
| is_cooperation | int | 1 合作 0没有合作  |

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



###详情页面

+ __接口地址__： __/Mapadmin/List/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | int | id |


+ __响应参数__

> 成功返回200状态码

+ __请求参数__

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


+ __示例__

``` javascript

```

###新增接口

+ __接口地址__： __/Mapadmin/List/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *title | varchar(255) | 项目标题 |
| *zone_id | int(11) | 区域id |
| *avg_price | decimal(10,2) | 均价 |
| *latitude | decimal(10,6) | 纬度 |
| *longitude | decimal(10,6) | 经度 |
| house_type | varchar(50) | 户型1'别墅2'排屋3'洋房4'小高层5'高层6'酒店式公寓7'商业 |
| is_cooperation | tinyint(1) | 是否合作按合同来，默认0，合作为1 |
| sale_status | tinyint(1) | 1已售,2在售,3已交付 |
| sort | int(11) | 排序（数字越大越优先） |
| sell_phone | varchar(255) | 销售热线 |
| metro_id | varchar(32) | 地铁 |
| metrostation_id | varchar(32) | 地铁站Id |
| address | varchar(255) | 地址 |
| info | varchar(255) | 项目简介 |
| cover | varchar(255) | 封面图片 |
| next_open | int(11) | 下次开盘时间 |
| tags | varchar(255) | 标签 |
| click | int(11) | 点击量 |
| status | tinyint(1) | 状态 |
| main_area | varchar(50) | 主推面积1、90平米以下，2、90-120平米，3、120-150平米，4、150-200平米，5、200平米以上 |
| mainhouseing | varchar(200) | 主力户型 |
| city_id | int(11) | 区域对应的城市 region_city表id |
| plate_id | int(11) | 板块（区域的下级） |
| share_title | varchar(255) | 分享标题 |
| share_content | varchar(255) | 分享内容 |
| share_img | varchar(255) | 分享图片 |
| link_title | varchar(255) | 外链地址 |
| oldid | int(11) |  |

+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```


###修改接口

+ __接口地址__： __/Mapadmin/List/update__

+ __请求参数__

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
| *id | number |  案例ID |
| *status | number | 1 开启  0 关闭  -1 删除  |

+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```

###  删除接口

+ __接口地址__： __/Mapadmin/List/delete__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | number |  案例ID |

+ __响应参数__

> 成功返回200状态码

+ __示例__

``` javascript
```
