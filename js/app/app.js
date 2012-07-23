/****************************************************************
* DOM ready
*****************************************************************/
$(function(){
	app.init();
});
/****************************************************************
* Log
*****************************************************************/
function log(msg){
	//app.logger.debug(msg);
}

function resetSession(){
	if(app && app.dataController) app.navigationController.resetSession();
}
/****************************************************************
* Listeners for flash
****************************************************************/
function videoCompleted(){
	//log("videoCompleted");
	app.popupController.closeCurrentPopup();
}
/****************************************************************
* app object
*****************************************************************/
var app = (function(){

	var _this = {};

	function init(){
		if(app.dataController) app.dataController.init();
		if(app.keypadController) app.keypadController.init();
		if(app.videoController) app.videoController.init();
		if(app.introController) app.introController.init();
		if(app.popupController) app.popupController.init();
		if(app.stylesController) app.stylesController.init();
		if(app.productsController) app.productsController.init();
		if(app.trackingController) app.trackingController.init();
		if(app.searchController) app.searchController.init();
		if(app.navigationController) app.navigationController.init();

		$('body').disableTextSelect();
	}
	
	//provide public access to functions
	_this.logger = log4javascript.getDefaultLogger();
	_this.init = init;	
	_this.models = {
		searchCriteria:{},
		stylesFound:[],
		productsFound:[]
	};
	
	return _this;
	
})();






