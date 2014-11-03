'use strict';
/*
 * author : towne
 * version : 0.0.1
 * date : 2014.10.22
 *
 */

jQuery.fn.foot = function (){
	$(window).load(function(){
		var H = $('[foot]').height();
		if( $("body").height() < $(window).height() ){
			$('[foot]').css({
				'position' : 'absolute',
				'top' : "100%",
				'margin-top' : -H
			})
		}
	})
}
$(window).foot();