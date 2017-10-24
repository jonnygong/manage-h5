

# 0、积分类项目接口

-  作者： ljw
-  场景: 积分保存
-  相关表结构

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| kfw_activity | 活动表 | 用户 |
| kfw_score_record | 活动表用户记录表 |

# 1、通用保存分数

- 调用方式: http://api.mp.kfw001.com/game/score/add

+ __接口地址__： __/score/add

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *auth | string | 用户 |
| *active_code | string | 活动编号 |
| *score | string | 获取积分  |
| *type | int | 积分保存方式  0 保存最高分  1为保存最低分   |
| tel | string | 用户电话  |
| name | string | 用户名称  |
| sex | int | 0 保密 1 女 2 男  |
| address | string | 用户地址  |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |

```text

  {status: true, info: "您没有超越您原来的分数"}
  {status: true, info: "保存用户数据成功!"}
  {status: false, info: "请稍等!"}

```

# 2 通用排名拉取

+ __接口地址__： __/score/list

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *auth | string | 用户 |
| *active_code | string | 活动编号 |
| *limit | int | 数量 返回数据 最大 50 |
| *type | int | 0 为升序1为降序 |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |

```text

  {
  "status" : true,
    "info" : "拉取排行成功",
    "param" : [
      {
          "score" : "分数",
          "nickname" : "微信昵称",
            "headimgurl" : "微信头像",
            "tel" : "电话号码", (已做**处理)
        },
        {
          "score" : "分数",
          "nickname" : "微信昵称",
            "headimgurl" : "微信头像",
            "tel" : "电话号码", (已做**处理)
        },
    ],
  }


  {
	   "status" : false,
     "info" : "拉取排行失败",
  }

```
