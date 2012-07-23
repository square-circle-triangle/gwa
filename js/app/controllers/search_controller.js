/****************************************************************
* Search Controller
****************************************************************/

app.searchController = (function(){
	
	var _this = {};

	function init(){
		bindEvents();
	}
	
	function bindEvents(){
		//app.keypadController.bind("searchTriggered", function(values){
		//	triggerStylesSearch(values);
		//});
		
		app.keypadController.subscribe("searchTriggered", function(values){
			//log(values);
			triggerStylesSearch(values);
		});
	}	

	function triggerStylesSearch(values){
		log("@searchController.triggerStylesSearch");
		//called by the keypad
		app.navigationController.navigateTo('styles/search/'+getCurrentTrap()+"/"+values[0]+"/"+values[1]);
	}
	
	function showAllStyles(){
		log("@showAllStyles");
		//called by the router when user arrives to the styles page
		//e.g. #styles
	
		var searchCriteria = {trap:null,sod:null,stf:null,style:null};
		if ( shouldSearchAgain(searchCriteria) ){
			app.models.stylesFound = getAllStyles();
			storeSearchCriteria(searchCriteria);
			app.stylesController.renderStyles();
		}
		gotoStylesScreen();
	}

	function searchAndShowStylesByProductSearch(searchCriteria){
		log("@searchController.searchAndShowStylesByProductSearch");
		//called by the router when user arrives to a styles search page
		//e.g. #styles/search/:trap/:sod/:stf

		//only trigger a search if the search criteria is different
		if ( shouldSearchAgain(searchCriteria) ){
			app.models.stylesFound = getStylesByProductSearch(searchCriteria);
			storeSearchCriteria(searchCriteria);
			log("Styles found " + app.models.stylesFound.length);
			app.stylesController.renderStyles();
		}

		if(app.models.stylesFound.length===0){
			showNoStylesFoundAlert();
		}else{
			gotoStylesScreen();
		}

	}
	
	function countProductsPerStyle(products){
		//count how many of each style there are
		//returns an object with keys for each style
		var stylesCount = {};
		products.forEach(function(product){
			var style = product["style"];
			if (!stylesCount[style]) stylesCount[style] = 0;
			stylesCount[style] ++;
		});
		return stylesCount;
	}
	
	function searchAndShowProducts(searchCriteria){
		//called by the router when a user arrives to a products search page
		//e.g. #products/search/:trap/:sod/:stf/:styleName
		log("@searchAndShowProducts");
		log(" - searchCriteria ");
		log(searchCriteria);
		
		if ( shouldSearchAgain(searchCriteria) ){
			app.models.productsFound = getProductsBySearch(searchCriteria);
			storeSearchCriteria(searchCriteria);
			app.productsController.renderProducts();
		}

		if(app.models.productsFound.length===0){
			showNoProductsFoundAlert();
		}else{
			gotoProductsScreen();
		}
	}	
	
	function getAllStyles(){
		return Object.clone(app.models.allStyles,true);
	}
	
	function getStylesByNames(arr){
		//get all the styles in the array
		//log(arr);
		var allStyles = Object.clone(app.models.allStyles,true);
		var res = allStyles.filter(function(style){
			//log(style.id);
			//log(arr.has(style.id));
			return arr.has(style.id);
		});
		return res;
	}
	
	function getStylesByProductSearch(searchCriteria){
		log("@searchController.getStylesByProductSearch");
		
		//find the relevant products first
		//then group the products by styles
		//and show the styles with the product count
			
		var products = getProductsBySearch(searchCriteria);
		log("Products found " + products.length);

		var stylesCount = countProductsPerStyle(products);

		var styleNames = Object.keys(stylesCount);
		var styles = getStylesByNames(styleNames);
		
		styles.forEach(function(style){
			var count = stylesCount[style.id];
			var countStr = (count===1)?" suit":" suites";
			style.productCount = count + countStr + " available";
		});
			
		return styles;
	}
	
	function getProductsBySearch(searchCriteria){
		log("@searchController.getProductsBySearch");
		
		var allProducts = Object.clone(app.models.allProducts,true);
		
		log(searchCriteria);

		var res = allProducts.filter(function(product){
			//log(product);
			if(searchCriteria.style && searchCriteria.style!==null){
				if(product.style!=searchCriteria.style) return false;
			}
			if(searchCriteria.trap && searchCriteria.trap!==null){
				var trap = searchCriteria.trap;
				if(!product[trap+"trap"]) return false;

				if(searchCriteria.sod && searchCriteria.sod!=null){
					if(product[trap+"SodMin"]>searchCriteria.sod) return false;
					if(product[trap+"SodMax"]<searchCriteria.sod) return false;
				}
				if(searchCriteria.stf && searchCriteria.stf!=null){
					if(product["stfMin"]>searchCriteria.stf) return false;
					if(product["stfMax"]<searchCriteria.stf) return false;
				}

			}

			return true;
		});

		return res;
	}
	
	function showNoStylesFoundAlert(){
		log("@showNoStylesFoundAlert");
		app.popupController.openAlert("no_styles_found");
		app.trackingController.track("noResults");
	}
	
	function showNoProductsFoundAlert(){
		log("@showNoProductsFoundAlert");
	}
	
	function storeSearchCriteria(searchCriteria){
		app.models.searchCriteria = searchCriteria;
	}
	
	function shouldSearchAgain(searchCriteria){
		log("@shouldSearchAgain");
		
		//log("went back? " + app.navigationController.wentBack() );
		/*
		For the moment ignore went back, this is confusing the navigation
		
		var wentBack = app.navigationController.wentBack();
		if(wentBack) {
			log(" - Returning false because wentBack is true");
			return false;
		}
		*/
		var storedSearchCriteria = app.models.searchCriteria;
		
		log(" - New search criteria >");
		log(searchCriteria);
		log(" - Stored search criteria >");
		log(storedSearchCriteria);
		
		var res =  Object.equals(searchCriteria,storedSearchCriteria);
		log(" - Should search again? " + !res);
		return !res;
	}
	
	function getCurrentTrap(){
		return app.models.searchCriteria.trap;
	}
	
	function gotoStylesScreen(){
		app.navigationController.gotoScreen('styles');
	}
	
	function gotoProductsScreen(){
		app.navigationController.gotoScreen('products');
	}
	
	Publisher.extend(_this);
	
	//public functions
	_this.init = init;
	_this.showAllStyles = showAllStyles;
	_this.searchAndShowStylesByProductSearch = searchAndShowStylesByProductSearch;
	_this.searchAndShowProducts = searchAndShowProducts;
	
	return _this;
})();