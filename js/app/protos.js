/****************************************************************
* This file contains model objects that will be instanciated by the app
****************************************************************/

/****************************************************************
* app router
*****************************************************************/
var AppRouter = Backbone.Router.extend({

	routes:{
		"":"root",
		"intro":"intro",
		"home":"menu",
		"traps":"traps",
		"trap/:trap":"trap",
		"styles":"styles",
		"styles/search/:trap/:sod/:stf":"stylesSearch",
		"products":"products",
		"products/search/:style":"productsSearchByStyle",
		"products/search/:trap/:sod/:stf/:style":"productsFullSearch"
	},

	root:function(){
		if($("#intro_wrap").length){
			app.navigationController.router.intro();
		}else{
			app.navigationController.router.menu();
		}
	},

	intro:function(){
		app.navigationController.storeDirection();
		app.navigationController.gotoScreen('intro');
		app.trackingController.track("intro");
	},

	menu:function(){
		app.navigationController.storeDirection();
		app.navigationController.gotoScreen('home');
		app.trackingController.track("home");
	},

	traps:function(){
		app.navigationController.storeDirection();
		app.navigationController.gotoScreen('traps');
		app.trackingController.track("traps");
	},
	
	trap:function(trap){
		app.navigationController.storeDirection();
		app.models.searchCriteria.trap = trap;
		app.navigationController.gotoScreen('trap');
		app.trackingController.track("traps/"+trap);
	},

	styles:function(){
		app.navigationController.storeDirection();
		app.searchController.showAllStyles();
		app.trackingController.track("styles");
	},
	
	stylesSearch:function(trap,sod,stf){
		app.navigationController.storeDirection();
		app.searchController.searchAndShowStylesByProductSearch({trap:trap,sod:sod,stf:stf});
		app.trackingController.track("styles/search?trap="+trap+"&sod="+sod+"&stf="+stf);
	},

	products:function(){
		app.navigationController.storeDirection();
		app.navigationController.gotoScreen('products');
	},
	
	productsSearchByStyle:function(style){
		app.navigationController.storeDirection();	
		app.searchController.searchAndShowProducts({style:style});
		app.trackingController.track("products/styles/"+style);
	},
	
	productsFullSearch:function(trap,sod,stf,style){
		app.navigationController.storeDirection();
		app.searchController.searchAndShowProducts({trap:trap,sod:sod,stf:stf,style:style});
		app.trackingController.track("products/search?trap="+trap+"&sod="+sod+"&stf="+stf+"&style="+style);
	}

});
