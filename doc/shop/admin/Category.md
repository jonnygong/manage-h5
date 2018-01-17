# 商品分类 接口文档

+ 作者：qqs

+ 参数前有*为必填项

### 涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| shop_good_category| 商品分类|


#### 列表接口

> 获取案例数据

+ __接口地址__： __/Shopadmin/Category/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| page | int | 当前页 默认1 |
| *pid | int | 父级id，顶级分类传0 |
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
| name | varchar(50) | 分类名称 |
| pid | int(11) | 父级分类 |
| img | varchar(255) | 分类图片 |
| shop_id | int(11) | 商铺id |
| is_show | tinyint(1) | 是否展示 |



### 详情页面

+ __接口地址__： __/Shopadmin/Category/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | int | id |


+ __响应参数__

> 成功返回200状态码

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| name | varchar(50) | 分类名称 |
| pid | int(11) | 父级分类 |
| img | varchar(255) | 分类图片 |
| path | varchar(50) | 路径 |
| create_time | int(11) |  |
| update_time | int(11) |  |
| shop_id | int(11) | 商铺id |
| is_show | tinyint(1) | 是否展示 |



### 获取顶级分类

+ __接口地址__： __/Shopadmin/Category/array__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *shop_id | int | shop_id |


+ __响应参数__

> 成功返回200状态码

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| name | varchar(50) | 分类名称 |
| pid | int(11) | 父级分类 |
| img | varchar(255) | 分类图片 |
| path | varchar(50) | 路径 |
| create_time | int(11) |  |
| update_time | int(11) |  |
| shop_id | int(11) | 商铺id |
| is_show | tinyint(1) | 是否展示 |


+ __示例__

``` javascript

```

### 新增页面

+ __接口地址__： __/Shopadmin/Category/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| name | varchar(50) | 分类名称 |
| pid | int(11) | 父级分类 |
| img | varchar(255) | 分类图片 |
| path | varchar(50) | 路径 |
| create_time | int(11) |  |
| update_time | int(11) |  |
| shop_id | int(11) | 商铺id |
| is_show | tinyint(1) | 是否展示 |



+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```


### 修改页面

+ __接口地址__： __/Shopadmin/Category/update__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| name | varchar(50) | 分类名称 |
| pid | int(11) | 父级分类 |
| img | varchar(255) | 分类图片 |
| path | varchar(50) | 路径 |
| create_time | int(11) |  |
| update_time | int(11) |  |
| shop_id | int(11) | 商铺id |
| is_show | tinyint(1) | 是否展示 |



+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```


###  修改状态

+ __接口地址__： __/Shopadmin/Category/status__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *ids | str |  id集 |
| *status | number | 1 开启  0 关闭  -1 删除  |


+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```