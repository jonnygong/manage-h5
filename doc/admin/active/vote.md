
# 投票接口（V1.0.1）
-  api接口：  http://admin.mp.kfw001.com/

#### 相关数据库

- 数据库名称(vote_kfw001_com)

+ __相关表__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| wp_wechat_vote_rule | 活动规则表 |
| wp_wechat_vote_active | 活动表 |
| wp_wechat_vote_details | 活动详情表 |
| wp_wechat_vote_template| 投票活动模板表 |

### 新增活动

+ __接口地址__： __/vote/active/tlist__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| page | int | 当前页 默认1 |
| cid | int | 分类id |

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
| id | int(11) | 模板id |
| name | varchar(255) | 模板名 |
| cover | int(11) | 模板图片 |

### 活动列表

+ __接口地址__： __/vote/active/list__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| page | int | 当前页 默认1 |
| keyword | string | 活动标题搜索 |
| tid | int | 模板id |

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
| id | int(11) | 活动id |
| active_name | varchar(255) | 活动名 |
| active_time | string| 活动时间 |
| active_cover | string | 活动图片 |
| tid | int | 模板id |

### 活动信息详情

+ __接口地址__： __/vote/active/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | 活动id编号，保存没有id，更新有id|
| tid | int | 模板id,保存有tid，更新没有tid |


+ __响应参数__

>  活动基本设置数据

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | 活动id编号 |
|   其他参数| Array| 同活动信息保存的请求参数一样 |
|  link | String| 预览的二维码链接地址，更新没有此参数 |

### 活动信息保存

+ __接口地址__： __/vote/active/add__

+ __请求参数__

>  活动基本设置数据

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| active_name | string | 活动名称,必填 |
| active_time | string | 活动时间 ,必填,格式如下 |
| --------- | -------- | ------- |

```json
{
"active_time":
  { "start_time":"2017-01-01","end_time":"2017-05-01"}
}
```

| active_cover | string | 活动图片,必填 |
| active_rule | string | 活动规则,必填 |
| is_attend | number | 是否伪关注，必填， 1不需要伪关注，2，二维码伪关注,3,推文链接地址伪关注--分享链接|
| active_qrcode | string | 二维码图片，非必填 |
| active_attention | string | 二维码关注文字，非必填 |
| tid | number | 模板id编号 |

> 活动分享数据

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| share_title | string | 分享标题 ，非必填|
| share_desc| string | 分享详情，非必填 |
| share_cover  | string | 分享图片，非必填|
| share_link | string | 分享链接---如果是否伪关注为3，则不能为空|

> 活动模板数据

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| order_type| Number | 排序方式(1,参与时间倒序,2,按票数从高到低，3，编号从低到高) |
| col_num | Number | 显示方式(1,双排显示，2，三排显示，3，单排显示) |
| show_num | Number | 每页选手数量，必填|
| cat_bgc | string | 分类背景颜色,按钮背景颜色，非必填|
| body_bgc | string | 背景颜色，非必填|
| button_color | string | 按钮字体颜色，非必填|
| modal_bg | string | 模板的背景图片，非必填|
| is_show | Number | 投票结果(1，关闭，2，显示) |
| cat_icon  | string | 分类图片,非必填|


> 页面数据

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| pre_type| Number | 投票类型(1,固定次数-- 每个账号投票次数，2，周期次数--每个账号每天投票次数)|
| pre_num | Number | 投票次数，必填|
| cat_name | String | 分类名称列表集,必填 |
| --------- | -------- | ------- |

```json
{
"cat_name":"五彩森林，赏梅胜地"
}
```

| cat_max_vote  | Number | 每个分类最少投票数，必填|
| least_vote  | String |每次投票总数，必填 ,格式如下,每次投票总数等于3票（注意：投票总数必须大于分类数量*每个分类最少投票数）|
| --------- | -------- | ------- |

```json
{
"least_vote":["=", "3"]
}
```

| -----友情设置---- | -------- | ------- |
| follow | String |友情链接,格式如下 ，非必填|

```json
{
"follow":[
  { "name":"浙江发布","url":"https://weixin.zjol.com.cn"},
  { "name":"浙江发布","url":"https://weixin.zjol.com.cn"}
  ]
}
```

| -----防刷设置---- | -------- | ------- |
| is_verify | Number | 开启验证码（1，关闭，2，开启） |
| is_black | Number | 开启黑名单(1，关闭，2，开启) |
| -----报名设置---- | -------- | ------- |
| is_enroll | Number | 用户报名（1，关闭，2，开启） |
| poll_time | string | 报名时间 ,必填,格式如下 |
| --------- | -------- | ------- |

```json
{
"poll_time":
  { "start_time":"2017-01-01","end_time":"2017-05-01"}
}
```

| is_check | Number | 选手报名审核(1，关闭，2，开启) |
| nickname | String | 呢称，必填 |
| image_num | Number | 照片上传数量，必填 |
| is_phone| Number | 手机号码(1,选填，2,必填 3，不显示) |
| is_address| Number | 地址(1,选填，2,必填 3，不显示) |
| is_describe| Number | 描述(1,选填，2,必填 3，不显示) |
| define_field | String |自定义字段， 格式如下 (type类型为1,选填，2,必填 3，不显示) |

```json
{
"define_field":[
  {"name":"简介","type":1},
  {"name":"简介","type":1},
  {"name":"简介","type":1}
  ]
}
```


### 活动信息更新

+ __接口地址__： __/vote/active/update__

+ __请求参数__

>  活动基本设置数据

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
|   id       | Number | 活动id编号 |
|   其他参数| Array| 同活动信息保存的请求参数一样 |
| tid | number | 模板id编号,在更新的时候去除 |

###  修改状态

+ __接口地址__： __/vote/active/status__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *id | number |  活动id编号 |
| *status | number | 1 开启  0 关闭  -1 删除  |

+ __响应参数__

> 成功返回200状态码