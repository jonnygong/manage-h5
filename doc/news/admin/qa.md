# 爆料信息文档

+ 作者：qqs

+ 调用： https://api.kfw001.com/模型/控制器/方法(247)

+ 参数前有*为必填

### 涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| news_keyword | 关键词分类管理表 |
| news_reporter | 记者管理表 |
| news_qa | 爆料信息管理表 |



### 列表接口

+ __接口说明__： __用于显示已添加的分类__

+ __接口地址__： __/Newsadmin/Qa/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *public_id | int | 公众号id |
| page | int | 当前页 默认1 |
| search | int | 新闻搜索条件 |


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
| id | int | ID |
| news | string | 网友爆料信息 |
| create_time | int | 创建时间 |
| update_time | int | 更新时间 |
| status | int | 状态-1删除，0禁用，1启用 |
| answer | string | 记者回答 |
| thumb | string | 相关图片 |
| tel | string | 手机号码 |
| is_show | int | 是否显示在微信端0不显示1显示 |
| category_id | int | 分类id |
| is_answer | int | 是否已回复0否1是 |
| follow | string | 后续 |
| article | string | 调查文章 |



### 详情页面

+ __接口说明__： __用于获取信息详情__

+ __接口地址__： __/Newsadmin/Qa/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | int | ID |


+ __响应参数__

> 成功返回200状态码  

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | ID |
| news | string | 网友爆料信息 |
| create_time | int | 创建时间 |
| update_time | int | 更新时间 |
| status | int | 状态-1删除，0禁用，1启用 |
| answer | string | 记者回答 |
| thumb | string | 相关图片 |
| tel | string | 手机号码 |
| is_show | int | 是否显示在微信端0不显示1显示 |
| category_id | int | 分类id |
| is_answer | int | 是否已回复0否1是 |
| follow | string | 后续 |
| article | string | 调查文章 |



### 新增页面

+ __接口说明__： __用于新添加问题__

+ __接口地址__： __/Newsadmin/Qa/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *news | string | 网友爆料信息 |
| *answer | string | 记者回答 |
| *thumb | string | 相关图片 |
| *tel | string | 手机号码 |
| *is_show | int | 是否显示在微信端0不显示1显示 |
| *category_id | int | 分类id |
| article | string | 调查文章 |


+ __响应参数__

> 成功返回200状态码




### 记者回复

+ __接口说明__： __用于记者回复__

+ __接口地址__： __/Newsadmin/Qa/update__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *category_id | int | 分类id |
| *is_show | int | 是否显示在微信端0不显示1显示 |
| *answer | string | 记者回答 |
| article | string | 调查文章 |


+ __响应参数__

> 成功返回200状态码




### 修改状态

+ __接口说明__： __用于修改信息状态，可多选__

+ __接口地址__： __/Newsadmin/Qa/status__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| ids | string | ID集，集格式为'1,2,3,4' |
| status | int | 1 开启  0 关闭  -1 删除  |


+ __响应参数__

> 成功返回200状态码



### 获取爆料分类

+ __接口说明__： __用于获取爆料分类__

+ __接口地址__： __/Newsadmin/Qa/category__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *public_id | int | 公众号ID |


+ __响应参数__

> 成功返回200状态码 ，分类id为键，name为值




### 后续添加接口

+ __接口说明__： __用于记者添加后续__

+ __接口地址__： __/Newsadmin/Qa/atlist__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | int | ID |
| *follow | int | 后续信息 |


+ __响应参数__

> 成功返回200状态码

