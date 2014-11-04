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