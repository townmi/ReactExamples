'use strict';
/*
 * author : towne
 * version : 0.0.2
 * date : 2014.11.20
 *
 */

jQuery.fn.dialogOpen = function (){

	// this is open source
	var _this = this;

	var secret = $(_this).attr('dialogOpen');

	var box;

	$("*[dialogBox]").each(function(){
		if($(this).attr('dialogBox') === secret){
			// box is open Box
			box = $(this);
		}
	});

	var mask = $("*[dialogMask]");

	// 初始化 || 默认隐藏弹出层的元素
	mask.stop().hide();
	box.stop().hide();
	init();
	
	// 窗口尺寸重载
	$(window).on('resize scroll', function(){
		init();
	})

	mask.stop().fadeIn(250);
	box.stop().show(250);
	
	//计算遮罩和主体的位置及尺寸
	function init(){

		var W = $(window).width();
		var H = $('body').outerHeight() < $(window).height() ? $(window).height() : $('body').outerHeight();

		mask.css({"width" : W, "height" : H, "z-index" : "1000000"});

		box.each(function(i){
			$(this).css({"left" : "50%", "margin-left" : -$(this).outerWidth()/2, "z-index" : "10000011"});
			var T = ( $(window).innerHeight() - $(this).outerHeight() )/2;
			isIe6() ? $(this).css({"top" : $(window).scrollTop() + T }) : $(this).css({"top" : T});
		})
	}
	// IE6
	function isIe6(){
		var str = window.navigator.userAgent.toLowerCase();
		if( str.indexOf('msie 6') != -1 )return true;
		return false;
	}
};
jQuery.fn.dialogClose = function(){
	// close btn
	var _this = this;
	var mask = $("*[dialogMask]");
	
	mask.stop().fadeOut(250);
	$("*[dialogBox]").stop().hide(250)
}


/*
 * author : towne
 * version : 0.0.1
 * date : 2014.10.22
 *
 */

jQuery.fn.arcProcess = function (){
	$(window).load(function(){
		// Process Object
		function Process(obj){
			this.canvas = obj.canvas;
			this.process = obj.process;
			this.W = this.canvas.width;
			this.ctx = this.canvas.getContext('2d');
			this.color = obj.color;
			this.oldColor = obj.oldColor;
			this.step = 0;
			this.timer = null;
		}
		// 绘图方法
		Process.prototype.draw = function(){
			this.ctx.clearRect(0, 0, this.W, this.W);
			this.ctx.beginPath();
			this.ctx.moveTo(this.W/2, this.W/2);
			this.ctx.arc(this.W/2, this.W/2, this.W/2, 0, Math.PI * 2, false);
			this.ctx.closePath();
			this.ctx.fillStyle = this.oldColor;
			this.ctx.fill();

			// 判断终点
			if(this.step > this.process){
				this.step = this.process
				clearInterval(this.timer);

			}
			this.ctx.beginPath();
			this.ctx.moveTo(this.W/2, this.W/2);
			this.ctx.arc(this.W/2, this.W/2, this.W/2, Math.PI*1.5, Math.PI * (1.5 - this.step /50), true);
			this.ctx.closePath();
			this.ctx.fillStyle = this.color;
			this.ctx.fill();

			this.ctx.beginPath();
			this.ctx.moveTo(this.W/2, this.W/2);
			this.ctx.arc(this.W/2, this.W/2, this.W/2-7, 0, Math.PI * 2, true);
			this.ctx.closePath();
			this.ctx.fillStyle = '#ffffff';
			this.ctx.fill();
			this.step++;
		}
		Process.prototype.init = function(){
			var _this = this;
			// 初始化画图
			this.timer = setInterval(function(){
				_this.draw.apply(_this);
				
			}, 15);
		}

		// onload draw all can see
		init();

		// when scroll to the elem draw it;

		$(window).on('scroll', init);

		function init(){
			$('[process] canvas').each(function(){
				// 获取百分比
				var process = parseInt( $(this).next().html() );
				process = process>100 ? 100 : process;
				// 颜色库
				var color = {
					"ing" : "#0db2ff",
					"over" : "#fa5b48"
				}

				// 获取当前进度的UI
				var type = $(this).attr('type');
				// 生成module
				var pro = {
					canvas : this,
					process : process,
					color : color[type],
					oldColor : "#888d91"
				}
				// when get this elem postion draw it ;
				if( ( $(window).height()+$(window).scrollTop() ) > $(this).offset().top && $(this).parent().attr('process')){
					$(this).parent().attr('process',"");
					var pro_process = new Process(pro);
					pro_process.init();
				}
		    })
		}
	})
}
$(window).arcProcess();
'use strict';
/*
 * author : towne
 * version : 0.0.1
 * date : 2014.10.23
 *
 */

