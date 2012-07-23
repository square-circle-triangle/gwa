/****************************************************************
* Products Controller
****************************************************************/

app.productsController = (function(){
	
	var _this = {};
	var _$productsWrap;
	var _$productDetails;
	var _productDetailsTemplate;
	var _productGallery,
		_$productGallery;		
	// var _clickIntent;	
	var _scrollable;

	function init(){
		storeReferences();		
		// _clickIntent = ClickIntent();
		// _clickIntent.context = _$productsWrap;
		bindEvents();
	}

	function storeReferences(){
		_$productsWrap = $("#products_wrap");
		_$productDetails = $("#product_details");
		_productDetailsTemplate = $("#product_details_template").html();
	}

	function bindEvents(){

		/*
		setTimeout(function () {
			
			_$productsWrap.clickNScroll({
				 reverse: false,
				 acceleration: .5,
				 rightMouse: false
			});
			
		}, 300);
		*/

		/*
		_clickIntent.register("li",function(){
			var href = $(this).data('model');
			showProduct(href);
		});
		*/

		_$productsWrap.delegate('li','click',function(event){
			var tar= event.currentTarget;
			var href = $(tar).data('model');
			showProduct(href);
		});

		// _$productsWrap.scroll(function(event){
		// 	checkScrollPrompt();
		// });

		_$productsWrap.bind("afterClosed",function(){
			productsCleanUp();
		});

		_$productDetails.delegate(".header .btn_close","click",function(event){
			app.popupController.closeCurrentPopup();
			return false;
		});
		
		_$productDetails.delegate(".btn_more","click",function(event){
			showMore();
			return false;
		});

		_$productDetails.delegate(".more_panel .btn_close","click",function(event){
			hideMore();
			return false;
		});

		_$productDetails.delegate(".more_panel .btn_guide","click",function(event){
			app.popupController.closeCurrentPopup();
			// return false;
		});

		_$productDetails.bind("afterClosed",function(){
			//log("product closed");
			productCleanUp();
		});

		_scrollable = Scrollable($('.scrollable',_$productsWrap), $('.btn_scroll_up',_$productsWrap), $('.btn_scroll_down',_$productsWrap) );
	}


	function renderProducts(){
		log("@renderProducts");
		var products = app.models.productsFound;
		log("- count " + products.length);
		var count = products.length;

		if(count===0){
			log("No products to render");
			$("#products_wrap .items").html("No products found");
			return;	
		}

		var template = $("#product_row_template").html();
		var url = "";
		
		//update the list
		var elements = products.map(function(item){
			return Mustache.to_html(template,item);
		},"");
		$("#products_wrap .items").html(elements.join(""));
		
		//update the header
		var matchString = (count===1)? "match":"matches";
		var toiletString = (count===1)? "toilet":"toilets";
		var numString = numberToText(count);

		$("#products_wrap .header h1").html(numString + " product "+ matchString +" found");
		$("#products_wrap .header p .number").html(numString);
		$("#products_wrap .header p .subject").html(toiletString);

//		setTimeout(checkScrollPrompt,500);
	}

/*
	function checkScrollPrompt(){
		app.popupController.checkScrollPrompt(_$productsWrap);
	}
*/
	function initProductGallery(){
		log("@initProductGallery");

		_$productGallery = $(".gallery", _$productDetails);
		
		_productGallery = Carousel(_$productGallery,{
			speed:800,
			debug:false,
			logger:app.logger,
			btnPrevious:$(".prev",_$productGallery),
			btnNext:$(".next",_$productGallery),
			onChange:function(){
				var ix = _productGallery.getCurrentIndex();
				$(".thumbs button",_$productGallery).removeClass("current").eq(ix).addClass("current");
			}
		});

		//log("_productGallery = " + _productGallery);

		_$productGallery.delegate(".thumbs button","click",function(event){
			var ix = $(".thumbs button",_$productGallery).index(event.currentTarget);
			log(ix);
			_productGallery.moveTo(ix);
			return false;
		});

		$(".thumbs button",_$productGallery).eq(0).addClass("current");

	}

	function showProduct(id){
		log("@showProduct");
	
		// var parts = ref.split("#product/")
		// var id = parts[1];
		// log("id " + id);
		//var id = ref;

		var product = app.dataController.getProductById(id);

		log("product " + product);

		if(app.models.searchCriteria.trap){
			product.showMore = false;
		}else{
			product.showMore = true;
		}

		product.gallery = [product.heroImage, product.lineImage, product.boxImage];
		var html = Mustache.to_html(_productDetailsTemplate, product);

		//log(html);

		$("#product_details_inner").html(html);

		$(".more_panel", _$productDetails).hide();

		app.popupController.openPopup('product_details');

		app.trackingController.track("products/"+id);

		setTimeout(initProductGallery,600);
	}

	function showMore(){
		$(".more_panel", _$productDetails).slideDown();
	}

	function hideMore(){
		$(".more_panel", _$productDetails).slideUp();
	}

	function numberToText(num){
		if(num>10) return num;
		var strings = ["No","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten"];
		return strings[num];
	}

	function productsCleanUp(){
		
	}

	function productCleanUp(){
		log("@productCleanUp");
		//called when product details pop up is closed
		delete _productGallery;
		$("#product_details_inner").html("");
	}

	function resetScroll(){
		log("@resetScroll");
		_scrollable.reset(false);
	}
	
	//public functions
	_this.renderProducts=renderProducts;
	_this.resetScroll = resetScroll;
	//_this.checkScrollPrompt =checkScrollPrompt;
	_this.init = init;
	
	return _this;
})();