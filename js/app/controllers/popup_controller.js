/****************************************************************
* Popups Controller
****************************************************************/

app.popupController = (function(){
	
	var _this = {};
	var _$currentPopUp=null;
	var _$currentAlert=null;

	function init(){
		bindEvents();
		//hideScrollPrompt();
	}
	
	function bindEvents(){

		$("#inspiration_btn").click(function(event){
			showMeasuresWarning();
			return false;
		});

		$("#measures_warning_popup .buttons").delegate("a","click",function(){
			closeCurrentPopup(false);
		});
	
		
		$(".header .btn_close").click(function(event){
			closeCurrentPopup();
			return false;
		});
		
		$(".btn_close_alert").click(function(event){
			closeCurrentAlert(event);
			return false;
		});

		app.navigationController.subscribe("resetSession",function(){
			closeAllPopups();
		});

	}

	function showMeasuresWarning(){
		openPopup('measures_warning_popup');
	}
	
	function openPopup(name){
		_$currentPopUp = $("#"+name);
		_$currentPopUp.fadeIn(500);
	}
	
	function closeCurrentPopup(withTransition){
		if(_$currentPopUp===null) return;

		if(withTransition===undefined) withTransition = true;

		if(withTransition){
			_$currentPopUp.fadeOut(500);
		}else{
			_$currentPopUp.hide();
		}

		_$currentPopUp.trigger("afterClosed");

		_$currentPopUp=null;

		_this.publish("popupClosed", [""]);
	}
	
	function openAlert(name){
		log("@openAlert");
		_$currentAlert = $("#"+name);
		_$currentAlert.show();
	}
	
	function closeCurrentAlert(event){
		log("@closeCurrentAlert");

		if(_$currentAlert===null) return;

		_$currentAlert.hide();
		_$currentAlert = null;
		
		app.navigationController.goBack();
	}

/*
	function showScrollPrompt(){
		log("@showScrollPrompt");
		$("#scroll_prompt").show();
	}

	function hideScrollPrompt(){
		log("@hideScrollPrompt");
		$("#scroll_prompt").hide();
	}
*/

/*
	function checkScrollPrompt($wrap){
		var top = $wrap.scrollTop();
		var h = $wrap.get(0).scrollHeight;
		var viewHeight = 1176;

		//log(h-top);

		if( (h-top) > viewHeight+100){
//			showScrollPrompt();
		}else{
		//	hideScrollPrompt();
		}
	}
*/
	function closeAllPopups(){
		closeCurrentPopup();
		closeCurrentAlert();
	}
	
	//add event pub sub
	//_.extend(_this, Backbone.Events);
	Publisher.extend(_this);
	
	//public functions
	_this.init = init;
	_this.openPopup = openPopup;
	_this.openAlert = openAlert;
	_this.closeCurrentPopup = closeCurrentPopup;
	// _this.checkScrollPrompt = checkScrollPrompt;
	// _this.showScrollPrompt = showScrollPrompt;
	// _this.hideScrollPrompt = hideScrollPrompt;
	
	return _this;
})();