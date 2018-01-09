# 抽奖微信端接口

+ 作者：qqs

+ 调用： https://api.mp.kfw001.com/模型/控制器/方法(247)

+ 参数前有*为必填

### 涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| ims_scratch_activity | 活动表 |
| ims_scratch_person | 活动参与人员表 |
| ims_scratch_person_prize | 中奖人员表 |
| ims_serath_white_list | 白名单 |

#### token校验模式说明

- 本系统通过json web token 方式对访问的用户做校验
- token默认方式保存到cookie 中 ，键值为jwt 前端不可以通过js读取 httponly=true
- 活动开始时获取 jwt ,这个token为初始化token
- 以后每次调用都已这个初始化token换取新全新的token，直到token失效；
- token中记录了活动id和访问路径，用来判定本次访问的合法性；


### 抽奖入口文件

+ __接口说明__： __用于进入活动页面的入口方法，由php渲染__

+ __接口地址__： __/Lottery/Activity/index__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *code | string | 包含活动id的加密串 |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |

- 生成token后会自动进入活动页面



### 抽奖活动表详情数据

+ __接口说明__： __用于获取抽奖活动表详情数据、活动时间、活动状态__

+ __接口地址__： __/Lottery/Activity/info__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| time | Object | 当前活动时间（活动状态为-1时，为空，0时为下个时间段的活动时间，1时当前活动时间段） |
| status | int | 活动状态 -1活动已结束，0活动未开始（指活动的某个时间段还未开始），1活动进行中（指活动的某个时间段进行中） |
| prize | Object | 活动奖品 |
| info | Object | 活动信息 |
| aid | int | 活动id |

>  time 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| start | string | 开始时间  |
| end | string |  结束时间 |

>  prize 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| type | string | 奖品类型，实物physical、红包red、劵码coupon |
| desc | string | 奖品描述 |
| sum | int | 奖品数量 |
| chance | float | 中奖概率 |
| name | string | 奖品名称 |
| link | string | 奖品链接 |
| min | float | 最小金额 |
| max | string | 最大金额 |
| money | string | 总金额 |
| img | string | 奖品图片 |

>  info 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int(11) | 活动id |
| status | tinyint(1) | 是否启用活动，0不启用，1启用 |
| active_title | varchar(255) | 活动标题 |
| active_time | varchar(2550) | 活动时间,多个时段 |
| max_play | int(11) | 最多可玩次数 |
| max_eplay | int(11) | 每场最多可玩 |
| max_share | int(11) | 每场最多可分享 |
| max_prize | int(11) | 每场最多中几次 |
| active_type | tinyint(11) | 活动类型1普通，2奖励 |
| virtual | int(11) | 虚拟人数 |
| template | int(11) | 类型（10：刮刮卡 11 大转盘 12 红包） |
| header_img | varchar(255) | 顶部版权图片 |
| rule_link | varchar(255) | 领奖说明软文 |
| rule | text | 规则说明 |
| need_address | tinyint(1) | 地址是否需要填写0否1是 |
| tips | varchar(2550) | 各类提示配置 |
| prize | text | 各项奖品配置 |
| isshare | tinyint(1) | 1允许分享0不允许 |
| share_title | varchar(255) | 分享标题 |
| share_desc | varchar(255) | 分享介绍 |
| share_link | varchar(255) | 分享链接 |
| share_img | varchar(255) | 分享图片 |
| config | varchar(255) | 颜色配置 |
| rid | int(11) | 关联rid |
| uniacid | int(11) | 公众号 |
| create_time | int(11) | 创建时间 |
| update_time | int(11) | 修改时间 |



### 抽奖接口

+ __接口说明__： __用于抽奖__

+ __接口地址__： __/Lottery/Activity/award__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |


+ __响应参数__

> 成功返回200状态码  

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | int | 中奖信息id |
| prize_id | string | 奖品id |
| prize_name | string | 奖品名字 |
| prize_type | string | 奖品类型，实物physical、红包red、劵码coupon |
| prize_img | string | 奖品图片 |
| prize_desc | int | 奖品描述 |
| money | string | 中奖金额 |
| time | string | 中奖时间 |
| secret | string | 奖品秘钥 |



### 分享+1

+ __接口说明__： __用于用户分享时，分享次数+1，走redis__

+ __接口地址__： __/Lottery/Activity/share__

+ __响应参数__

> 成功返回200状态码




### 中奖用户信息填写

+ __接口说明__： __用于保存用户信息__

+ __接口地址__： __/Lottery/Activity/user__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *pid | string | 中奖信息id |
| *realname | string | 名称 |
| *tel | string | 电话 |
| *address | string | 地址 |
| other_info | string | 备注 |


+ __响应参数__

> 成功返回200状态码



### 该活动该用户中奖信息表

+ __接口说明__： __用于查询用户在该活动中中奖的奖品__

+ __接口地址__： __/Lottery/Activity/prizeList__


+ __响应参数__

> 成功返回200状态码



### 白名单录入入口文件

+ __接口说明__： __用于进入录入页面的入口方法，由php渲染__

+ __接口地址__： __/Lottery/Activity/white__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *code | string | 包含活动id的加密串 |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |

- 生成token后会自动进入录入页面



### 录入名单

+ __接口说明__： __用于录入白名单__

+ __接口地址__： __/Lottery/Activity/add__


+ __响应参数__

> 成功返回200状态码

