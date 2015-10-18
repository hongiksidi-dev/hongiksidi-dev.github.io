/*
*
*	Title: hongiksidi.js (unminified, with comments)
*	Author: Jay ho Lee (http://jayhello.com)
*	Description: Custom script for each Hongik university grad show archive
*	Version: 0.9 (As of 2012-11-24)
*	
*/

/*
function report(){ 
	document.getElementsByClassName('screenwidth-value')[0].innerHTML = 
		'screen.width:'+screen.width+
		'<br>screen.height:'+screen.height+
		'<br>window.innerWidth:'+window.innerWidth+
		'<br>window.innerHeight:'+window.innerHeight+
		'<br>window.outerWidth:'+window.outerWidth+
		'<br>window.outerHeight:'+window.outerHeight+
		'<br>document.documentElement.<br> clientWidth:'+document.documentElement.clientWidth+
		'<br>document.documentElement.<br> clientHeight:'+document.documentElement.clientHeight+
		'<br>window.devicePixelRatio:'+window.devicePixelRatio; 
}
window.addEventListener('load', report, false);
window.addEventListener('resize', report, false);
window.addEventListener('orientationchange', report, false);
window.addEventListener('deviceorientation', report, false);
window.addEventListener('MozOrientation', report, false);

$(".screenwidth-value").bind("click",function(){
	
	$(this).hide();

});
*/



//드랍박스에서 설정 - Lazyload때문에 src와 file 어트리뷰트 모두 수정해야 함

var rerouteBaseUrl = [];
 rerouteBaseUrl[0] = "http://dl.dropbox.com/u/10974866/";
 rerouteBaseUrl[1] = "http://dl.dropbox.com/u/26199336/";

$('.grid-item img').attr('file',function(i,e){
 return e.replace("http://hongiksidi.com/2012/wp-content/uploads/",rerouteBaseUrl[0]);
 });
$('.grid-item img').attr('src',function(i,e){
 return e.replace("http://hongiksidi.com/2012/wp-content/uploads/",rerouteBaseUrl[0]);
 });


$('.post-body img').attr('file',function(i,e){

return e.replace("http://hongiksidi.com/2012/wp-content/uploads/",rerouteBaseUrl[1]);
 });
$('.post-body img').attr('src',function(i,e){
 return e.replace("http://hongiksidi.com/2012/wp-content/uploads/",rerouteBaseUrl[1]);
 });
//$('.post-body img').error(function(){$(this).parent().hide()});
$('.post-body img').error(function(){
	$(this).attr('src', function(i,e){
		return e.replace(rerouteBaseUrl[1], "http://hongiksidi.com/2012/wp-content/uploads/");
	});
});


/*SVG 지원 여부에 따라 로고를 SVG 또는 jpg로 표시 분기*/

$(function(){
	if(document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")){
		$(".bitmap-logo").css("display","none");
		$(".vector-logo").css("display","block");
	}
	$("#grid-wrapper").append("<div class='clear'>.</div>");
});


/*.searchwidget을 form에 추가*/
$(".searchwidget-wrapper #searchform").addClass("searchwidget");

/*모바일용 상단바 버튼들의 이벤트 바인딩*/
$(".buttons .searchtoggle").bind('click',
	function(){ //search는 webkit transition 애니메이션때문에 $.show()와 $.hide()으로 스위치하는 방식이 곤란
		if(($(".searchwidget").css("top")).replace(/px/g, "")<50) //toggle되어있지 않은 경우: 켠다
		{
			$("#mobile-control .searchwidget").css("top","50px");
			$(".searchwidget-wrapper").addClass("slidDown");
			if(isListCreated){
				$("#listofworks").show();
			}
		}
		else{	//toggle되어있는 경우: 끈다
			$("#listofworks").hide();
			$("#mobile-control .searchwidget").css("top","-100px");
			$(".searchwidget-wrapper").removeClass("slidDown");
		}
		selectButton(".buttons .searchtoggle");
		$(".conditionalmobilediv").hide();
	}
)
$(".buttons .category").bind('click',	
	function(){
		$("#listofworks").hide();

		checkSearchToggle();
		selectButton(".buttons .category");
		detectAndToggle("#mobile-control .categoryPop");
		
	}
)
$(".buttons .information").bind('click',
	function(){
		$("#listofworks").hide();
	
		checkSearchToggle();
		selectButton(".buttons .information");
		detectAndToggle("#mobile-control .informationPop");
	}
)

