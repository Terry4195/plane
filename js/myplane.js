const Bullet = require("./bullet");
const QFTools = require("./tools");

//我方战机
module.exports = {
	aBulltes:[], //存所有子弹对象
	init: function(bodyMain){
		//Engine对象传递过来的bodyMain
		this.bodyMain = bodyMain;
		//创建战机DOM元素
		this.ele  = QFTools.createDiv("my-warplain");
		//左右剧中
		this.ele.style.left = (QFTools.getBody().width - this.ele.offsetWidth)/2 + "px";
		//垂直居底
		this.ele.style.top = QFTools.getBody().height - this.ele.offsetHeight + "px";
		this.move();
		//返回this是为了实现链式调用
		return this;
	},
	move: function(){
		//飞机跟随鼠标移动
		QFTools.on(document.body,"mousemove",function(e){
			e = e || event;
			//飞机的中心点跟随鼠标移动
			this.ele.style.top = e.clientY - this.ele.offsetHeight/2 + "px";
			var _left = e.clientX - this.ele.offsetWidth/2;
			//判断左右边界
			if(_left < this.bodyMain.offsetLeft) 
				_left = this.bodyMain.offsetLeft;
			if(_left > this.bodyMain.offsetLeft + this.bodyMain.offsetWidth - this.ele.offsetWidth) 
				_left = this.bodyMain.offsetLeft + this.bodyMain.offsetWidth - this.ele.offsetWidth;
			this.ele.style.left = _left + "px";
		}.bind(this),false);
	},
	fire: function(diff){
		//创建子弹
		//创建子弹的时间间隔根据难度决定，难度值越小，游戏难度越大，时间间隔个越大
		this.duration = 500/diff;
		setInterval(()=>{
			this.aBulltes.push(new Bullet().init(this));
			//创建实例，调用init，push到aBullets数组里
			/*var bull = new Bullet();
			bull.init(this.ele);
			this.aBulltes.push(bull);*/
		},this.duration);

		
	}
}