const myPlane = require("./myplane");
const QFTools = require("./tools");

function Bullet(){
}

Bullet.prototype = {
	//改变整个原型指向的时候，要把constructor指回构造函数本身
	constructor: Bullet,
	init: function(plane){
		this.plane = plane;
		//创建子弹元素
		this.ele = QFTools.createDiv("bullet");
		//给子弹初始坐标
		this.ele.style.top = this.plane.ele.offsetTop - this.ele.offsetHeight + "px";
		this.ele.style.left = this.plane.ele.offsetLeft + this.plane.ele.offsetWidth/2 - this.ele.offsetWidth/2 + "px";
		this.move();
		return this;
	},
	move: function(){
		this.timer = setInterval(()=>{
			this.ele.style.top = this.ele.offsetTop - 8 + "px";
			//判断是否超出边界
			if(this.ele.offsetTop < -40) this.die();
		},30);
	},
	die: function(){
		//document.body.removeChild(this.ele);
		clearInterval(this.timer);
		//执行爆炸动画
		this.ele.className = "bullet_die";
		setTimeout(()=>{
			this.ele.className= "bullet_die2";
			setTimeout(()=>{
				//爆炸动画结束之后100毫秒再从DOM中移出元素
				document.body.removeChild(this.ele);	
			},100)
		},100);
		//从aBullets数组里把当前子弹移出
		//注意！这一段放在定时器外面同步执行
		for(var i = 0; i < this.plane.aBulltes.length; i++){
			//this就是当前子弹对象
			//查找this处于数组里面的第几个
			if(this === this.plane.aBulltes[i]){
				this.plane.aBulltes.splice(i,1);
			}
		}
	}

}

module.exports = Bullet;