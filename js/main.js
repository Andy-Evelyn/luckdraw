	var Carousel = function(){
		this.canvas = document.getElementById("canvas");
		this.context = this.canvas.getContext('2d');
		this.sub_canvas = document.getElementById("sub_canvas");
		this.sub_context = this.sub_canvas.getContext('2d');
		this.widths = 300;
		this.heights = 300;
		this.color = ["#E0E2EE","#D1C2AF","rgba(159,194,102,0.6)","#3CBB90","#84CCD8","#F4F9F5"];
		this.info = ["感谢参与","一等奖","感谢参与","二等奖","感谢参与","特等奖","三等奖","感谢参与","二等奖","感谢参与","三等奖","二等奖"];
		this.notice = null;
		this.angle = null;
		this.clickNum = 3;
		this.rollNum = 0;
		this.init();
	}

	Carousel.prototype = {
		
		initCanvas:function(){
			this.canvas.width = this.sub_canvas.width = this.widths;
			this.canvas.height = this.sub_canvas.height = this.heights;
		},

		init:function(){
			this.initCanvas();
			this.createCircle();
			this.initPoint();
			this.createCirText();
			this.start();
		},

		createCircle:function(){
			var startAngle = 0;
	        var endAngle = 0;
	        //画一个12等份扇形组成的圆形
	        for (var i = 0; i < 12; i++){
	           	startAngle = i*30*Math.PI/180 - (30/2*Math.PI/180);
	           	endAngle = startAngle + 30*Math.PI/180;
	            this.context.save();
	            this.context.beginPath(); 
	            this.context.arc(this.widths/2,this.heights/2,50, startAngle, endAngle, false);
	            this.context.lineWidth = 200;
	            if (i%2 == 0) {
	            	this.context.strokeStyle =  this.color[4];
	            }else{
	            	this.context.strokeStyle =  this.color[3];
	            }
	            this.context.stroke();
	            this.context.restore();
	        } 
		},

		createCirText:function(){
		    var step = 30*Math.PI/180;
		    for (var i = 0; i < 12; i++){
		    	this.context.save();
		    	this.context.beginPath();
		        this.context.translate(this.widths/2,this.heights/2);
		        this.context.rotate(i*step);
		        this.context.font = "18px Microsoft YaHei";
		        this.context.textAlign='start';
		    	this.context.textBaseline='middle';
		        this.context.fillStyle = this.color[5];
		        this.context.fillText(this.info[i],-15,-115,30);
		        this.context.closePath();
		        this.context.restore();
		    }
		},

		initPoint:function(){
	        //中间圆圈
	        this.sub_context.beginPath();
	        this.sub_context.arc(this.widths/2,this.heights/2,75,0,Math.PI*2,false);
	        this.sub_context.fillStyle = this.color[2];
	        this.sub_context.fill();
	        this.sub_context.closePath();
	        //中间小圆
	        this.sub_context.beginPath();
	        this.sub_context.arc(this.widths/2,this.heights/2,40,0,Math.PI*2,false);
	        this.sub_context.fillStyle = this.color[5];
	        this.sub_context.fill();
	        this.sub_context.closePath();
	       	//小圆文字
	        this.sub_context.font = "Bold 20px Microsoft YaHei"; 
		    this.sub_context.textAlign='start';
		    this.sub_context.textBaseline='middle';
		    this.sub_context.fillStyle = this.color[3];
	        this.sub_context.beginPath();
	        this.sub_context.fillText('开始',130,140,40);
	        this.sub_context.fillText('抽奖',130,160,40);
	        this.sub_context.fill();
	        this.sub_context.closePath();
	        //箭头指针
	        this.sub_context.beginPath();
	        this.sub_context.moveTo(150,74);
	        this.sub_context.lineTo(140,112);
	        this.sub_context.lineTo(160,112);
	        this.sub_context.lineTo(150,74);
	        this.sub_context.fillStyle = this.color[5];
	        this.sub_context.fill();
	        this.sub_context.closePath();
		},

		start:function(){
			var that = this;
			$('#btn').bind('click',function(){
				if(that.clickNum >= 1){
					that.clickNum -= 1;
					that.run();
					that.rollNum += 1;
					$("#btn").attr('disabled',true);
					setTimeout(function(){
						alert("您抽中了"+that.notice);
						$('#btn').removeAttr('disabled',true);
					},6000);
				}else{
					alert("亲，你已经用完三次抽奖机会了哟！");
				}
			});
		},

		run:function(){
			this.result();
			var degValue = 'rotate('+this.angle+'deg'+')';
			$('#canvas').css('-o-transform',degValue);          
			$('#canvas').css('-ms-transform',degValue);          
			$('#canvas').css('-moz-transform',degValue);        
			$('#canvas').css('-webkit-transform',degValue);     
			$('#canvas').css('transform',degValue);
		},
		
		result:function(){
			var num = parseInt(Math.random()*12 + 0);	
			// console.log(num);	
			if(num == 0){
				this.angle = 2160 * this.rollNum + 1800;
				this.notice = this.info[0];
			}
			else if ( num == 11 ) {
				this.angle = 2160 * this.rollNum + 1830;
				this.notice = this.info[11];
			}
			else if ( num == 10 ) {
				this.angle = 2160 * this.rollNum + 1860;
				this.notice = this.info[10];
			}
			else if ( num == 9 ) {
				this.angle = 2160 * this.rollNum + 1890;
				this.notice = this.info[9];
			}
			else if ( num == 8 ) {
				this.angle = 2160 * this.rollNum + 1920;
				this.notice = this.info[8];
			}
			else if ( num == 7 ) {
				this.angle = 2160 * this.rollNum + 1950;
				this.notice = this.info[7];
			}
			else if ( num == 6 ) {
				this.angle = 2160 * this.rollNum + 1980;
				this.notice = this.info[6];
			}
			else if ( num == 5 ) {
				this.angle = 2160 * this.rollNum + 2010;
				this.notice = this.info[5];
			}else if ( num == 4 ) {
				this.angle = 2160 * this.rollNum + 2040;
				this.notice = this.info[4];
			}
			else if ( num == 3 ) {
				this.angle = 2160 * this.rollNum + 2070;
				this.notice = this.info[3];
			}
			else if ( num == 2 ) {
				this.angle = 2160 * this.rollNum + 2100;
				this.notice = this.info[2];
			}else if ( num == 1 ) {
				this.angle = 2160 * this.rollNum + 2130;
				this.notice = this.info[1];
			}
		},
	};

	var carousel = new Carousel();