

# 0、 说明

-  作者： ljw
- 为了统一我们的在线的活动，特意编写这个接口
- http://api.mp.kfw001.com/game/

## 活动的建立

- 开启以后活动，设置相关必要的参数
- 可以通过后台设置活动，也可以通过该接口建立一个活动
- 相当建立了新的活动，仅仅 `开发时` 调用一次就好了，实际上线url 不应当包含这些接口

##  相关表结构

|  表名称  | 参数说明 |
| --------- |  ------- |
| kfw_activity | 活动表  |

# 1、获取活动编号

+ __接口地址__： __/act/add

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *wxname | string | 微信号中文名称 |
| *wxname_en | string | 微信号英文名称 |
| *url | string | 上线实际URL地址: 例如： http://game.kfw001.com/wx.html |
| *type | int | 活动类型：1、计数统计 2、表单 3、投票 4、问答 5、刮刮卡 6、大转盘 7、海报 9、邀请函 |
| *name | string | 活动名称 |
| *startdate | int | 活动开始时间： 时间搓 |
| *enddate | int | 活动结束时间： 时间搓 |
|  num | int | 活动参与限制总数  0 为不限制 默认 |
|  other | string | 扩展参数 |

- 为了便于数据后期的统计需要填写微信公众号的中英文名称，关注该微信号获得
- 活动的开始时间和结束时间很重要，决定接口是否可以使用；只有在设定的活动区间内接口才可以正常使用的；
- 活动一旦建立，数据就按你设定的时间进行缓存，`时间过后缓存就会失效`; 如果需要跟新请用 /act/update 接口

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| code | string | 用户活动的代码 |

- 该code 需要下次调用时使用
- code 为活动的唯一编码，目前可以保证全局唯一，每一场活动都会有一个不同的编号

```text

{status: true, info: "数据查询成功！", param: {code: "1508380526514"}}

```

# 2、更新活动时间和相关信息

- 当活动建立起来后，系统会将活动相关设置保存到缓存中，其中很重要的就是缓存；缓存和你设置的时间有关；
- 如果你需要修改，那么你就需要调用这个接口

+ __接口地址__： __/act/update

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *code | string | 活动唯一编号 |
| *pwd | string  | 接口密码   ： 默认填写 kfw00120171019 为了安全暂时设置 |
| wxname | string | 微信号中文名称 |
| wxname_en | string | 微信号英文名称 |
| url | string | 上线后的URL地址 |
| type | int | 活动类型：1、计数统计 2、表单 3、投票 4、问答 5、刮刮卡 6、大转盘 7、海报 9、邀请函  |
| name | string | 活动名称 |
| startdate | int | 活动开始时间 |
| enddate | int | 活动结束时间 |

- 为了便于数据后期的统计需要填写微信公众号的中英文名称，关注该微信号获得
- 活动的开始时间和结束时间很重要，决定接口是否可以使用；只有在设定的活动区间内接口才可以正常使用的；

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |

```text

  {status: true, info: ""}

```

# 3、查询缓存,调试时使用,

- 调试使用,

+ __接口地址__： __/act/getCache

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *code | string | 活动唯一编号 |


- 为了便于数据后期的统计需要填写微信公众号的中英文名称，关注该微信号获得

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |

```text

  {status: true, info: ""}

```
