
# 通用授权auth接口

- 本接口供前端调用
- 前端判断： 如何没有auth参数就去调用一下，后台会在url中增加这个参数;
- http://api.mp.kfw001.com

+ __接口地址__： __/auth/wechat/web__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *response_type | string | auth |
| *appid | string | 测试：test 正式： 请到 mp.kfw001.com 上配置 |
| *scope | string | snsapi_userinfo：返回用户信息 |
| redirect_uri | string | 接口调用后返回的域名,请参考下面例子|

```text

 举例：
   http://api.mp.kfw001.com/auth/wechat/web?response_type=auth&appid=test&scope=snsapi_userinfo&redirect_uri=http%3a%2f%2fwechat.kfw001.com%2fwx%3fcode%3d%7bauth%7d


   redirect_uri 参数举例：
         redirect_uri=urlencode( http://wechat.kfw001.com/wx?code={auth} )
      {} 中的内容将被 接口自动替换

   返回的auth： 请前端保存好，然后传递到下一接口中（即你在次调用其他接口是，请传递带上这个auth）     
    auth： 是一个加密串

```

+ 返回 auth 参数说明

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| openid | string | 微信的open |
| uid | string | 用户id 存储到快房传媒的后台 |
| nickname | string | 用户的昵称 |
| headimgurl | string | 微信的头像|

- 返回的auth 参数不允许 前端解析

# 获取微信头像信息接口

+ __接口地址__： __/auth/wechat/getMember__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *auth | string | 授权码 |

+ __返回参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| nickname | string | 微信昵称 |
| sex | string | 性别 |
| city | string | 城市 |
| country | string |国家 |
| province | string | 省 |
| headimgurl | string | 头像 |
| remark | string | 备注 |
| member_id | string | 用户id |



# 保存用户信息

+ __接口地址__： __/auth/wechat/setMember__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *auth | string | 授权码 |
| *tel | string |用户手机号码 |
| address | string | 用户地址 |
| name | string | 用户名称 |

+ __返回参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| 成功和失败 | -------- | ------- |


# 获取分享接口

+ __接口地址__： __/auth/wechat/jssdk__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| public_id | int | 微信服务号：1快收礼(默认), 3快房传媒 |
