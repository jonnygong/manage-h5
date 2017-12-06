
# 投票接口（V1.0.1）

-  时间：2017年12月06日
-  作者： lhx
-  场景:  投票
-  前端访问： http://mp.kfw001.com/vote//vote/index?aid=***
-  api接口： http://mp.kfw001.com/vote/***/***

#### token校验模式说明

- 本系统通过json web token 方式对访问的用户做校验
- token默认方式保存到cookie 中 ，键值为jwt 前端不可以通过js读取 httponly=true
- 活动开始时获取 jwt ,这个token为初始化token
- 以后每次调用都已这个初始化token换取新全新的token，直到token失效；
- token中记录了活动id和访问路径，用来判定本次访问的合法性；

#### 相关数据库

- 数据库名称(vote_kfw001_com)

+ __相关表__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| wp_wechat_vote_rule | 活动规则表 |
| wp_wechat_vote_record | 投票记录表 |
| wp_wechat_vote_join | 投票用户表 |

# 0、投票用户信息列表

+ __接口地址__： __/vote/info

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| otherData | array | 投票规则信息 |
| listData | array | 投票用户信息  |

- otherData 说明

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| header | string | 活动头图 |
| cat | string | 活动用户分类图 |
| qrcode | string | 活动公众号二维码图片 |
| rule | string | 活动规则信息 |


- listData 说明

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| title | string | 用户分类名或分类标题 |
| checkedList | array | 用户分类被选中的id集([1,2,3,4]) |
| spots | array |  用户信息|

- spots 说明

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | Number | 用户id |
| img | string | 图片 |
| title | string |  标题|
| info | string |  详情|
| url | string |  链接地址|
| checked | boolean |  选中状态|

```text
{
  "otherData":{
    "header":"http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/header.png",
    "cat":"http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/cat.png",
    "qrcode":"http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/qrcode.jpg",
    "rule":"投票规则： 每天1次，每分类最少选择1个景点，每次需投10票（含10票）以上。"
  },
  "listData": [
    {
      "title": "赏梅胜地",
      "checkedList": [],
      "spots": [
        {
          "id": 1,
          "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/1.jpg",
          "title": "余杭超山风景区",
          "info": "超山风景区是江南著名的三大赏梅胜地之一。",
          "url": "",
          "checked": false
        },
        {
          "id": 2,
          "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/2.jpg",
          "title": "杭州植物园灵峰探梅",
          "info": "冬春季节，杭州植物园最为有名的莫过于灵峰探梅。",
          "url": "",
          "checked": false
        }]
    },
    {
      "title": "五彩森林（果）胜地",
      "checkedList": [],
      "spots": [
        {
          "id": 3,
          "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/3.jpg",
          "title": "长兴东方梅园",
          "info": "长兴东方梅园拥有梅花苗木培育基地3000余亩，是目前全国最大的红梅基地，有各类优良梅花品种共计60余个",
           "url": "",
          "checked": false
        },
        {
          "id": 4,
          "img": "http://kfw-vote.oss-cn-hangzhou.aliyuncs.com/newvote/static/images/4.jpg",
          "title": "临安蜡梅保护区",
          "info": "临安山又名双峰尖，海拔678米，北坡有成片的野生蜡梅400余亩，1998年被政府列入自然保护小区。",
          "url": "",
          "checked": false
        }]
     }]

}
```
# 1、用户票数列表接口

+ __接口地址__： __/vote/show

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| vote | array | 投票列表 {被投票id：投票数}|

```text
{
  "vote":
  { "1":10,
    "2":20,
    "3":30
  }
}
```
# 2、投票接口

+ __接口地址__： __/vote/poll

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| jids | array | 被投票用户列表[用户id，用户id]|


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| vote | array | 投票列表 {被投票id：投票数}|

```text
{
  "vote":
  { "1":10,
    "2":20,
    "3":30
  }
}
```
# 3、清空数据接口

+ __接口地址__： __/vote/clear

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |


# 4、增加票数接口

+ __接口地址__： __/vote/addnum

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| jids | string | 被投票用户列表(1,2,3,4,5)|
| num | number | 增加票数|
| aid | number | 投票活动id|

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |

# 5、投票活动id加密

+ __接口地址__： __/vote/encrypt

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| id | number | 投票活动id|

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| aid | string | 活动标识，加密后的aid|