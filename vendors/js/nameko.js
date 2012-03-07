jQuery.noConflict();
var isiPhone = !!navigator.userAgent.match(/[iPhone|iPad|iPod].*Mobile/);


/*
* --------------------------------------------------
* Const
* --------------------------------------------------
*/
var MESSAGE = "<div id='message'>無限もりよし</div><br><div id='namekoNum'>0本</div>";

var ROW = 10;
var COL = 10;

var OBJ_DISTANCE = 30;
var SIZE_X = 3 * 12;
var SIZE_Y = 4 * 12;

var GOLDEN_PROBABILITY = 200;	// 1/200

var namekoSrc = "../img/nameko.png"
var goldenSrc = "../img/golden.png"

/*
* --------------------------------------------------
* Global
* --------------------------------------------------
*/
var shiftX;
var shiftY

var arObj;
var namekoNum = 0;

/*
* --------------------------------------------------
* Object
* --------------------------------------------------
*/
function _Object(_id, _x, _y) {
	this.id = _id;
	this.x = _x;
	this.y = _y;
	this.isAnimation = false;
	this.onMouse = false;
}

/*
* --------------------------------------------------
* Event
* --------------------------------------------------
*/





function onLoad() {
	if (isiPhone) {
		document.addEventListener("touchmove", onMouseMove, false);
		document.addEventListener("touchstart", onMouseDown, false);
		//window.parent.document.addEventListener("orientationchange", onResize, false);
	} else {
		document.onmousemove = onMouseMove;
		document.onmousedown = onMouseDown;
		//document.onmouseout = onMouseOut;
		window.parent.onresize = onResize;
	}
	jQuery("#footer").hide();
	jQuery("#footer").css({"color": "#777"});
	jQuery("#footer a").css({"color": "#777"});
	setTimeout(function(){
		jQuery("#footer").fadeTo(1000, 1.0);
	}, 5000);
	jQuery("<div />").
		attr("id", "txt").
		css({"fontSize":10, "textAlign":"center"}).
    	appendTo("#nameko_main");
    jQuery("#txt").html(MESSAGE);
    jQuery("#namekoNum").html(namekoNum + "本");
	createObj();

}

function onMouseMove(e) {
	onMouseDown(e);
}

function onMouseDown(e) {
	var mouseX = getMouseX(e);
	var mouseY = getMouseY(e);
	var objWidth = shiftX + COL*OBJ_DISTANCE;
	var objHeight = shiftY + ROW*OBJ_DISTANCE;
	if (mouseX>shiftX && mouseX<objWidth && mouseY>shiftY && mouseY<objHeight) {
		var x = Math.floor((mouseX - shiftX) / OBJ_DISTANCE);
		var y = Math.floor((mouseY - shiftY) / OBJ_DISTANCE);
		var obj = arObj[x][y];
		if (!obj.isAnimation) {
			obj.isAnimation = true;
			var id = "#" + obj.id;
			jQuery(id).animate({height:"+=20", top:"-=20"}, "fast");
			jQuery(id).animate({height:"-=25", top:"+=5"}, "fast");
			jQuery(id).animate({height:"+=5"}, "fast");
			jQuery(id).animate({ width:"hide", height:"hide", top:0, left:0 }, "normal");
			jQuery(id).animate({top:obj.y+SIZE_Y/2, left:obj.x+SIZE_X/2}, "fast",
				function(){
					var n = Math.floor( Math.random() * GOLDEN_PROBABILITY );
					jQuery(id).attr("src", n == 1 ? goldenSrc : namekoSrc);
				}
			);
			jQuery(id).animate({ width:"show", height:"show",top:obj.y, left:obj.x}, "normal",
				function(){
					obj.isAnimation = false;
					jQuery("#namekoNum").html(++namekoNum + "本");
				}
			);
		}
	}
}


function onResize() {
	jQuery("#nameko_main").empty();
	onLoad();
}
/*
* --------------------------------------------------
* Function
* --------------------------------------------------
*/
function createObj() {
	shiftX = Math.round((document.body.clientWidth - COL*OBJ_DISTANCE)/2);
	shiftY = SIZE_Y*1.2 + 100;
	arObj = new Array();
	for (var i=0; i<COL; i++) {
		arObj[i] = new Array();
		for (var j=0; j<ROW; j++) {
			var obj_id = "obj_" + i + "_" + j;
			var posX = i*OBJ_DISTANCE + shiftX;
			var posY = j*OBJ_DISTANCE + shiftY;
			createImg(obj_id, posX, posY);
			arObj[i][j] = new _Object(obj_id, posX, posY);
		}
	}
}

function createImg(_id, _x, _y) {
	jQuery("<img />").
		attr("id", _id).
		attr("src", namekoSrc).
		css({"position":"absolute", "top":_y, "left":_x, "width":SIZE_X, "height":SIZE_Y}).
    	appendTo("#nameko_main");
}


/*
* --------------------------------------------------
* CommonFunction
* --------------------------------------------------
*/
function getMouseX(e) {
	if (isiPhone) {
		e.preventDefault();
		return e.touches[0].pageX;
	} else {
		return (document.all) ? event.clientX : e.pageX;
	}
}

function getMouseY(e) {
	if (isiPhone) {
		e.preventDefault();
		return e.touches[0].pageY;
	} else {
		return (document.all) ? event.clientY : e.pageY;
	}
}