$(".searchwidget-wrapper .closeall").bind('click',
	function(){
		$("#listofworks").hide();
		$("#mobile-control .searchwidget").css("top","-100px");
		$(".searchwidget-wrapper").removeClass("slidDown");
	}
);

$(".cat-title .closeall").bind('click',
	function(){
		$(".categoryPop").hide();
		$("body").removeClass("unregisterscroll");
	}
);
$(".informationPop .closeall").bind('click',
	function(){

		$(".conditionalmobilediv").hide();
		$("body").removeClass("unregisterscroll");
	}
);

var checkSearchToggle = function(){
	if(($(".searchwidget").css("top")).replace(/px/g, "")>25)
		{
			$("#mobile-control .searchwidget").css("top","-100px");
			$(".searchwidget-wrapper").removeClass("slidDown");
		}
}
var selectButton = function(e){

	$(".selectedbutton").removeClass("selectedbutton");
	$(e).addClass("selectedbutton");

}
/*코드 절약용인데 공통적인 부분들이 줄어서 별로 필요없어짐*/
var detectAndToggle = function(element){

	if($(".conditionalmobilediv:visible").length)
	{
		$(".conditionalmobilediv").hide();
		$(".buttons .closeall").hide();
		//console.log(element+" is visible!");
		if(($(".searchwidget").css("top")).replace(/px/g, "")>140)
		{
			$("#mobile-control .searchwidget").css("top","-150px");
		}
	}
	
	else{		
		if(($(".searchwidget").css("top")).replace(/px/g, "")>140)
		{
			$("#mobile-control .searchwidget").css("top","-150px");
		}
		$(element).show();
	}


}


$("input:text")
	.wrap("<div class='inputwrapper'>")
	.after("<div class='clear'></div>")
	.after("<span class='clearfield' title='clear form'>X</span>");
$("input:submit").after("<div class='clear'></div>");

/*List of works toggle*/

var isListCreated = false;
var listWorks = document.getElementById("listofworks");
$("#togglelist").click(function(){
	$("#togglelist").addClass("toggled");	
	$("#listofworks").show();

	if(!isListCreated){
		
		var boxItemArray = []; // init var
		
		if($.browser.msie){
		
		}
			
			for(var i=0;i<$("div.grid-item").length;i++){
				boxItemArray[i] = []
				boxItemArray[i][0] = $(".post-title a")[i].textContent; //author
				boxItemArray[i][1] = $(".post-meta-tag a")[i].textContent; //worktitle
				boxItemArray[i][2] = $(".post-meta-category a")[i].textContent; //category
				boxItemArray[i][3] = $(".post-meta-tag a")[i].href; //worktitle-link (===author-link)
				boxItemArray[i][4] = $(".post-meta-category a")[i].href; //category-link
			}

		for(var j=0;j<boxItemArray.length;j++){

			var infoNode_author = document.createElement("a");
			var infoNode_title = document.createElement("a");
			var infoNode_cat = document.createElement("a");
			var wrapper = document.createElement("div");
			var leftcol = document.createElement("div");
			var clear = document.createElement("div");
			clear.setAttribute("class", "clear");
			infoNode_author.setAttribute("href", boxItemArray[j][3]);
			infoNode_title.setAttribute("href", boxItemArray[j][3]);
			infoNode_cat.setAttribute("href", boxItemArray[j][4]);
			infoNode_author.setAttribute("class", "info-author");
			infoNode_title.setAttribute("class", "info-title");
			infoNode_cat.setAttribute("class", "info-cat");
			wrapper.setAttribute("class", "info-wrapper");
			leftcol.setAttribute("class", "info-leftcol");
			infoNode_author.textContent = boxItemArray[j][0];
			infoNode_title.textContent = boxItemArray[j][1];
			infoNode_cat.textContent = boxItemArray[j][2];
			
			leftcol.appendChild(infoNode_author);
			leftcol.appendChild(infoNode_title);
			wrapper.appendChild(leftcol);
			wrapper.appendChild(infoNode_cat);
			wrapper.appendChild(clear);
			listWorks.appendChild(wrapper);

			if(j===(boxItemArray.length-1)){
			$(".info-wrapper:last").append("<div class='clear'></div>")
			wrapper.appendChild(clear);
			isListCreated = true;
			

			}

			var infoNode_author = {};
			var infoNode_title = {};
			var infoNode_cat = {};
			var wrapper = {};

		}
	}
	else{

		return false;
	}
})


