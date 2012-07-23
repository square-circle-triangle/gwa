/****************************************************************
* Intro Controller
****************************************************************/

app.introController = (function(){
	
	var _this = {};
	var _introGallery;

	function init(){
		bindEvents();
	}

	function bindEvents(){
		log("introController@bindEvents");

		setTimeout(function () {
			bindIntroGallery();
		}, 300);

		$("#touch_btn").click(function(){
			return false;
		});
	}

	function bindIntroGallery(){
		_introGallery = Carousel($("#intro_gallery"),{
			speed:800, 
			autoSpeed:7000,
			debug:false,
			auto:true,
			logger:app.logger
		});
	}

	function startAutoIntroGallery(){
		log("@startAutoIntroGallery");
		//log("_productGallery = " + _productGallery);
		if(_introGallery) _introGallery.startAuto();
	}

	function stopAutoIntroGallery(){
		log("@stopAutoIntroGallery");
		//log("_productGallery = " + _productGallery);
		if(_introGallery) _introGallery.stopAuto();
	}

	Publisher.extend(_this);
	
	//public functions
	_this.startAutoIntroGallery=startAutoIntroGallery;
	_this.stopAutoIntroGallery=stopAutoIntroGallery;
	_this.init = init;
	
	return _this;
})();