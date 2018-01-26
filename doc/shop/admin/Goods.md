# 商品 接口文档

+ 作者：qqs

+ 参数前有*为必填项

### 涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| shop_goods| 商品表 |
| shop_category| 分类表 |
| shop_category_index| 关键词表 |


#### 列表接口

+ __接口地址__： __/Shopadmin/Goods/list__

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
| shop_id | int(11) | 所属店铺 0为平台产品 |
| category_id | int(11) | 分类id |
| type | tinyint(1) | 1实体商品，2为虚拟商品，3门店项目 |
| status | int(11) | 1为上架，0为下架，-1为删除 |
| sort | int(11) | 排序 |
| title | varchar(255) | 商品/项目标题 |
| thumb | varchar(255) | 商品封面图 |
| description | varchar(1000) | 商品/项目描述 |
| goods_sn | varchar(50) | 商品编号 |
| product_sn | varchar(50) | 商品条码 |
| original_price | decimal(10,1) | 原价 |
| cost_price | decimal(10,1) | 成本价 |
| is_point | tinyint(1) | 是否为积分商品 |
| offer_point | int(11) | 需要支付积分 |
| offer_money | decimal(10,2) | 需要支付金额 |
| back_point | decimal(10,2) | 可返还积分 |
| stock | int(11) | 库存 |
| stock_config | tinyint(1) | 0拍下减库存 1生成订单减库存 2永久不减 |
| sales | int(11) | 已售数量 |
| weight | int(11) | 重量(g) |
| max_buy | int(11) | 用户最多购买数量 |
| logistic_type | int(11) | 运输方式，1自提，2物流 |
| thumb_url | text | 其他图片 |
| is_new | tinyint(11) | 是否新品 |
| is_hot | tinyint(11) | 是否热门 |
| is_discount | tinyint(11) | 是否折扣 |
| is_recommand | tinyint(11) | 是否展示到首页 |
| is_time | tinyint(11) | 是否限时卖 |
| start_time | int(11) | 限时卖开始时间 |
| end_time | int(11) | 限时卖结束时间 |
| view_count | int(11) | 浏览量 |
| is_check | tinyint(1) | 是否审核通过 |
| update_time | int(11) | 更新时间 |
| create_time | int(11) | 创建时间 |
| content | text | 图文详情 |
| index_id | varchar(50) | 搜索关键词id集 |
| category_path | varchar(255) | 分类路径 |



### 详情页面

+ __接口地址__： __/Shopadmin/Goods/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | int | id |


+ __响应参数__

> 成功返回200状态码

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| shop_id | int(11) | 所属店铺 0为平台产品 |
| category_id | int(11) | 分类id |
| type | tinyint(1) | 1实体商品，2为虚拟商品，3门店项目 |
| status | int(11) | 1为上架，0为下架，-1为删除 |
| sort | int(11) | 排序 |
| title | varchar(255) | 商品/项目标题 |
| thumb | varchar(255) | 商品封面图 |
| description | varchar(1000) | 商品/项目描述 |
| goods_sn | varchar(50) | 商品编号 |
| product_sn | varchar(50) | 商品条码 |
| original_price | decimal(10,1) | 原价 |
| cost_price | decimal(10,1) | 成本价 |
| is_point | tinyint(1) | 是否为积分商品 |
| offer_point | int(11) | 需要支付积分 |
| offer_money | decimal(10,2) | 需要支付金额 |
| back_point | decimal(10,2) | 可返还积分 |
| stock | int(11) | 库存 |
| stock_config | tinyint(1) | 0拍下减库存 1生成订单减库存 2永久不减 |
| sales | int(11) | 已售数量 |
| weight | int(11) | 重量(g) |
| max_buy | int(11) | 用户最多购买数量 |
| logistic_type | int(11) | 运输方式，1自提，2物流 |
| thumb_url | text | 其他图片 |
| is_new | tinyint(11) | 是否新品 |
| is_hot | tinyint(11) | 是否热门 |
| is_discount | tinyint(11) | 是否折扣 |
| is_recommand | tinyint(11) | 是否展示到首页 |
| is_time | tinyint(11) | 是否限时卖 |
| start_time | int(11) | 限时卖开始时间 |
| end_time | int(11) | 限时卖结束时间 |
| view_count | int(11) | 浏览量 |
| is_check | tinyint(1) | 是否审核通过 |
| update_time | int(11) | 更新时间 |
| create_time | int(11) | 创建时间 |
| content | text | 图文详情 |
| index_id | varchar(50) | 搜索关键词id集 |
| category_path | varchar(255) | 分类路径 |



