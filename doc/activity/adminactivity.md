# 刮刮卡、红包、大转盘活动创建文档

+ 作者：qqs

+ 相关表结构

+ 专家分类，专家信息

+ 调用： http://mp.kfw001.com/Lottery/控制器/方法(247)

+ 参数前有*为必填

### 涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| ims_scratch_activity | 活动表 |


#### 创建活动

+ __接口地址__： __/Lottery/adminActivity/add__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *status | tinyint(1) | 是否启用活动，0不启用，1启用 |
| *active_title | varchar(255) | 活动标题 |
| *active_time | varchar(2550) | 活动时间,多个时段 |
| *max_play | int(11) | 最多可玩次数 |
| *max_eplay | int(11) | 每场最多可玩 |
| *max_share | int(11) | 每场最多可分享 |
| *active_type | tinyint(11) | 活动类型1普通，2奖励 |
| *virtual | int(11) | 虚拟人数 |
| *template | int(11) | 类型（10：刮刮卡 11 大转盘 12 红包） |
| *header_img | varchar(255) | 顶部版权图片 |
| *rule_link | varchar(255) | 领奖说明软文 |
| *rule | text | 规则说明 |
| *need_address | tinyint(1) | 地址是否需要填写0否1是 |
| *tips | varchar(2550) | 各类提示配置 |
| *prize | text | 各项奖品配置 |
| *isshare | tinyint(1) | 1允许分享0不允许 |
| share_title | varchar(255) | 分享标题 |
| share_desc | varchar(255) | 分享介绍 |
| share_link | varchar(255) | 分享链接 |
| share_img | varchar(255) | 分享图片 |
| config | varchar(255) | 颜色配置 |
| rid | int(11) | 关联rid |
| uniacid | int(11) | 公众号 |


+ __响应参数__

> 成功返回200状态码

```text
 prize字段中type为奖品类型（实物physical、红包red）,sum为奖品数量，chance为奖品中奖概率,name为奖品名称，link为奖品链接，min为最小金额，max为最大金额，奖品图片。
 
 active_time字段中start表示开始时间，end表示结束时间。 例如[{"start":"2017-06-21 00:00","end":"2017-06-21 23:59"},{"start":"2017-06-22 00:00","end":"2017-06-22 23:59"}]
 
 config字段中body_color为背景颜色，btn_color为按钮颜色，颜色代码例如#ccc
 
 have_award默认值:'今天已经获奖过咯~不要贪心哦！'(中奖了还来的用户)。
 no_times默认值:'可次数已用完了！'(抽奖次数用完的用户)。
 no_award默认值：'居然没有中奖？不如休息一下赞个手气！'(未中奖)。
 game_over默认值：'本场活动已结束，请等待下一场活动'(活动结束)。
 default默认值：'谢谢！'(默认值)
```