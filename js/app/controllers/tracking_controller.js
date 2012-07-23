/****************************************************************
* Tracking Controller
****************************************************************/

app.trackingController = (function(){
	
	var _this = {};
	var tracker;

	function init(){
		bindEvents();
		setUpTracker();
	}

	function bindEvents(){
		if(app.navigationController){
			app.navigationController.subscribe("resetSession",function(){
				resetSession();
			});
			app.navigationController.subscribe("onGotoScreen",function(name){
				if(name==="intro") resetSession();
			});
		}

		$('#footer_wrap a').click(function(){
			var brand = $(this).data('brand');
			track('logo/'+brand);
			return false;
		});
	}

	function setUpTracker(){
		log("@setUpTracker");
		try {
			tracker = Piwik.getTracker(pkBaseURL + "piwik.php", 1);
			tracker.discardHashTag(false);
			//tracker.trackPageView();
			//tracker.enableLinkTracking();
		} catch( err ) {}
	}

	function track(string){
		if(tracker){
			tracker.setCustomUrl(string);
			tracker.trackPageView();
		}
	}

	function resetSession(){
		log("@resetSession");
		if(tracker){
			// tracker.setSessionCookieTimeout(1);
			//tracker.trackPageView();
			// setTimeout(
			// 	function(){
			// 		tracker.setSessionCookieTimeout(3*60);
			// 	},
			// 	2000
			// );
		}
	}

	Publisher.extend(_this);
	
	//public functions
	_this.track = track;
	_this.init = init;
	
	return _this;
})();