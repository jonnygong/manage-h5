# 楼盘规格 接口文档

> 本接口用于案例模块、

###涉及的表结构

|  表名称  |  参数说明 |
| --------- |  ------- |
| kfw_project_specs| 楼盘规格|
| kfw_project_list| 楼盘信息|

###设置项目规格 ，点击修改按钮后访问

+ __接口地址__： __/Mapadmin/Specs/edit__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| project_id | int(11) | 项目id |


+ __响应参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| data | Object | 数据 |

>  data 类型：__[Object]__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| project_id | int(11) |  |
| floor_space | varchar(255) | 占地面积 |
| building_space | varchar(255) | 建筑面积 |
| space_ratio | varchar(255) | 容积率 |
| green_space | varchar(255) | 绿化面积 |
| plan_room_num | int(11) | 规划户数 |
| park_num | int(11) | 停车位数量 |
| fitment | varchar(255) | 装修 |
| lift_brand | varchar(255) | 电梯品牌 |
| outer_wall | varchar(255) | 外立面材料 |
| property_company | varchar(255) | 物业公司 |
| traffic_info | varchar(255) | 交通配套 |
| education_info | varchar(255) | 教育配套 |
| hospital_info | varchar(255) | 医疗配套 |
| bussiness_info | varchar(255) | 商业配套 |
| building_company | varchar(255) | 开发商 |
| property_type | varchar(255) | 地块物业类型 |
| property_limit | varchar(255) | 产权年限 |


###修改页面 保存

+ __接口地址__： __/Mapadmin/Specs/save__

+ __请求参数__

|  参数名称  | 参数类型 | 参数说明 |
| --------- | -------- | ------- |
| project_id | int(11) |  |
| floor_space | varchar(255) | 占地面积 |
| building_space | varchar(255) | 建筑面积 |
| space_ratio | varchar(255) | 容积率 |
| green_space | varchar(255) | 绿化面积 |
| plan_room_num | int(11) | 规划户数 |
| park_num | int(11) | 停车位数量 |
| fitment | varchar(255) | 装修 |
| lift_brand | varchar(255) | 电梯品牌 |
| outer_wall | varchar(255) | 外立面材料 |
| property_company | varchar(255) | 物业公司 |
| traffic_info | varchar(255) | 交通配套 |
| education_info | varchar(255) | 教育配套 |
| hospital_info | varchar(255) | 医疗配套 |
| bussiness_info | varchar(255) | 商业配套 |
| building_company | varchar(255) | 开发商 |
| property_type | varchar(255) | 地块物业类型 |
| property_limit | varchar(255) | 产权年限 |


+ __响应参数__

> 成功返回200状态码


+ __示例__

``` javascript
```