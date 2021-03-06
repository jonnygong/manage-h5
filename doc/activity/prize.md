
# 抽奖游戏接口（V1.0.1）

-  时间：2017年11月27日
-  作者： ljw
-  场景: 抽奖游戏接口: 大转盘、红包、刮刮卡
-  前端访问： http://mp.kfw001.com/game/lottery/index/code/*****
-  api接口： http://mp.api.kfw001.com/lottery/***/***

#### token校验模式说明

- 本系统通过json web token 方式对访问的用户做校验
- token默认方式保存到cookie 中 ，键值为jwt 前端不可以通过js读取 httponly=true
- 活动开始时获取 jwt ,这个token为初始化token
- 以后每次调用都已这个初始化token换取新全新的token，直到token失效；
- token中记录了活动id和访问路径，用来判定本次访问的合法性；

#### 其他说明

- 前端活动预览不需要保持到后台中，保存到后台意味活动按指定的时间开始活动；

#### 相关数据库

-  相关表结构 wechat_kfw001_com
-  和原来的 wechat 的刮刮卡兼容，可以通过wechat后台的的刮刮卡模型设置活动数据 `暂时`

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| ims_scratch_activity | 活动表用户记录表 |
| ims_scratch_person | 活动表用户记录表 |


# 0、活动创建(编辑和保存)接口

- 通过活动code获取活动的详细信息;
- 获取的活动信息中包含手机端保存到的数据，请自行解析使用；

+ __接口地址__： __/Activity/add

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *auth | string | 用户 |
| active_title | string | 活动的 |
| active_type | int | 1：普通活动 2：奖励活动（特定人群才可以进入） |
| template | int | 10：刮刮卡 11  大转盘  12 红包 |
| virtual | int | 虚拟人数 |
| active_time | objec | 活动时间 |
| prize | objec | 奖品信息 |
| tips | objec | 提示语 |
| rule | strign | 规则的文本说明 |
| max_play | int | 最多可玩次数 |
| max_eplay | int | 每场最多可玩 |
| max_share | int | 每场最多可分享 |
| status | int | 1可以使用0获取关闭 |
| isshare | int | 1允许分享0不允许 |
| share_title | string | 分享标题 |
| share_desc | string | 分享信息 |
| share_link | string | 分享链接 |
| actinfo | object | 商家信息或者活动信息 |

- active_time 说明

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| start | string | 开始时间 |
| end | string | 结束时间 |