jQuery.fn.carouselFade = function (){
	// 图片转换
	bestImg();
	$('*[carouselFade]').each(function(){
		// 获取基础数据
		var len = $(this).find('li').length;
		var _this = this;
		var current = 0, timer = null, time = $(this).attr('carouselFade');

		// 初始化
		init();

		// auto carousel
		timer = setInterval(autoRun, time);

		// 鼠标移入、移出，关、开定时器
		$(this).hover(function(){
			clearInterval(timer);
			$(this).find('.prev').show(250);
			$(this).find('.next').show(250);
		}, function(){
			timer = setInterval(autoRun, time);
			$(this).find('.prev').hide();
			$(this).find('.next').hide();
		});

		// 左右切换事件
		$(this).find('.prev').on($(this).find('.prev').attr('event'), function(){
			current--;
			init();
		});
		$(this).find('.next').on($(this).find('.next').attr('event'), function(){
			current++;
			init();
		});

		// 序列号联动
		$(this).find('[outlook] span').on($(this).find('[outlook]').attr('event'), function(){
			current = $(this).index();
			init();
		})

		// 切换主程序
		function init(){
			current = back(current);

			$(_this).find('li').removeClass('active').stop().fadeOut(450);
			$(_this).find('li').eq(current).addClass('active').stop().fadeIn(450);

			$(_this).find('[outlook] span').removeClass('active');
			$(_this).find('[outlook] span').eq(current).addClass('active');
		};
		function autoRun(){
			current++;
			init();
		};
		
		// 索引优化。
		function back(n){
			if( n < 0 ){
				return len-1;
			}else if( n >= len ){
				return 0;
			}else{
				return n;
			}
		};
	})
	
	// 处理图片的失真---background-image
	function bestImg(){
		$('*[carouselFade] li a').each(function(){
			var src = "url("+ $(this).children()[0].src +")";
			$(this).css({'background-image' : src})
		})
	}
}
$(window).carouselFade();
'use strict';
/*
 * author : towne
 * version : 0.0.1
 * date : 2014.10.22
 *
 */

$(function(){
	
	(function(){
		var timer = [null, null];

		$("[drop]").each(function(i){
			$(this).on('mouseover', function(){
				clearTimeout(timer[i]);
				$('[fordrop]').eq(i).stop().show();
			})
		});

		$("[drop]").each(function(i){
			$(this).on('mouseout', function(){
				var _this = this;
				clearTimeout(timer[i]);
				timer[i] = setTimeout(function(){
					$('[fordrop]').eq(i).stop().hide();
				},300)
			})
		});
		

		$("[fordrop]").each(function(i){
			$(this).on('mouseover', function(){
				clearTimeout(timer[i]);
				$(this).stop().show();
			})
		});

		$("[fordrop]").each(function(i){
			$(this).on('mouseout', function(){
				var _this = this;
				clearTimeout(timer[i]);
				timer[i] = setTimeout(function(){
					$(_this).stop().hide();
				},300)
			})
		});
	})();
})