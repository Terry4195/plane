const myPlane = require("./myplane"),
	  Bullet = require("./bullet"),
	  QFTools = require("./tools");

class Enemy{
	constructor(type,bodyMain){
		this.type = type;
		this.bodyMain = bodyMain;
		this.init();
	}
	init(){
		//type = 1 小敌机  speed = 5  blood = 1
		//type = 2 中敌机  speed = 3  blood = 7
		//type = 3 大敌机  speed = 1  blood = 15
		switch(this.type){
			case 1:
				this.ele = QFTools.createDiv("enemy-small");
				this.speed = 5;
				this.blood = 1;
			break;
			case 2:
				this.ele = QFTools.createDiv("enemy-middle");
				this.speed = 3;
				this.blood = 7;
			break;
			case 3:
				this.ele = QFTools.createDiv("enemy-large");
				this.speed = 1;
				this.blood = 15;
			break;
		}
		//计算敌机的初始left值，在游戏区范围内随机生成
		var min = this.bodyMain.offsetLeft;
		var max = this.bodyMain.offsetLeft + this.bodyMain.offsetWidth - this.ele.offsetWidth;
		var _left = parseInt(Math.random()*(max-min))+min;
		//top值为刚好隐藏自己的位置 -height
		var _top = -this.ele.offsetHeight;
		this.ele.style.top = _top + "px";
		this.ele.style.left = _left + "px";
		this.move();
	}
	move(){
		this.timer = setInterval(()=>{
			//每个敌机根据自己的速度移动
			this.ele.style.top = this.ele.offsetTop + this.speed + "px";
			//判断移动边界
			if(this.ele.offsetTop > this.bodyMain.offsetHeight) this.die();
			//判断敌机跟我方战机的碰撞
			//myPlane.ele  this.ele
			var mLeft = myPlane.ele.offsetLeft,
				mRight = mLeft + myPlane.ele.offsetWidth,
				mTop = myPlane.ele.offsetTop,
				mBottom = mTop + myPlane.ele.offsetHeight,
				eLeft = this.ele.offsetLeft,
				eRight = eLeft + this.ele.offsetWidth,
				eTop = this.ele.offsetTop,
				eBottom = eTop + this.ele.offsetHeight;

			if(!(eBottom < mTop || mRight < eLeft || mBottom < eTop || eRight < mLeft)){
				//得到所有没有碰撞的结果去反
				//敌机跟战机碰撞上了
				if(confirm("你死了，重新开始吗？")){
					window.location.reload(true);
				}
			}
			//检测敌机跟所有子弹的碰撞
			for(var i = 0; i < myPlane.aBulltes.length; i++){
				var bLeft = myPlane.aBulltes[i].ele.offsetLeft,
					bRight = bLeft + myPlane.aBulltes[i].ele.offsetWidth,
					bTop = myPlane.aBulltes[i].ele.offsetTop,
					bBottom = bTop + myPlane.aBulltes[i].ele.offsetHeight;
				if(!(eBottom < bTop || bRight < eLeft || bBottom < eTop || eRight < bLeft)){
					console.log(this);
					//敌机跟子弹发生碰撞了
					//console.log(myPlane.aBulltes[i]);
					myPlane.aBulltes[i].die();
					//如果血量减到0，那么敌机die
					if(--this.blood === 0){
						this.die();
					}

				}
			}


		},30);
	}
	die(){
		document.body.removeChild(this.ele);
		clearInterval(this.timer);
	}
}

module.exports = Enemy;