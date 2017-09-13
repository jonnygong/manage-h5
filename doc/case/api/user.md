# 用户相关

----------------
### 用户登录

+ __接口地址__： __/Cases/User/token__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| avatarUrl | string | 用户头像 |
| city | string | 用户城市 |
| country | string | 用户国家 |
| gender | string | 性别 1女 2男  |
| language | string | 语言 |
| nickName | string | 昵称 |
| province | string | 用户所在省 |

+ __响应参数__

>   param 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| token | string | 会员标识 |
