#littleSlideFade
===============

##简介
-----

>这是一个目前只支持淡入淡出切换的轮播图插件，依赖于jquery，压缩之后只有3kb大小。
>功能简单，支持pc和移动端设备
>支持小圆点
>支持左右切换按钮
>支持触摸设备左右滑动切换

##代码
------

	>html
	>简单清晰，样式神马扩展性比较高，随意定制

		<div id="slide" class="slide">
			<ul>
				<li class="page1"></li>
				<li class="page2"></li>
				<li class="page3"></li>
			</ul>
		</div>

	>css
	>简单写了一点，全屏自适应的css

		*{margin: 0; padding: 0;}
		ul,li{list-style: none;}
		html,body{width: 100%;height: 100%;}
		
		/* 轮播图 */
		.slide,
		.slide ul,
		.slide li{position: relative;width: 100%;height: 100%;}
		.slide li{position: absolute; top: 0; left: 0; display: none;background: url(images/banner1.jpg) center no-repeat;background-size: cover;}

		.slide{height: 50%;}

		.slide .page1{}
		.slide .page2{background-image: url(images/banner2.jpg);}
		.slide .page3{background-image: url(images/banner3.jpg);}
		
		/* 圆点 */
		.slide-dot{position: absolute; bottom: 20px; left: 0; width: 100%; text-align: center;}
		.slide-dot span{display: inline-block; *display: inline; *zoom: 1; margin: 0 4px; width: 16px; height: 16px; text-indent: -9999px; background: #eee; cursor: pointer; border-radius: 8px;
			-webkit-touch-callout: none;
		    -webkit-user-select: none;
		    -khtml-user-select: none;
		    -moz-user-select: none;
		    -ms-user-select: none;
		    user-select: none;
		}
		.slide-dot span:hover,
		.slide-dot span.z-sel{background: #000;}

		/* 左右切换按钮 */
		.codev,
		.next{position: absolute; top: 50%; margin-top: -50px;width: 50px; height: 100px; line-height: 100px; font-size: 30px; color: #333; text-align: center; font-weight: bold; text-decoration: none; background: #fff; border-radius: 5px;}
		.codev{left: 10px;}
		.next{right: 10px;}
		.codev:hover,
		.next:hover{color: #fff;background: #333;}

	>js
	>可配置参数蛮齐全的，有不明白的地方欢迎联系我！</p>
	>需要引入jquery文件以及插件本身。</p>

		<script src="src/jquery.min.js"></script>
		<script src="src/jquery.littleSlideFade.min.js"></script>
		<script>
		$(function(){
			$('#slide').littleSlideFade({
		        // 是否自动轮播
		        auto : true,
		        // 自动轮播间隔时间
		        delay : 3000,
		        // 动画时间
		        animateTime : 1200,
		        // 动画速度的 easing 函数
		        animateEasing : 'swing',
		        // 从第几张图开始播放，第一张为0
		        startSlide : 0,
		        // 是否显示圆点
		        hasDot : true,
		        // 圆点父元素class
		        dotClass : 'slide-dot',
		        // 圆点的当前活动样式
		        dotActiveClass : 'z-sel',
		        // 圆点切换触发事件
		        dotClick : 'click',
		        // 是否显示左右切换按钮
		        hasBtn : true,
		        // 上一个按钮class
		        codevClass : 'codev',
		        // 下一个按钮class
		        nextClass : 'next',
		        // 是否支持触摸
		        hasTouch : true,
		        // 在动画完成之前是否禁止切换
		        isPauseAnimate : false,
		        // 开始切换之前执行回调
		        beforSlide : function(slide){},
		        // 切换完成之后执行回调
		        afterSlide : function(slide){}
			});
		});

</code>