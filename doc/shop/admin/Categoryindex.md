# 商品关键词 接口文档

+ 作者：qqs

+ 参数前有*为必填项

### 涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| shop_good_category_index| 商品关键词|


#### 列表接口

> 获取案例数据

+ __接口地址__： __/Shopadmin/Categoryindex/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| page | int | 当前页 默认1 |
| *category_id | int | 分类id |


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
| category_id | int(11) | 分类id |
| name | varchar(255) | 搜索词 |
| create_time | int(11) |  |
| update_time | int(11) |  |
| shop_id | int(11) | 商铺id |



### 详情页面

+ __接口地址__： __/Shopadmin/Categoryindex/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | int | id |


+ __响应参数__

> 成功返回200状态码

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| category_id | int(11) | 分类id |
| name | varchar(255) | 搜索词 |
| create_time | int(11) |  |
| update_time | int(11) |  |
| shop_id | int(11) | 商铺id |



### 新增页面

+ __接口地址__： __/Shopadmin/Categoryindex/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| category_id | int(11) | 分类id |
| name | varchar(255) | 搜索词 |
| create_time | int(11) |  |
| update_time | int(11) |  |
| shop_id | int(11) | 商铺id |


+ __响应参数__

> 成功返回200状态码



### 修改页面

+ __接口地址__： __/Shopadmin/Categoryindex/update__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| category_id | int(11) | 分类id |
| name | varchar(255) | 搜索词 |
| create_time | int(11) |  |
| update_time | int(11) |  |
| shop_id | int(11) | 商铺id |


+ __响应参数__

> 成功返回200状态码



###  修改状态

+ __接口地址__： __/Shopadmin/Categoryindex/status__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *ids | str |  id集 |
| *status | number | 1 开启  0 关闭  -1 删除  |


+ __响应参数__

> 成功返回200状态码