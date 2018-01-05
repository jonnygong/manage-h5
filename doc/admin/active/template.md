# 模板接口

> 本接口用于案例模块、
-  api接口： http://admin.mp.kfw001.com/

#### 相关数据库

- 数据库名称(vote_kfw001_com)

+ __相关表__

|  表名称  |  参数说明 |
| --------- |  ------- |
| wp_wechat_vote_template| 投票活动模板表 |

#### 列表接口

> 获取案例数据

+ __接口地址__： __/vote/template/list__

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
| id | int(11) | id编号 |
| name | varchar(255) | 模板名 |
| cover | varchar(255) | 模板图片 |
| cname | tinyint(1) | 模板分类名 |
| update_time | int(11) | 更新时间 |
| create_time | int(11) | 创建时间 |
| status | int(11) | 状态 |
| is_top | int(11) | 是否推荐 |

### 详情页面

+ __接口地址__： __/vote/template/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | int | id |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| cat | Object | 模板分类 |
| list | Object | 数据相关 |

>  cat 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | number | 分类id编号  |
| c_name | string |  模板分类名 |

>  list 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int(11) | id编号 |
| cid | int(11) | 分类id编号 |
| name | varchar(255) | 模板名 |
| cover |  varchar(255) | 模板图片 |
| path | string | 模板路径 |

+ __示例__

``` javascript

```

### 添加接口

+ __接口地址__： __/vote/template/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| cid | int(11) | 分类id编号 |
| name | varchar(255) | 模板名 |
| cover |  varchar(255) | 模板图片 |
| path | string | 模板路径 |

+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```


### 更新接口

+ __接口地址__： __/vote/template/update__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | number |  id编号 |
| cid | int(11) | 分类id编号 |
| name | varchar(255) | 模板名 |
| cover |  varchar(255) | 模板图片 |
| path | string | 模板路径 |

+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```

###  修改状态

+ __接口地址__： __/vote/template/status__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | number |  模板id编号 |
| *status | number | 1 开启  0 关闭  -1 删除  |

+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```

###  置顶

+ __接口地址__： __/vote/template/istop__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | number |  模板id编号 |
| *status | number | 1 置顶  0 取消置顶  |

+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```