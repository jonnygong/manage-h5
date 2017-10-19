

# 0、计数接口

-  按活动定义的量，返回唯一的CODE；
-  场景: 1、计数，有多人参加了这个活动； 2、获取一定兑奖code
-  相关表结构

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| kfw_activity | 活动表 | 用户 |
| kfw_activity_code | 活动表用户记录表 |

# 1、获取指定数量的随机

- 指定数量: 例如400  获取完毕活动结束
- 保存参与活动的用户openid
- 调用方式: http://api.mp.kfw001.com/game/Activity/getCode
- 2017 国庆藕园 项目  测试active_code:123  正式active_code:23456

+ __接口地址__： __/Activity/getCode

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *auth | string | 用户 |
| *active_code | string | 活动编号  请调用： /act/add 活动活动code  |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| code | string | 计数code,或者兑奖code |

```text

  {status: true, info: "获取一份礼物"} //成功获取

  {status: false, info: "没有中奖!"}

```

# 2 中奖用户查询

+ __接口地址__： __/Activity/user

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| auth | string | 用户 |
| appid | string | 授权应用ID |
| active_code | string | 活动编号  需要后台技术给到  测试code: 123 |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
```text

  {status: true, info: "成功"} //成功获取

  {status: false, info: "没有用户信息"}

```
