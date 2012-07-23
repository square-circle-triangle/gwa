var ClickIntent = function(){

	var _this = {};
	_this.context = null;

	var _callback;
	
	var _intentStartTime, _intentElement, _intentCurrentScroll;

	function register(selector, callback){
		_callback = callback;

		_this.context.delegate(selector, "mousedown", function(event){
			clickIntentBegin(event);
			return false;
		});

		_this.context.delegate("li", "click", function(event){
			//showProduct($(this).attr("href"));
			clickIntentEnd(event);
			return false;
		});
	}

	function clickIntentBegin(event){
		_intentStartTime = Date.now();
		_intentElement = event.currentTarget;
		_intentCurrentScroll = _this.context.scrollTop();
	}

	function clickIntentEnd(event){
		var ele = event.currentTarget;
		var dif = Date.now() - _intentStartTime;
		var scroll = _this.context.scrollTop();
		var inTime = dif < 500;
		var sameElement = ele===_intentElement;
		var inScrollRange = scroll>_intentCurrentScroll-20 || scroll < _intentCurrentScroll+20;

		//var href = $(ele).data('model');

		//console.log('ele ' + ele)
	//	console.log('dif ' + dif)
		//console.log('scroll ' + scroll)

		if(inTime && sameElement && inScrollRange){
			_callback.call(ele);
		}
	}

	_this.register = register;
	return _this;

}