```text
[
  {"start":"2016-02-02 11:00","end":"2016-02-02 23:59"},
  {"start":"2016-02-03 00:00","end":"2016-02-03 23:59"},
  {"start":"2016-02-04 00:00","end":"2016-02-04 23:59"},
]

```
- prize 说明 `重要`
- 红包说明: 红包分类：定额红包和随机红包
- 定额红包: 需要填写：奖品数量和money  奖品数量>0 并且 money>0 认为是定额红包
- 随机红包: 需要填写：money(总金额)>0、max>0、min>0  奖品数量=0
- 概率问题：每个产品设置概率，每个奖品建立一个奖池,抽奖时按概率进入这些池抽一个给客户；没有机会进入的就是不中了；
-  概率的总和不可以大于100%,100%等于大家都中奖,>100%都不中奖,没有这个奖池；
- 奖池的名称key： 活动ID+prize+奖池概率×10 (例如：活动id=1 概率设置成 10.5%  key=1_prize_105 ）
- 对奖池的修改： 后台奖品改变需要修改奖池数据，在修改时刻，系统默认大家都不可以中奖；

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *type | string | physical 实物  |
| *sum | int | 奖品数量 |
| *name | string | 奖品名称 |
| money | float | 金额 |
| max | float | 金额最大值： 虚拟物如红包就需要 |
| min | float | 金额最小值： 虚拟物如红包就需要 |
| img | string | 奖品图片 |
| info | string | 其他说明 |
| chance | int | 奖品概率 |

```text
[
  {
    "type":"physical",
    "sum":"0",
    "name":"\u6298\u53e0\u5f0f\u81ea\u884c\u8f66\u4e00\u8f86\uff08\u4ef7\u503c399\u5143\uff0c\u989c\u8272\u968f\u673a\uff09",
    "img":"http:\/\/kfw-wechat.oss-cn-hangzhou.aliyuncs.com\/wechat\/images\/118\/2016\/02\/vMD1NL1ZddaTDz11OpSDQMOBnbi1lt.jpg"
    "info" :"其它说明"
    },
]

```

- tips 说明

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| have_award | string | 中奖了还来：今天已经获奖过咯~不要贪心哦！  |
| no_times | string | 抽奖次数用完:可次数已用完了！ |
| no_award | string | 未中奖：居然没有中奖？不如休息一下赞个手气！ |
| game_over | string | 活动结束：本场活动已结束，请等待下一场活动 |
| default | string | 默认值：谢谢！  |


# 1、获取活动信息

- 通过活动code获取活动的详细信息;
- 获取的活动信息中部分数据请自行解析使用；

+ __接口地址__： __/Activity/index

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *code | string | 活动编码 |
| auth | string | 可以不传递，按活动的类型确定，如果活动要求需求服务授权这个就是必须的 |

+ __响应参数__

- 参考 add 接口

# 2、奖品列表接口

- 通过活动code获取本次活动的奖品信息列表
- 返回一个奖品列表数组;

+ __接口地址__： __/Activity/prize

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *type | string | physical 实物  |
| *sum | int | 奖品数量 |
| *name | string | 奖品名称 |
| money | float | 金额 |
| max | float | 金额最大值： 虚拟物如红包就需要 |
| min | float | 金额最小值： 虚拟物如红包就需要 |
| img | string | 奖品图片 |
| info | string | 其他说明 |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| status | int | 1 成功 0失败 |
| msg | string | 提示语 |

# 3、用户填写表单信息接口

- 在抽奖过程中让用户填写相应的信息，用户和手机必须填写；
- 其他信息可以用字符串填入到 `other` 字段中

+ __接口地址__： __/Activity/user

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| name | string | 用户名称 |
| tel | string | 用户手机号码 |
| address | string | 地址|
| other_info | string | 其它|

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| status | int | 1 成功 0失败 |
| msg | string | 提示语 |

# 4、用户抽奖接口

- 调用这个接口前会对jwt做校验；
- 调用这个接口会对当前流量做校验；
- 调用这个接口将按系统设置的概率获取用户的中奖信息

+ __接口地址__： __/Activity/award

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| code | string | 活动编码 |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
|  *prize_id | int | 奖品id |
|  *prize_name | string | 奖品名称 |
|  *prize_type | string | 奖品类型: 1 虚拟 2 实物 3 积分 |
|  *money | string | 奖品金额 |
|  *secret | int | 奖品核销码 |

```text
  以下条件会导致没有中奖:
      1、活动时间没有开始；
      2、活动状态为关闭；
      3、没有这个活动数据
      4、中奖的概率设置大于100;
      5、没有从首页进入或者授权失败;
      6、默认每个场次只可以中一次;
      7、参与次数用完了;
      8、奖品发完了，也不可以中奖;

  错误号说明：
      200 成功
      201：没有填写有用户信息； 如果活动要求先填写用户信息就会有这个提示
       其他错误号可以不关注，直接出按后台给出的提示给用户         
```


# 5、用户奖品核销接口

- 获取用户的奖品信息，显示核销二维，供商户进行核销使用；
- 已经核销奖品再次调用显示失败；
- 已经领取的不可以再次出示核销码;

+ __接口地址__： __/info/check

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *code | string | 活动编码 |
| *awardcode | string | 活动编码 |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
|  *prizeid | int | 奖品id |
|  *name | string | 奖品名称 |
|  *type | string | 奖品类型: 1 虚拟 2 实物 3 积分 |
|  *money | string | 奖品金额 |
|  *prizecode | string | 奖品核销码 |
| info | string | 其他说明 |
|  status | int | 1 已经领取 2没有领取 (虚拟物品都默认为已经领取 ) |

# 6、中奖用户信息

- 返回最新中奖的10名中奖用户信息

+ __接口地址__： __/info/userlist

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *code | string | 活动编码 |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
|  *wxname | string | 用户微信名称 |
|  *headimgurl | string | 用户微信头像 |
|  *money | string | 中奖金额 |
|  *name | string | 奖品名称 |
|  createtime | int | 中奖时间 |

# 7、图片的共用接口

+ __接口地址__： __/img/add

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *auth | string | 用户 |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |

```text

  {status: true, info: "您没有超越您原来的分数"}
  {status: true, info: "保存用户数据成功!"}
  {status: false, info: "请稍等!"}

```
