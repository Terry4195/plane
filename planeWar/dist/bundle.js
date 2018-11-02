/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = {
	/*
	 	返回dom对象或者dom集合
	 * @params selector string 选择器
	 * @params [parent] DOMObject 父级对象
	 * @return DOMObject || DOMCollection
	 * 
	 * */
	
	$: function(selector,parent){
		parent = parent || document;
		/*if(selector.charAt(0) === "#"){
			return parent.getElementById(selector.splice(1));
		}*/
		
		switch(selector.charAt(0)){
			case "#":
				return parent.getElementById(selector.slice(1));
			case ".":
				return parent.getElementsByClassName(selector.slice(1));
			default:
				return parent.getElementsByTagName(selector);
		}
	},
	/*
	 	获取内部或者外部样式
	 * @params obj DOMObject 获取样式的元素对象
	 * @params attr string  属性名称
	 * @return string 属性值
	 * 
	 * */
	getStyle: function(obj, attr){
		/*if(obj.currentStyle){ // ie
			return obj.currentStyle[attr];
		}
		return getComputedStyle(obj, false)[attr];*/
		
		
		//return obj.currentStyle ? obj.currentStyle[attr] :  getComputedStyle(obj, false)[attr];
		
		try{
			return getComputedStyle(obj, false)[attr];
		}catch(e){
			return obj.currentStyle[attr];
		}
	},
	
	/*
	 	使元素绝对居中
	 * @params obj DOMObject 要居中的元素对象
	 * */
	
	showCenter: function(obj){
		var _this = this; //留住this
		obj.style.display = "block";
		obj.style.position = "absolute";
		//计算left和top
		function calc(){
			console.log(this);
			var left = (_this.getBody().width - obj.offsetWidth)/2;
			var top = (_this.getBody().height - obj.offsetHeight)/2;
			obj.style.left = left + "px";
			obj.style.top = top + "px";
		}
		calc();
		window.onresize = calc;
		
	},
	/*
	 	得到浏览器的宽高
	 * @return object {width,height}
	 * */
	getBody: function(){
		return {
			width: document.documentElement.clientWidth || document.body.clientWidth,
			height: document.documentElement.clientHeight || document.body.clientHeight
		}
		/*window.innerHeight
		window.innerWidth*/
	},
	/*
	 	事件监听
	 * @params obj DOMObject 事件监听对象
	 * @params event string 事件句柄
	 * @params fn  Function 事件处理函数
	 * 
	 * */
	on: function(obj, event, fn){
		if(obj.attachEvent){
			obj.attachEvent("on"+event,fn);
		}else{
			obj.addEventListener(event,fn,false);
		}
	},
	
	/*
	 	移出事件监听
	 * @params obj DOMObject 事件监听对象
	 * @params event string 事件句柄
	 * @params fn  Function 事件处理函数
	 * */
	off: function(obj, event, fn){
		if(obj.detachEvent){
			obj.detachEvent("on"+event, fn);
		}else{
			obj.removeEventListener(event, fn);
		}
	},
	
	/* 获取一个元素到浏览器边缘的距离

	*  @param obj 要获取距离的元素
	* @return {left, top}
	*/
	getPosition: function(obj){
		var position = {
			left: 0,
			top: 0
		}
		//只要存在父级，那么就继续找
		while(obj.offsetParent){
			//进行累加
			position.top += obj.offsetTop;
			position.left += obj.offsetLeft;
			//层级往上增加一个，继续找父级的offsetParent
			obj = obj.offsetParent;
		}

		return position;
	},

	createDiv: function(className){
		var div = document.createElement("div");
		div.className = className;
		document.body.appendChild(div);
		return div;
	}

}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Bullet = __webpack_require__(2);
const QFTools = __webpack_require__(0);

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const myPlane = __webpack_require__(1);
const QFTools = __webpack_require__(0);

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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Engine = __webpack_require__(4);


window.onload = function(){
	new Engine();
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const myPlane = __webpack_require__(1);
const Enemy = __webpack_require__(5);
const QFTools = __webpack_require__(0);

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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const myPlane = __webpack_require__(1),
	  Bullet = __webpack_require__(2),
	  QFTools = __webpack_require__(0);

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

/***/ })
/******/ ]);