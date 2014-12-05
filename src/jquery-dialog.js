'use strict';
/*
 * author : towne
 * version : 0.0.2
 * date : 2014.11.20
 *
 */

jQuery.fn.dialogOpen = function (fn){

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
	box.stop().show(250,fn);
	
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
jQuery.fn.dialogClose = function(fn){
	// close btn
	var _this = this;
	var mask = $("*[dialogMask]");
	
	mask.stop().fadeOut(250);
	$("*[dialogBox]").stop().hide(250,fn)
};

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

	//计算遮罩和主体的位置及尺寸
	function init(){
		var W = $(window).width();
		var H = $('body').outerHeight() < $(window).height() ? $(window).height() : $('body').outerHeight();
		mask.css({"width" : W, "height" : H, "z-index" : "100001"});
		box.each(function(i){
			$(this).css({"left" : "50%", "margin-left" : -$(this).outerWidth()/2, "z-index" : "100001"});
			var T = ( $(window).innerHeight() - $(this).outerHeight() )/2;
			isIe6() ? $(this).css({"top" : $(window).scrollTop() + T }) : $(this).css({"top" : T});
			//console.log(T)
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
