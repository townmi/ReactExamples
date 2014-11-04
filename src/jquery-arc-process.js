
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
				console.log( typeof $(this).parent().attr('process') )
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