### 获取分类

+ __接口地址__： __/Shopadmin/Goods/category__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *shop_id | int | 商铺id |
| *category_id | int | 分类id，如果获取一级分类category_id为0 |


+ __响应参数__

> 成功返回200状态码

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| name | varchar(50) | 分类名称 |
| pid | int(11) | 父级分类 |
| img | varchar(255) | 分类图片 |
| path | varchar(255) | 分类路径 |
| shop_id | int(11) | 商铺id |
| is_show | tinyint(1) | 是否展示 |



### 获取分类关键词，指的是二级分类

+ __接口地址__： __/Shopadmin/Goods/index__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *shop_id | int | 商铺id |
| *category_id | int | 分类id，二级分类 |


+ __响应参数__

> 成功返回200状态码

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| category_id | int(11) | 分类id |
| name | varchar(255) | 搜索词 |
| create_time | int(11) |  |
| update_time | int(11) |  |
| shop_id | int(11) | 商铺id |



### 新增页面

+ __接口地址__： __/Shopadmin/Goods/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *shop_id | int(11) | 所属店铺 0为平台产品 |
| *category_id | int(11) | 分类id |
| *type | tinyint(1) | 1实体商品，2为虚拟商品，3门店项目 |
| *status | int(11) | 1为上架，0为下架，-1为删除 |
| *sort | int(11) | 排序 |
| *title | varchar(255) | 商品/项目标题 |
| *thumb | varchar(255) | 商品封面图 |
| *description | varchar(1000) | 商品/项目描述 |
| *original_price | decimal(10,1) | 原价 |
| *stock | int(11) | 库存 |
| *stock_config | tinyint(1) | 0拍下减库存 1生成订单减库存 2永久不减 |
| *sales | int(11) | 已售数量 |
| *max_buy | int(11) | 用户最多购买数量 |
| *logistic_type | int(11) | 运输方式，1自提，2物流 |
| *thumb_url | text | 其他图片 |
| *is_hot | tinyint(11) | 是否热门 |
| *content | text | 图文详情 |
| *index_id | varchar(50) | 搜索关键词id集 |
| *category_path | varchar(255) | 分类路径，分类id的路径 |


+ __响应参数__

> 成功返回200状态码



### 修改页面

+ __接口地址__： __/Shopadmin/Goods/update__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *shop_id | int(11) | 所属店铺 0为平台产品 |
| *category_id | int(11) | 分类id |
| *type | tinyint(1) | 1实体商品，2为虚拟商品，3门店项目 |
| *status | int(11) | 1为上架，0为下架，-1为删除 |
| *sort | int(11) | 排序 |
| *title | varchar(255) | 商品/项目标题 |
| *thumb | varchar(255) | 商品封面图 |
| *description | varchar(1000) | 商品/项目描述 |
| *original_price | decimal(10,1) | 原价 |
| *stock | int(11) | 库存 |
| *stock_config | tinyint(1) | 0拍下减库存 1生成订单减库存 2永久不减 |
| *sales | int(11) | 已售数量 |
| *max_buy | int(11) | 用户最多购买数量 |
| *logistic_type | int(11) | 运输方式，1自提，2物流 |
| *thumb_url | text | 其他图片 |
| *is_hot | tinyint(11) | 是否热门 |
| *content | text | 图文详情 |
| *index_id | varchar(50) | 搜索关键词id集 |
| *category_path | varchar(255) | 分类路径，分类id的路径 |


+ __响应参数__

> 成功返回200状态码



###  修改状态

+ __接口地址__： __/Shopadmin/Goods/status__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *ids | str |  id集 |
| *status | number | 1 开启  0 关闭  -1 删除  |


+ __响应参数__

> 成功返回200状态码