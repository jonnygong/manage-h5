# 订单 接口文档

+ 作者：qqs

+ 参数前有*为必填项

### 涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| shop_order| 订单|


#### 列表接口

> 获取案例数据

+ __接口地址__： __/Shopadmin/Order/list__

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
| order_sn | varchar(25) | 订单编号 |
| shop_id | int(11) | 所属商家 |
| member_id | int(11) | 会员编号 |
| status | tinyint(1) | 订单状态1待付款2已付款3已确认4已发货5已收货6退款申请7退款成功8待评价9已评价-1无效订单（删除） |
| type | tinyint(1) | 1是现金2是积分3是项目订单 |
| total_money | decimal(10,2) | 订单总价 |
| total_point | int(11) | 消费积分 |
| cut_money | decimal(10,2) | 优惠金额 |
| cut_point | int(11) | 积分减免 |
| logistic_type | tinyint(1) | 运输方式，0虚拟，1自提，2物流 |
| logistic_money | decimal(10,2) | 运费 |
| offer_money | decimal(10,2) | 真实需支付 |
| offer_point | decimal(10,2) | 需要支付积分 |
| rebate_money | decimal(10,2) | 回扣金额 |
| rebate_point | decimal(10,2) | 回扣积分 |
| pay_type | tinyint(1) | 支付类型1支付宝、2微信、3银联 |
| pay_id | varchar(255) | 交易号 |
| pay_time | int(11) | 支付时间 |
| user_note | varchar(255) | 用户备注 |
| shop_note | varchar(255) | 商家备注 |
| end_time | int(11) | 订单完成时间 |
| content | varchar(3000) | 订单内商品信息 |
| update_time | int(11) | 更新时间 |
| create_time | int(11) | 订单创建时间 |



### 详情页面

+ __接口地址__： __/Shopadmin/Order/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | int | id |


+ __响应参数__

> 成功返回200状态码

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| order_sn | varchar(25) | 订单编号 |
| shop_id | int(11) | 所属商家 |
| member_id | int(11) | 会员编号 |
| status | tinyint(1) | 订单状态1待付款2已付款3已确认4已发货5已收货6退款申请7退款成功8待评价9已评价-1无效订单（删除） |
| type | tinyint(1) | 1是现金2是积分3是项目订单 |
| total_money | decimal(10,2) | 订单总价 |
| total_point | int(11) | 消费积分 |
| cut_money | decimal(10,2) | 优惠金额 |
| cut_point | int(11) | 积分减免 |
| logistic_type | tinyint(1) | 运输方式，0虚拟，1自提，2物流 |
| logistic_money | decimal(10,2) | 运费 |
| offer_money | decimal(10,2) | 真实需支付 |
| offer_point | decimal(10,2) | 需要支付积分 |
| rebate_money | decimal(10,2) | 回扣金额 |
| rebate_point | decimal(10,2) | 回扣积分 |
| pay_type | tinyint(1) | 支付类型1支付宝、2微信、3银联 |
| pay_id | varchar(255) | 交易号 |
| pay_time | int(11) | 支付时间 |
| user_note | varchar(255) | 用户备注 |
| shop_note | varchar(255) | 商家备注 |
| end_time | int(11) | 订单完成时间 |
| content | varchar(3000) | 订单内商品信息 |
| update_time | int(11) | 更新时间 |
| create_time | int(11) | 订单创建时间 |



### 新增页面

+ __接口地址__： __/Shopadmin/Order/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| order_sn | varchar(25) | 订单编号 |
| shop_id | int(11) | 所属商家 |
| member_id | int(11) | 会员编号 |
| status | tinyint(1) | 订单状态1待付款2已付款3已确认4已发货5已收货6退款申请7退款成功8待评价9已评价-1无效订单（删除） |
| type | tinyint(1) | 1是现金2是积分3是项目订单 |
| total_money | decimal(10,2) | 订单总价 |
| total_point | int(11) | 消费积分 |
| cut_money | decimal(10,2) | 优惠金额 |
| cut_point | int(11) | 积分减免 |
| logistic_type | tinyint(1) | 运输方式，0虚拟，1自提，2物流 |
| logistic_money | decimal(10,2) | 运费 |
| offer_money | decimal(10,2) | 真实需支付 |
| offer_point | decimal(10,2) | 需要支付积分 |
| rebate_money | decimal(10,2) | 回扣金额 |
| rebate_point | decimal(10,2) | 回扣积分 |
| pay_type | tinyint(1) | 支付类型1支付宝、2微信、3银联 |
| pay_id | varchar(255) | 交易号 |
| pay_time | int(11) | 支付时间 |
| user_note | varchar(255) | 用户备注 |
| shop_note | varchar(255) | 商家备注 |
| end_time | int(11) | 订单完成时间 |
| content | varchar(3000) | 订单内商品信息 |
| update_time | int(11) | 更新时间 |
| create_time | int(11) | 订单创建时间 |


+ __响应参数__

> 成功返回200状态码



### 修改页面

+ __接口地址__： __/Shopadmin/Order/update__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| order_sn | varchar(25) | 订单编号 |
| shop_id | int(11) | 所属商家 |
| member_id | int(11) | 会员编号 |
| status | tinyint(1) | 订单状态1待付款2已付款3已确认4已发货5已收货6退款申请7退款成功8待评价9已评价-1无效订单（删除） |
| type | tinyint(1) | 1是现金2是积分3是项目订单 |
| total_money | decimal(10,2) | 订单总价 |
| total_point | int(11) | 消费积分 |
| cut_money | decimal(10,2) | 优惠金额 |
| cut_point | int(11) | 积分减免 |
| logistic_type | tinyint(1) | 运输方式，0虚拟，1自提，2物流 |
| logistic_money | decimal(10,2) | 运费 |
| offer_money | decimal(10,2) | 真实需支付 |
| offer_point | decimal(10,2) | 需要支付积分 |
| rebate_money | decimal(10,2) | 回扣金额 |
| rebate_point | decimal(10,2) | 回扣积分 |
| pay_type | tinyint(1) | 支付类型1支付宝、2微信、3银联 |
| pay_id | varchar(255) | 交易号 |
| pay_time | int(11) | 支付时间 |
| user_note | varchar(255) | 用户备注 |
| shop_note | varchar(255) | 商家备注 |
| end_time | int(11) | 订单完成时间 |
| content | varchar(3000) | 订单内商品信息 |
| update_time | int(11) | 更新时间 |
| create_time | int(11) | 订单创建时间 |


+ __响应参数__

> 成功返回200状态码



###  修改状态

+ __接口地址__： __/Shopadmin/Order/status__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *ids | str |  id集 |
| *status | number | 1 开启  0 关闭  -1 删除  |


+ __响应参数__

> 成功返回200状态码
