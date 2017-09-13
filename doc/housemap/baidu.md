

# 百度地图  

##快房网 ak=gtUIB6SOHBVXaZsdDyFuNQFz   百度密钥

```text

<script type="text/javascript">
//百度地图API功能
function loadJScript() {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "http://api.map.baidu.com/api?v=2.0&ak=gtUIB6SOHBVXaZsdDyFuNQFz&callback=initMap";
	document.body.appendChild(script);
}
//创建和初始化地图函数：
function initMap(){
    createMap();//创建地图
    setMapEvent();//设置地图事件
    addMapControl();//向地图添加控件
}
//创建地图函数：
function createMap(){
    var distance = 3000;
    var map = new BMap.Map("container");//在百度地图容器中创建一个地图
    var point = new BMap.Point(120.159968,30.279311);//定义一个中心点坐标
    map.centerAndZoom(point,15);//设定地图的中心点和坐标并将地图显示在地图容器中
    window.map = map;//将map变量存储在全局
    window.point = point;
    window.distance = distance;
    var marker = new BMap.Marker(point);        // 创建标注    
    map.addOverlay(marker);
    marker.enableDragging();
    marker.addEventListener("dragend",function(){
		var p = marker.getPosition();       //获取marker的位置
        selectLocation(p.lng,p.lat);
	}
	);                  // 将标注添加到地图中
}

//地图事件设置函数：
function setMapEvent(){
    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();//启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl(){
    //向地图中添加缩放控件
    var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
    map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
    var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
    map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
    var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
    map.addControl(ctrl_sca);
}

window.onload = loadJScript();  //异步加载地图

/*
 * 滨江区域划分
function getBoundary(){       
	var bdary = new BMap.Boundary();
	bdary.get("杭州市滨江区", function(rs){       //获取行政区域
		map.clearOverlays();        //清除地图覆盖物       
		var count = rs.boundaries.length; //行政区域的点有多少个
		if (count === 0) {
			alert('未能获取当前输入行政区域');
			return ;
		}
        var pointArray = [];
		for (var i = 0; i < count; i++) {
			var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#ff0000"}); //建立多边形覆盖物
			map.addOverlay(ply);  //添加覆盖物
			pointArray = pointArray.concat(ply.getPath());
		}    
		map.setViewport(pointArray);    //调整视野                 
	});   
}
setTimeout(getBoundary(), 2000);
*/
</script>
```
