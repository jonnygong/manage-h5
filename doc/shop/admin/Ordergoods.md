# 订单商品 接口文档

+ 作者：qqs

+ 参数前有*为必填项

### 涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| shop_order_goods| 订单商品|


#### 列表接口

> 获取案例数据

+ __接口地址__： __/Shopadmin/Ordergoods/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| page | int | 当前页 默认1 |
| *order_id | int | 订单id |


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
| order_id | int(11) | 订单编号 |
| status | tinyint(1) | 订单商品状态，1正常，2退货 |
| goods_type | tinyint(1) | 商品类型，1实物，2积分,3项目 |
| goods_id | int(11) | 商品编号 |
| goods_title | varchar(255) | 商品标题 |
| goods_logo | varchar(255) | 商品图片 |
| goods_price | decimal(10,2) | 商品价格 |
| goods_point | int(11) | 商品积分 |
| goods_sum | int(11) | 商品数量 |
| cut_money | decimal(10,2) | 优惠金额 |
| cut_point | decimal(10,2) | 优惠积分 |
| offer_money | decimal(10,2) | 需支付金额 |
| offer_point | decimal(10,0) | 需支付积分 |
| create_time | int(11) | 创建时间 |
| update_time | int(11) |  |



### 详情页面

+ __接口地址__： __/Shopadmin/Ordergoods/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | int | id |


+ __响应参数__

> 成功返回200状态码

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| order_id | int(11) | 订单编号 |
| status | tinyint(1) | 订单商品状态，1正常，2退货 |
| goods_type | tinyint(1) | 商品类型，1实物，2积分,3项目 |
| goods_id | int(11) | 商品编号 |
| goods_title | varchar(255) | 商品标题 |
| goods_logo | varchar(255) | 商品图片 |
| goods_price | decimal(10,2) | 商品价格 |
| goods_point | int(11) | 商品积分 |
| goods_sum | int(11) | 商品数量 |
| cut_money | decimal(10,2) | 优惠金额 |
| cut_point | decimal(10,2) | 优惠积分 |
| offer_money | decimal(10,2) | 需支付金额 |
| offer_point | decimal(10,0) | 需支付积分 |
| create_time | int(11) | 创建时间 |
| update_time | int(11) |  |



###  修改状态

+ __接口地址__： __/Shopadmin/Ordergoods/status__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *ids | str |  id集 |
| *status | number | 订单商品状态，1正常，2退货 |


+ __响应参数__

> 成功返回200状态码
