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