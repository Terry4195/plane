const myPlane = require("./myplane");
const Enemy = require("./enemy");
const QFTools = require("./tools");

function Engine(){
	this.init();
}

Engine.prototype.init = function(){
	var _this = this;
	//保存父级大盒子
	this.bodyMain = QFTools.$("#body_main");
	//找到所有的点击难度的ul
	this.options = QFTools.$("#options");
	//绑定点击事件，使用事件委派
	this.options.onclick = function(e){
		e = e || event;
		var target = e.target || e.srcElement;
		if(target.nodeName === "LI"){
			//获取难度
			_this.diff = target.value;
			//options要移出
			_this.bodyMain.removeChild(_this.options);
			//进入开场动画
			_this.startAnimation();
		}
		
	}
}

Engine.prototype.startAnimation = function(){
	
	//背景图动起来
	var top = 0;
	setInterval(function(){
		top -= 10;
		this.bodyMain.style.backgroundPositionY = top+"px";
	}.bind(this),30);
	//创建logo
	var logo = QFTools.createDiv("logo");
	//小飞机放屁
	var loading = QFTools.createDiv("loading");
	var n = 0;
	var timer = setInterval(function(){
		n++;
		loading.style.background = "url(images/loading"+ (n%3+1) +".png)";
		if(n>4){
			//开场动画结束
			clearInterval(timer);
			//移出loading和logo
			document.body.removeChild(loading);
			document.body.removeChild(logo);
			this.startGame();
		}
	}.bind(this),500);

}

Engine.prototype.startGame = function(){
	//创建敌机和战机
	myPlane.init(this.bodyMain).fire(this.diff);//链式操作
	//创建敌机
	//40% 小敌机
	//20% 中敌机
	//5%  大敌机
	//35% 不出现敌机
	setInterval(()=>{
		var rand = Math.random().toFixed(2);
		if(rand < 0.4) new Enemy(1, this.bodyMain);
		else if(rand < 0.6) new Enemy(2, this.bodyMain);
		else if(rand < 0.65) new Enemy(3, this.bodyMain);
	},500);
	
}

module.exports = Engine;