/*Style fix*/
$("#single-wrapper .post-body a").attr("target","_blank");
$("div.grid-item:last").css("border-bottom","0");
$("#single-wrapper img[title='thumb'], #single-wrapper img[alt='thumb']").parent().hide();//131216 fix
$("#gallery-1 .gallery-icon a").prependTo(".post-body");
if($("#single-wrapper:visible").length){
	
	$(".grid-item").remove();
	$(".breadcrumb").appendTo("#grid-wrapper");
}
$("#single-wrapper p style").filter(".override").parent().remove();
$(".grid-item").removeAttr("title");
$(".post-body a").removeAttr("title");
$(".post-body img").removeAttr("title");
/*	fixed TOP 스크롤*/
/*	http://stackoverflow.com/questions/743123/fixed-positioning-in-mobile-safari
*/
var topScroller = document.getElementById('topScroller');
/*
if(!isNaN(document.body.style.webkitTransform)){
	
	window.onscroll = function() {
	topScroller.style.webkitTransform = "translate3d(0, " + window.pageYOffset + "px, 0)";
	topScroller.style.border = "1px solid #000";
	};
	
}
else*/ 





/*! Fixedfixed: a CSS position:fixed qualifier. (c)2012 @scottjehl, Filament Group, Inc. Dual license: MIT and/or GPLv2 */(function(a,b){function f(){var e="scrollTop"in a.document.body?a.document.body.scrollTop:a.document.documentElement.scrollTop;if(e!==b&&e>0&&a.document.body){a.document.body.insertBefore(d,a.document.body.firstChild);if(!d.getBoundingClientRect||d.getBoundingClientRect().top!==0)a.document.documentElement.className=a.document.documentElement.className.replace(c,"");a.document.body.removeChild(d),a.removeEventListener?a.removeEventListener("scroll",f,!1):a.detachEvent("onscroll",f)}}var c="fixed-supported",d=a.document.createElement("div"),e=a.navigator.userAgent;d.style.position="fixed",d.style.top=0;if(!(e.match(/Android 2\.[1256]/)&&e.indexOf("AppleWebKit")>-1)||!(e.match(/Opera Mobi\/([0-9]+)/)&&RegExp.$1<7458)||!a.operamini||{}.toString.call(a.operamini)!=="[object OperaMini]"||!(e.match(/Fennec\/([0-9]+)/)&&RegExp.$1<6))a.document.documentElement.className+=" "+c,a.addEventListener?a.addEventListener("scroll",f,!1):a.attachEvent("onscroll",f)})(this);

/* check if image is available

*/
$(document).ready(function(){
	/*$("input[type='text']").bind("focus", function(){
		$(".clearfield").show();
	})*/
	

	$("#mobile-control .searchwidget #s").bind("focus", function(){
		$("#mobile-control .searchwidget .clearfield").show();
	});
	$(".search-top #s").bind("focus", function(){
		$(".search-top .clearfield").show();
	});
	$(".search-bottom #s").bind("focus", function(){
		$(".search-bottom .clearfield").show();
	});
	$(".search-bottom .clearfield").bind("click", function(){
		$(".search-bottom #s").val("").focus();
	});
	$(".search-top .clearfield").bind("click", function(){
		$(".search-top #s").val("").focus();
	});
	$("#mobile-control .searchwidget .clearfield").bind("click", function(){
		$("#mobile-control .searchwidget #s").val("").focus();
		
	});

	$(".directionLink").bind("click", function(){
		$(".directionPop").show();
	});
	$(".directionPop .closeall").bind("click", function(){
		$(".directionPop").hide();
	});

	//topscroll
	if($(".fixed-supported:visible").length){
	}
	else if(!$(".fixed-supported:visible").length){
	window.onscroll = function() {
	  topScroller.style.bottom =
		 5 - (window.pageYOffset/window.innerHeight*100) + '%';
	  topScroller.style.border = "1px solid #000";	
	};
}

});
