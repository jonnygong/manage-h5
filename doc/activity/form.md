

# 0、通用表单接口

-  作者： ljw
- 使用场景: 收集表单数据
- 使用条件：1、`不需要微信授权` 就是说表单不会保留和处理微信相关信息,使用`form` 这个控制器;
- 使用条件：2、需要授权使用 `authform` 这个控制器,具体见下文;
- 调用： http://api.mp.kfw001.com/game/控制器/方法

# 1、获取活动  [活动的建立接口](/doc/activity/ini.md)

- 相当创建一个表单活动，这个在活动开始时创建就可以，仅仅调用一次就好了
- 请调用： /act/add 接口   [活动的建立接口](/doc/activity/ini.md)

# 2、保存表单数据(不需要微信授权)  `推荐`  

- 在表单“活动”建立时就开始缓存数据
- 在可以对活动时间进行控制，或者到期立即不允许报名

+ __非授权接口地址__： __/form/addCache

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *active_code | string | 活动编号  需要通过：/act/add 获取  测试code: 1234  `必须填写`|
| user_name | string | 表单：用户名称 |
| user_tel | string | 表单：用户手机， 需要做简单的验证 |
| user_address | string |  表单：用户地址 |
| user_sex | int |  表单： 1 女 2男 |
| user_email | string |  表单：邮箱地址|
| user_other | string |  表单：其它信息 |
| img_urls | string |  表单：图片地址 |
| data_type | string | 数据类型 |

+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
```text
  {status: true, info: ""} //成功获取

```
# 3、保存表单数据(不需要微信授权)

- 没有缓存
- 活动结束也可以继续报名

+ __接口地址__： __/form/add       

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *active_code | string | 活动编号  需要通过：/act/add 获取  测试code: 1234  `必须填写`|
| user_name | string | 表单：用户名称 |
| user_tel | string | 表单：用户手机， 需要做简单的验证 |
| user_address | string |  表单：用户地址 |
| user_other | string |  表单：其它信息 |
| user_email | string |  表单：邮箱地址|
| img_urls | string |  表单：图片地址 |
| data_type | string | 数据类型 |
+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
```text
  {status: true, info: ""} //成功获取

```

# 4、保存表单数据(需要微信授权)  `推荐`

- 在表单“活动”建立时就开始缓存数据
- 在可以对活动时间进行控制，或者到期立即不允许报名

+ __非授权接口地址__： __/authform/addCache

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *active_code | string | 活动编号  需要通过：/act/add 获取  测试code: 1234  `必须填写`|
| user_name | string | 表单：用户名称 |
| user_tel | string | 表单：用户手机， 需要做简单的验证 |
| user_address | string |  表单：用户地址 |
| user_sex | int |  表单： 1 女 2男 |
| user_email | string |  表单：邮箱地址|
| user_other | string |  表单：其它信息 |
| img_urls | string |  表单：图片地址 |
| *auth | string | 授权接口: 微信授权auth加密串  `必须填` |
| *appid | string |授权接口: 微信授权授权快房提供的用于ID   `必须填` |
| data_type | string | 数据类型 |
+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
```text
  {status: true, info: ""} //成功获取

```
# 5、保存表单数据(需要微信授权)

- 没有缓存
- 活动结束也可以继续报名

+ __接口地址__： __/authform/add       

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| *active_code | string | 活动编号  需要通过：/act/add 获取  测试code: 1234  `必须填写`|
| user_name | string | 表单：用户名称 |
| user_tel | string | 表单：用户手机， 需要做简单的验证 |
| user_address | string |  表单：用户地址 |
| user_other | string |  表单：其它信息 |
| user_email | string |  表单：邮箱地址|
| img_urls | string |  表单：图片地址 |
| *auth | string | 微信授权auth加密串 |
| *appid | string | 微信授权授权快房提供的用于ID |
| data_type | string | 数据类型 |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
```text
  {status: true, info: ""} //成功获取

```
