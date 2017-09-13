
# 接口通用说明


### 数据格式和调用规则

>采用json格式相互交换数据

+ __实际API接口调用__：

> 参考: https(http)://api.kfw001.com/模块/控制器/方法
> 模块/控制器/方法: 具体说明如下

+ __模块规定__：

> 本系统模块定义为: Case

+ __控制器规定__：

|  名称 | 说明 | 备注 |
|------|------|-----|
| ads  | 广告控制器 |-----|
| case | 案例控制器 |-----|
| member | 会员模块 |-----|

+ __控制器的方法规定__：

>每个控制器可能都会有以下接口

|  方法 | 说明 | 备注 |
|------|------|-----|
| list | 用于查询列表页面，需要传递page分页参数  |  post 传递  |
| info | 该方法通常用户详细页面  | get传递参数,无特殊说明可以传递 id 这个参数   |
| add  | 用于添加对象的详细信息  | 需要权限，没有权限不可以使用   |
| update  | 用于更新数据  | 需要权限，没有权限不可以使用   |
| delete  | 用于删除数据  | 需要权限，没有权限不可以使用   |
| status  | 用于修改数据的状态  | 需要权限，没有权限不可以使用   |

+ __举例说明__：

>访问广告接口，查询广告列表
>  https(http)://api.kfw001.com/Case/ads/list
>访问广告接口，查询广告详情页面
>  https(http)://api.kfw001.com/Case/ads/info

### 响应参数

|  参数名称  | 参数类型 | 参数说明 | 参数备注 |
| --------- | -------- | ------- | ------- |
| status |  number | 状态码 | ------- |
| info |  String | 文本信息 | ------- |
| param |  object | 返回的参数  | json 格式 ,在接口中返回中进行具体说明 |



### __表结构说明__：

|表名称|说明|备注|
|------|------|-----|
| case_ads_place | 广告位置  |    |
| case_ads_ads | 广告位置信息 |  |
| case_act_list| 案例信息|  |
| case_act_category | 案例分类|  |
| case_member | 访问的用户信息|  |



# 微信授权接口

> 请求地址：http://api.mp.kfw001.com/auth/wechat/web `get`

#### 请求参数

|  参数名称  | 参数类型 | 参数说明 | 参数备注 |
| --------- | -------- | ------- | ------- |
| *appid | String  | 应用ID | 测试期使用test |
| *response_type | String  | 授权方案 | auth/code |
| *scope | String  | 授权方式 | snsapi_userinfo/snsapi_base |
| *redirect_uri | String  | 授权回调地址 | 需包含{auth}或{code}替换点 |

#### 授权样例

```text
授权示例：
http://api.mp.kfw001.com/auth/wechat/web?response_type=code&appid=test&redirect_uri=http%3a%2f%2fgame.kfw001.com%2f%7bcode%7d&scope=snsapi_userinfo

样例参数
{
    appid : "test",
    response_type : "code",
    scope : "snsapi_userinfo",
    redirect_uri : "http://*.kfw001.com/{auth}",
}

授权结果:
http://*.kfw001.com/ABCDEFGHIJKLMN
```

#### 授权说明

> 任何接口/页面都检查Auth是否合法或是否失效;

> 统一授权： 去统一授权(api.mp.kfw001.com/wachet/auth)页面会返回一个: auth 加密参数  ,
   可以通过（appid, key） 对这个加密参数解码 : 可以获取  id, openid（微信唯一标识） ,ctime (过期时间)

> 可以去去统一授权(api.mp.kfw001.com/auth/getuserinfo): 获取微信头像信息  传递 auth 就可以

> 泰德系统提供解码接口： 任何页面都需要一个 auth 参数,当然你也可以使用  Wap/auth/check 接口

> 前端需要一个空白vue页面做路由跳转； 作为前端统一入口

> 微信授权：

     1、前端检查缓存、没有微信auth 如果没有去授权（公用接口），缓存auth_token ，然后调用wap/auth/check  验证这个token 是否有效，如果无效继续授权;

     2、前端检查缓存,有微信auth, 然后调用wap/auth/check  验证这个token 是否有效, 无效进入授权; 有效开始路由

> 任何页面 都需要传递这个参数 auth_token; 后台接口都会检查这个token, 如果无效 就会返回 304

------------

# 根据Auth获取微信基础信息

> 请求地址：http://api.mp.kfw001.com/auth/wechat/getMember `get`

#### 请求参数

|  参数名称  | 参数类型 | 参数说明 | 参数备注 |
| --------- | -------- | ------- | ------- |
| *appid | String  | 应用ID | 测试期使用test |
| *auth | String  | 用户信息加密串 | auth/code |

#### 返回样例
```json
{
    "status" : true,
    "info" : "获取用户信息成功",
    "param" : {
        "id" : "会员编号",
    	"nickname" : "会员昵称",
    	"headimgurl" : "头像",
    	"city" : "城市",
    	"sex" : "性别", // 1男，2女，0未知
        "member" : { // 仅在用户有信息填写后产生此键
            "name" : "姓名",
            "tel" : "联系电话", // 模糊处理 137*****5327
            "address" : "住址" // 模糊处理
    	}
    }
}
```

------------

###解码接口接口

> 后台解码这个 auth_token 可以获取openid（微信唯一标识） ,ctime (过期时间)
> 后台可以根据这个ctime 决定是否需要再次授权；再次授权和解码错误

+ __接口地址__： __/Wap/auth/check__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| auth | string | 微信授权加密串 |

+ __响应参数__

> 成功返回200状态码 ，可以进行其他地址路由了

> 如果失败：返回 304 需要重新授权

> 如果解码错误：返回 305 解码错误,不在路由;

> 如果解码错误：返回 306 身份过期 30 分钟 ;



+ __示例__
