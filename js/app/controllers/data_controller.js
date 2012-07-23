/****************************************************************
* Data Controller
****************************************************************/

app.dataController = (function(){
	
	var _this = {};

	function init(){
		getData();
		bindEvents();
	}
	
	function getData(){
		log("@getData");
		// $.getJSON('js/app/models/product.js', function(data){
		// 	app.models.allProducts = data;
		// });

		app.models.allStyles = allStyles;
		app.models.allProducts = allProducts;
	}
	
	function bindEvents(){
		//app.models.matchedStyles.bind("change",function(){log("changed")} ,this);
	}

	function getProductById(id){
		log("@getProductById " + id);
		var product = app.models.allProducts.find(function(p){
			return p.model === id;
		});

		return product;
	}
	
	//_.extend(_this, Backbone.Events);
	
	//public functions
	_this.getProductById = getProductById;
	_this.init = init;
	
	return _this;
})();