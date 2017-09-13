# 案例接口

> 本接口用于案例模块、

###涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| case_act_list| 案例信息|  |
| case_act_category | 案例分类|  |
| case_member | 访问的用户信息|  |

####列表接口

> 获取案例数据

+ __接口地址__： __/Caseadmin/Act/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| cid | string | 案例分类 |
|*page | number | 分页  从 1 开始  |

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
| id | string | 分类  |
| title | string | 标题 |
| cover | string | 头图 |
| update_time | number | 活动信息更新时间 |
| clicks | number | 阅读量 |
| sort | number | 排序 |


###详情页面

+ __接口地址__： __/Caseadmin/Act/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
|*aid | string | ID |
| token | string | 用户标识  |

+ __响应参数__

> 成功返回200状态码

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |

``` javascript
id   int(11)  id
title varchar(255)  标题
content text 详情
tips varchar(200) 摘要
status tinyint(4)状态
cid  int(11)分类
cover varchar(255)图片
active_start_time int (11)活动开始时间
active_end_time int (11)活动结束时间
clicks int(11)点击量
images varchar(500)相册
url  varchar(255)实际活动地址
it_member varchar(255) 技术参与者
sid  int(11)来源信息
bm_member  varchar(255)商务对接人
bmtype tinyint(1) 商务类别1房产2新媒体3其他

```

+   source 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| name | string | 客户名称 |
| images | string | 客户头像 |
| tips | string | 客户介绍 |
| update_time | number | 更新时间 |

+ __示例__

``` javascript
```

###详情页面

+ __接口地址__： __/Caseadmin/Act/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |

``` javascript
id   int(11)  id
title varchar(255)  标题
content text  详情
tips  varchar(200) 摘要
status tinyint(4)状态
cid  int(11)分类
cover varchar(255)图片
active_start_time int (11) 活动开始时间
active_end_time int (11)  活动结束时间
clicks int(11)点击量
images varchar(500)相册
url  varchar(255)实际活动地址
it_member varchar(255) 技术参与者
sid  int(11)来源信息
bm_member  varchar(255)商务对接人
bmtype tinyint(1) 商务类别1房产2新媒体3其他

```

+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```


###详情页面

+ __接口地址__： __/Caseadmin/Act/update__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |

``` javascript
id   int(11)  id
title varchar(255)  标题
content text详情
status tinyint(4)状态
cid  int(11)分类
cover varchar(255)图片
active_start_time int (11)活动开始时间
active_end_time int (11)活动结束时间
clicks int(11)点击量
images varchar(500)相册
url  varchar(255)实际活动地址
it_member varchar(255) 技术参与者
sid  int(11)来源信息
bm_member  varchar(255)商务对接人
bmtype tinyint(1) 商务类别1房产2新媒体3其他

```

+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```

###  修改状态

+ __接口地址__： __/Caseadmin/Act/status__

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

###  删除

+ __接口地址__： __/Caseadmin/Act/delete__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | number |  案例ID |

+ __响应参数__

> 成功返回200状态码

+ __示例__

``` javascript
```
