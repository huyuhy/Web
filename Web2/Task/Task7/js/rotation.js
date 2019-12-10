//温馨提示
var tips=document.getElementsByClassName("tips")[0];
var initialRight=getStyle(tips,"right");
animate_uniform(tips,{right: 970});
setInterval(function(){
	tips.style.right=initialRight;
	animate_uniform(tips,{right: 970});//从-310匀速移动至970
}, 16000);

//轮播图

var box=document.getElementsByClassName("box")[0];
var slider=document.getElementsByClassName("slider")[0];
var number=document.getElementsByClassName("number");
var nowLeft=parseInt(getStyle(slider,"left"));
var index=1;
var isMoving=false;
numberChecked(index-1);

//定时切换
var timer=setInterval(next, 3000);

//鼠标悬停
box.onmouseover=function(){
	clearInterval(timer);
}
//鼠标移出
box.onmouseout=function(){
	timer=setInterval(next, 3000)
}

//左右按钮
var left=document.getElementById("left");
left.setAttribute("onclick", "previous()");
var right=document.getElementById("right");
right.setAttribute("onclick", "next()");

//下方按钮
number[0].setAttribute("onclick","locate(0)");
number[1].setAttribute("onclick","locate(1)");
number[2].setAttribute("onclick","locate(2)");
number[3].setAttribute("onclick","locate(3)");
number[4].setAttribute("onclick","locate(4)");


//函数封装

//匀速移动
function animate_uniform(obj,json){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var cur = now + 1;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
		}
	}, 12)
}

//切换至下一张
function next(){
	if(!isMoving){
		isMoving=true;
		numberUnChecked(index-1);
		numberChecked(index%5);
		index++;
		animate(slider, {left:(-1200)*index}, function(){
			if(index==6){
				slider.style.left="-1200px";
				index=1;
			}
			isMoving=false;
		});
	}
	
}
//单击左侧按钮切换至上一张
function previous(){
	if(!isMoving){
		isMoving=true;
		numberUnChecked((index+4)%5);
		numberChecked((index+3)%5);
		index--;
		animate(slider, {left:-1200*index}, function(){
			if(index==0){
				slider.style.left="-6000px";
				index=5;
			}
			isMoving=false;
		});
	}
}
//下方按钮颜色切换
function numberChecked(num){
	number[num].style.color="#fff";
	number[num].style.backgroundColor="#f00";
}
function numberUnChecked(num){
	number[num].style.color="#000";
	number[num].style.backgroundColor="#ddd";
}

//点击下方按钮进行图片切换
function locate(i){
	if(i!=index-1){
		if(!isMoving){a
			isMoving=true;
			numberUnChecked(index-1);
			numberChecked(i);
			index=i+1;
			animate(slider,{left:-1200*index}, function(){
				isMoving=false;
			})
		}
	}
}