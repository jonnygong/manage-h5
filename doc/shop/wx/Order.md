# 微信端商品信息和订单接口文档

+ 作者：qqs

+ 参数前有*为必填项

### 涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| shop_goods | 商品 |
| shop_goods_spec | 商品规格 |
| shop_address | 用户地址 |
| shop_member | 会员信息 |
| shop_order | 订单 |
| shop_order_goods | 订单商品 |


### 商品详情接口,并获取商品对应的接口

+ __接口地址__： __/Shop/Order/goodsInfo__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *goods_id | int | 商品id |


+ __响应参数__

> 成功返回200状态码

+ __请求参数__

>  goods 类型：__[Array]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | 商品id |
| title | string | 商品名称 |
| is_hot | string | 是否热门，1为热门 |
| content | string | 商品详情 |
| stock | string | 库存 |
| original_price | string | 商品价格 |

>  spec 类型：__[Array]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | 商铺id |
| title | string | 商铺名称 |
| is_use | string | 是否沿用主商品的属性 |
| price | string | 如果不沿用，则该属性有用，为价格 |
| stock | string | 如果不沿用，则该属性有用，为库存 |
| thumb | string | 如果不沿用，则该属性有用，为图片 |
| logistic_type | int | 运输方式，1自提，2物流 |

+ __备注__

> 如果spec为空，下订单时显示主商品的价格，名称和封面图片



### 获取用户地址接口

+ __接口地址__： __/Shop/Order/getAddress__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| 无 |


+ __响应参数__

> 成功返回200状态码

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | 商品id |
| name | string | 姓名 |
| sex | int | 性别，1男2女 |
| address | string | 地址 |
| tel | string | 联系方式 |



### 添加用户地址接口

+ __接口地址__： __/Shop/Order/addAddress__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *name | string | 姓名 |
| *sex | int | 性别，1男2女 |
| *address | string | 地址 |
| *tel | string | 联系方式 |


+ __响应参数__

> 成功返回200状态码



### 修改用户地址接口

+ __接口地址__： __/Shop/Order/updateAddress__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| name | string | 姓名 |
| sex | int | 性别，1男2女 |
| address | string | 地址 |
| tel | string | 联系方式 |
| *id | int | id |


+ __响应参数__

> 成功返回200状态码



### 删除用户地址接口

+ __接口地址__： __/Shop/Order/delAddress__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | id |


+ __响应参数__

> 成功返回200状态码



### 订单提交接口,订单为待付款状态

+ __接口地址__： __/Shop/Order/submitOrder__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *shop_id | int | 商铺id |
| *total_money | float | 订单总价 |
| *address_id | int | 用户快递信息id |
| *logistic_type | float | 运输方式 |
| *user_note | string | 用户备注 |
| *goods | array | 订单商品，为数组 |


+ __响应参数__

> 成功返回200状态码

+ __备注__

> goods为数组，其中包含数据goods_id（商品id）,goods_title(商品名称),goods_logo(商品图片),goods_price(商品单个价格，使用规格则为规格价格),goods_sum(商品数量),offer_money(需要支付金额),spec_id(规格id)