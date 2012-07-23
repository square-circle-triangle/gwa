/****************************************************************
* Video controller
****************************************************************/
app.videoController = (function(){
	var _this = {};
	var _$videoWrap;
	
	function init(){
		storeReferences();
		loadVideos();
		bindEvents();
	}

	function storeReferences(){
		_$videoWrap = $("#video_wrap");
	}
	
	function loadVideos(){

		log("Loading video players");

	}
	
	function bindEvents(){

		$(".btn_play").click(function(event){
			openVideo(event);
			return false;
		});
		
		app.popupController.subscribe("popupClosed", function(msg){
			stopVideo();
		});
	}

	function openVideo(event){
		log("@openVideo");
		app.popupController.openPopup('video_wrap');

		var target = event.currentTarget;
		//var code = $(target).attr("href").split("/").last();
		var code = $(target).closest('.video').data("code");

		//_this.publish("videoPopupOpened", [code]);
		app.trackingController.track("videos/"+code);

		showVideoData(code);

		setTimeout(
			function(){
				showVideo(code);
			},
		1000);

	}

	function showVideoData(code){
		log("@showVideoData");
		log("code " + code);

		var videoTitle = $("[data-code="+code+"] h2").html();
		
		// switch(code){
		// 	case "s1":
		// 		videoTitle="What is the set out distance?";
		// 		break;
		// 	case "s2":
		// 		videoTitle="S Video 2";
		// 		break;
		// 	case "p1":
		// 		videoTitle="What is the set out distance?";
		// 		break;
		// 	case "p2":
		// 	videoTitle="P Video 1";
		// 		break;	
		// 	default:
		// 		videoTitle="Title not found"
		// }

		$("h1",_$videoWrap).html(videoTitle);
	}
	
	function showVideo(code){
		log("@showVideo");
		log("code " + code);

		var flashvars = {
			source: "../videos/"+code+".flv",
			width: 744,
			height: 416,
			//controlsOnTop:true,
			hideControls:false,
			autoLoad:true,
			autoPlay:true,
			preview: "images/footer.png"
		};
		var params = false;//{'allowscriptaccess':'always'};
		var attributes = false;//{id:"video_player"};

		$(".video_player_wrapper", _$videoWrap).append("<div id='video_player_placeholder'></div>");
		swfobject.embedSWF("swf/videoplayer.swf", "video_player_placeholder", "744", "416", "9.0.0","expressInstall.swf", flashvars, params, attributes);
				
		//ask the video to play
		//var swf = _$currentVideo.get(0);
		//if(swf.playVideo) swf.playVideo();

	}
	
	function stopVideo(){
		log("@stopVideo");
		$("#video_wrap .video_player_wrapper").children().remove();
	}
	
	_this.init = init;
	_this.showVideo = showVideo;
	
	return _this;
	
})();