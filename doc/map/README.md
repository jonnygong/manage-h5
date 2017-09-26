

# 接口文档

 - [广告接口](/doc/map/Ad.md)
 - [楼盘查询数据接口](/doc/map/House.md)


# 部署说明

- 后台： http://h.kfw001.com/admin/hous_map/
- 前端： http://h.kfw001.com/web/hous_map/

# 相关数据库

- show_kfw001  以projiect 相关的表

# 楼盘地图相关需求描述

> 采用原来快房的数据库： kfw001_data  inch_housing

> 区域：  housing_area  
    1 滨江区  2 西湖区 3 下城区 4 拱墅区 5 上城区  6 江干区 7 余杭区 8 富阳 9 临安 10 萧山区  109 之江  110 下沙

>是否学区：isschooldistrict  1 是的  0 不是

>地铁：
        1 地铁一号线
        2 地铁二号线  
        3 地铁三号线
        4 地铁四号线
        5 地铁五号线
        40 地铁六号线
        41地铁七号线
        42 地铁八号线
        79 地铁9号线
        80 地铁十号线

> 地图相关： 经度维护:  housing_longitude  纬度：housing_latitude

> 按价格区间： 15000元以下   15000-20000元/㎡   20000-30000元/㎡  40000元/㎡ 以上     

> 户型面积：  housing_mainhousing: 存储为文本  182平方_216平方米  

> 售楼地址： housing_selladdress

> 楼盘地址： housing_address

> 楼盘名称 + 均价： housing_name  +  housing_avgprice   avgprice_type：0 均价

> 类别；housing_class　　＃1



+ 默认定位到：

+ 地图放大到 一定倍数时： 市

+ 进入时按区域显示楼盘的数量 ： 例如： 西湖区 80个楼盘

+ 地图放大到 一定倍数时：   显示楼盘信息: 名称+ 均价

+ 点击楼盘：  名称：
             类别： 住宅
             均价： 开盘后显示 尾盘
             地址：
             咨询电话： ×× 转电话   
             图片：        

+ 选中颜色变化：

+ 查询：  
      1、 地铁沿线楼盘如何查询？
