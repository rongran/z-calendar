#z-calendar

简单的日历控件，不依赖任何外部库


----------


### 使用方法 
 很简单！！！


在html文件head中引入css文件
	`<link rel="stylesheet" href="z-calendar.css"/>`

在body之前引入script文件
	`<script type="text/javascript" src="z-calendar.js"></script>`

在body内任意位置添加div元素，设置id和class，id随意设置，class为z-calendar
	`<div id="calendar" class="z-calendar"></div>`

在script中
	`window.onload = function () {
		new ZCalendar('z_calendar');
   	}`
   	


----------
参考了司徒正美大师的博客才做出来，感谢。

