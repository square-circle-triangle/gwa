/****************************************************************
* Styles Controller
****************************************************************/

app.stylesController = (function(){
	
	var _this = {};
	var _$stylesWrap;
	// var _clickIntent;	
	var _scrollable;

	function init(){
		log("stylesController::init")
		storeReferences();
		// _clickIntent = ClickIntent();
		// _clickIntent.context = _$stylesWrap;
		bindEvents();
	}

	function storeReferences(){
		_$stylesWrap = $("#styles_wrap");
	}
	
	function bindEvents(){
		/*
		setTimeout(function () {
			
			$("#styles_wrap").clickNScroll({
				 reverse: false,
				 acceleration: .5,
				 rightMouse: false
			});
			
		}, 300);
		*/

		/*
		_clickIntent.register("li",function(){
			var href = $(this).data('url');
			window.location.hash = "products/search" + href
		});
		*/

		_$stylesWrap.delegate('li','click',function(event){
			var tar= event.currentTarget;
			var href = $(tar).data('url');
			window.location.hash = "products/search" + href
		});

/*
		_$stylesWrap.scroll(function(event){
			checkScrollPrompt();
		});
*/

		_scrollable = Scrollable($('.scrollable',_$stylesWrap), $('.btn_scroll_up',_$stylesWrap), $('.btn_scroll_down',_$stylesWrap) );
	}

	function renderStyles(){
		log("@renderStyles");
		var template = $("#style_row_template").html();
		var styles = app.models.stylesFound;

		if(styles.length===0){
			log("No styles to render");
			$("#styles_wrap .items").html("No styles found");
			return;	
		}
			
		var sc = app.models.searchCriteria;
		var url = "";
		if(sc.trap!=null){
			url = "/"+sc.trap+"/"+sc.sod+"/"+sc.stf;
		}
		
		var elements = styles.map(function(item){
			item.url = url+"/"+item.id;
			var itemHtml = Mustache.to_html(template,item);
			return itemHtml;
		});
		
		$("#styles_wrap .items").html(elements.join(""));

		// setTimeout(
		// 	checkScrollPrompt,
		// 	100);
	}

	function resetScroll(){
		log("@resetScroll");
		_scrollable.reset(false);
	}

	// function checkScrollPrompt(){
	// 	app.popupController.checkScrollPrompt(_$stylesWrap);
	// }
	
	//public functions
	_this.renderStyles=renderStyles;
	_this.resetScroll = resetScroll;
	// _this.checkScrollPrompt =checkScrollPrompt;
	_this.init = init;
	
	return _this;
})();