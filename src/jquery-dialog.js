'use strict';
/*
 * author : towne
 * version : 0.0.1
 * date : 2014.10.22
 *
 */

jQuery.fn.dialog = function (){
	// 弹出层的事件源
	var source = $("*[dialogOpen]");
	// 弹出层的遮罩层
	var mask = $("*[dialogMask]");
	// 弹出层的主体
	var box = $("*[dialogBox]");
	// 弹出层的关闭源
	var close = $("*[dialogClose]");
	
	// 初始化 || 默认隐藏弹出层的元素
	mask.stop().hide();
	box.stop().hide();
	init();
	
	// 窗口尺寸重载
	$(window).on('resize scroll', function(){
		init();
	})
	// 对不同的源触发不同的弹出层
	source.each(function(i){
		$(this).on('click', function(){
			mask.stop().fadeIn(250);
			box.stop().hide();
			var _this = this;
			box.each(function(){
				// 具体联动属性的配对
				if( $(_this).attr('dialogOpen') === $(this).attr('dialogBox') ){
					$(this).stop().show(250);
				}
			})
		})
	});
	// 关闭统一
	close.each(function(i){
		$(this).on('click', function(){
			mask.stop().fadeOut(250);
			box.stop().hide(250)
		})
	});
	//计算遮罩和主体的位置及尺寸
	function init(){
		var W = $(window).width();
		var H = $('body').outerHeight() < $(window).height() ? $(window).height() : $('body').outerHeight();
		mask.css({"width" : W, "height" : H, "z-index" : "100"});
		box.each(function(i){
			$(this).css({"left" : "50%", "margin-left" : -$(this).outerWidth()/2, "z-index" : "101"});
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
}
$(window).dialog();