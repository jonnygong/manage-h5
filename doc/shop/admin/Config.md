# 商家配置 接口文档

+ 作者：qqs

+ 参数前有*为必填项

### 涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| shop_config| 商家配置|


#### 列表接口

+ __接口地址__： __/Shopadmin/Config/list__

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
| name | varchar(50) | 商铺名称 |
| description | varchar(255) | 商铺描述 |
| logo | varchar(255) | 店铺logo |
| status | tinyint(1) | -1删除0禁用1启用 |
| link_man | varchar(20) | 联系人 |
| link_tel | varchar(15) | 联系人电话 |
| link_address | varchar(255) | 联系人地址 |
| update_time | int(11) |  |
| create_time | int(11) |  |
| type | tinyint(1) | 页面模式1双栏，2单栏 |
| color | varchar(50) | 主色调 |



### 详情页面

+ __接口地址__： __/Shopadmin/Config/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | int | id |


+ __响应参数__

> 成功返回200状态码

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| name | varchar(50) | 商铺名称 |
| description | varchar(255) | 商铺描述 |
| logo | varchar(255) | 店铺logo |
| status | tinyint(1) | -1删除0禁用1启用 |
| link_man | varchar(20) | 联系人 |
| link_tel | varchar(15) | 联系人电话 |
| link_address | varchar(255) | 联系人地址 |
| update_time | int(11) |  |
| create_time | int(11) |  |
| type | tinyint(1) | 页面模式1双栏，2单栏 |
| color | varchar(50) | 主色调 |



### 新增页面

+ __接口地址__： __/Shopadmin/Config/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| name | varchar(50) | 商铺名称 |
| description | varchar(255) | 商铺描述 |
| logo | varchar(255) | 店铺logo |
| link_man | varchar(20) | 联系人 |
| link_tel | varchar(15) | 联系人电话 |
| link_address | varchar(255) | 联系人地址 |
| type | tinyint(1) | 页面模式1双栏，2单栏 |
| color | varchar(50) | 主色调 |


+ __响应参数__

> 成功返回200状态码



### 修改页面

+ __接口地址__： __/Shopadmin/Config/update__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| name | varchar(50) | 商铺名称 |
| description | varchar(255) | 商铺描述 |
| logo | varchar(255) | 店铺logo |
| link_man | varchar(20) | 联系人 |
| link_tel | varchar(15) | 联系人电话 |
| link_address | varchar(255) | 联系人地址 |
| type | tinyint(1) | 页面模式1双栏，2单栏 |
| color | varchar(50) | 主色调 |


+ __响应参数__

> 成功返回200状态码



###  修改状态

+ __接口地址__： __/Shopadmin/Config/status__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *ids | str |  id集 |
| *status | number | 1 开启  0 关闭  -1 删除  |


+ __响应参数__

> 成功返回200状态码

