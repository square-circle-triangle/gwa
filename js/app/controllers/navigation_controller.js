/****************************************************************
* Navigation controller

* Publishes the following events
- onGotoScreen
- onSessionTimeout
****************************************************************/
app.navigationController = (function(){
	var _this = {};
	var _refs = {},//references to DOM objects
		_previousScreen = "",
		_currentScreen = "",
		//_stylesScroll,
		_productsScroll,
		_isGoingBack = false,
		_wentBack = false,
		_$backBtn,
		_$homeBtn;
	var _sessionTimeout;

	var SESSION_TIMEOUT_ACTIVE=false;
	var SESSION_TIMEOUT = 3*60*1000;//3 minutes
	var SCREEN_ANIMATION_SPEED = 500;

	function init(){
		storeReferences();
		bindEvents();
		startRouter();
		startSessionTimeout();
	}

	function storeReferences(){
		_refs.$nav = $("#nav_wrap");
		_refs.$intro = $("#intro_wrap");
		_refs.$home = $("#home_wrap");
		_refs.$traps = $("#traps_wrap");
		_refs.$trap = $("#trap_wrap");
		_refs.$styles = $("#styles_wrap");
		_refs.$products = $("#products_wrap");
		_$backBtn = $("#back_btn");
		_$homeBtn = $("#home_btn");
	}

	function bindEvents(){
		_$backBtn.click(function(){
			goBack();
			return false;
		});
		
		$('body').bind("click",function(){
			resetSessionTimeout();
		});

		// app.popupController.subscribe("popupClosed", function(msg){

 	// 	});

	}

	function navigateTo(name){
		//changes the url
		//this triggers the router to call gotoScreen
		_this.router.navigate(name, true);
	}

	function hideAllScreens(){
		_refs.$intro.hide();
		_refs.$home.hide();
		_refs.$traps.hide();
		_refs.$trap.hide();
		_refs.$styles.hide();
		_refs.$products.hide();
	}
	
	function startRouter(){
		//start the routing listener
		Backbone.history.start();
	}

	function storeDirection(){
		log("@storeDirection");
		//this has to be called before any other interaction
		_wentBack = _isGoingBack;
		_isGoingBack = false;
	}
	
	function gotoScreen(name){
		log("@gotoScreen " + name);
		log("_wentBack =" + _wentBack);
		
		//todo, if _previousScreen === _currentScreen do nothing
		_previousScreen = _currentScreen;
		_currentScreen = name;
		var _$previousScreen = _refs["$"+_previousScreen];
		var _$currentScreen = _refs["$"+_currentScreen];
		
		if(name==='intro'){
			//app.introController.startAutoIntroGallery();
			_refs.$nav.hide();
		}else{
			//app.introController.stopAutoIntroGallery();
			_refs.$nav.show();
		}
		if(name==='home'){
			_refs.$nav.hide();
			$("#nav_wrap").addClass("home");
		}else{
			_refs.$nav.show();
			$("#nav_wrap").removeClass("home");
		}
		if(name==='trap'){
			if(!wentBack()){
				app.keypadController.resetForm();
				rebuildTrapScreen();
			}
		}
		if(name==='products'){
			if(!_wentBack) app.productsController.resetScroll();
		}
		if(name==='styles'){
			if(!_wentBack) app.stylesController.resetScroll();
		}
		
		if(_$previousScreen===undefined){
			hideAllScreens();
			_$currentScreen.show();		
		}else{
			
			setTimeout(
				function(){
					_$currentScreen.show();
					transitionScreens(_$previousScreen,_$currentScreen,!_wentBack);
				},
				200
			);
		}

		_this.publish("onGotoScreen",[name]);
	}
	
	function transitionScreens(_$previousScreen,_$currentScreen,forward){
		if(_$previousScreen===_$currentScreen) return;//no animation is we are not moving screens
		if(forward){
			_$currentScreen.css("left",900);
			_$previousScreen.animate({left:-900},SCREEN_ANIMATION_SPEED);
			_$currentScreen.animate({left:0},SCREEN_ANIMATION_SPEED);
		}else{
			_$currentScreen.css("left",-900);
			_$previousScreen.animate({left:900},SCREEN_ANIMATION_SPEED);
			_$currentScreen.animate({left:0},SCREEN_ANIMATION_SPEED);
		}
	}
	
	function goBack(){
		_isGoingBack = true;
		_wentBack = true;
		if(_currentScreen==='home'){
			navigateTo('intro');
		}else{
			history.go(-1);
		}
	}
	
	function wentBack(){
		return _wentBack;
	}

	// function overrideWentBack(val){
	// 	_wentBack = val;
	// }
	
	function rebuildTrapScreen(){

		$(".strap,.ptrap", _refs.$trap).hide();
		var trap = app.models.searchCriteria.trap;
		$("."+trap+"trap", _refs.$trap).show();	

	}

	function startSessionTimeout(){
		if(!SESSION_TIMEOUT_ACTIVE) return;

		_sessionTimeout = setTimeout(
			onSessionTimeout,
			SESSION_TIMEOUT
		);
	}

	function resetSessionTimeout(){
		log("@resetTimeout");
		clearTimeout(_sessionTimeout);
		startSessionTimeout();
	}

	function onSessionTimeout(){
		log("@onSessionTimeout");
		resetSession();
	}

	function resetSession(){
		log("@resetSession");
		navigateTo("home");
		_this.publish("resetSession");
	}

	Publisher.extend(_this);
	
	//public functions
	_this.init = init;
	_this.router = new AppRouter();
	_this.refs = _refs;
	_this.navigateTo = navigateTo;
	_this.gotoScreen = gotoScreen;
	_this.goBack = goBack;
	_this.storeDirection = storeDirection;
	_this.wentBack = wentBack;
	_this.resetSession = resetSession;
	//_this.overrideWentBack = overrideWentBack;
	
	return _this;
})();