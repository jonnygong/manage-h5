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

+ __接口地址__： __/Cases/Act/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *cid | string | 案例分类 |
| *token | string | 用户标识  |
| tye | number | 1 最热 2 最新  |
| keyword | string | 关键字 查询文章标题   |
| page | number | 分页 默认 1 |



+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | string | 分类  |
| title | string | 标题 |
| cover | string | 头图 |
| tips | string | 摘要 |
| update_time | number | 活动信息更新时间 |
| clicks | number | 阅读量 |

###详情页面

+ __接口地址__： __/Cases/Act/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
|*aid | string | ID |
| token | string | 用户标识  |

+ __响应参数__

> 成功返回200状态码

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *aid | string | 活动ID |
| title | number | 活动标题 |
| content | number | 活动内容 |
| start_time | number | 活动开始时间 |
| end_time | number | 活动结束时间 |
| cover | number | 活动的头图 |
| clicks | number | 阅读量 |
| source | object | 来源信息 |
| update_time | number | 更新时间 |
| images | string | 图片信息 |
| url | string | 案例实际链接地址 |

+   source 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| title | string | 客户名称 |
| images | string | 客户头像 |
| tips | string | 客户介绍 |
| update_time | number | 更新时间 |

+ __示例__

``` javascript
```

### 获取案例分类接口
+ __接口地址__： __/Cases/Act/category_

+ __请求参数__

> 无

+ __响应参数__

> 成功返回200状态码
>param  类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | string | 活动ID |
| name | string | 名称 |
| icon | string | 图片 |

+ __示例__

``` javascript
```
