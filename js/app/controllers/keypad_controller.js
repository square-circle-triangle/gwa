/****************************************************************
* Keypad controller
****************************************************************/
app.keypadController = (function(){

	var _this = {};
	var _$focusedInput;
	var _$wrap;
	
	function init(){
		storeReferences();
		bindEvents();
	}

	function storeReferences(){
		_$wrap = $("#trap_wrap");
	}
	
	function bindEvents(){
		$(".input_panel .field").click($.proxy(onFieldClick,this));
		$(".keypad").delegate("button", "click", $.proxy(onKey, this));
		$(".btn_search").click($.proxy(onBtnSearch,this));
	}
	
	function onFieldClick(event){
		var ele = event.currentTarget;
		_$focusedInput = $("input",$(ele));
		
		var ix =  _$focusedInput.attr("data-index");
		
		var $panel =  _$focusedInput.closest(".input_panel");
		$panel.removeClass("focus1").removeClass("focus2").addClass("focus"+ix);

		$(".keypad",_$wrap).show();
		$(".link_panel",_$wrap).hide();
	}
	
	function onKey(event){
		//log("@onKey");
		var $ele = $(event.target);
		if(_$focusedInput){
			var key = $ele.attr("data-value");
			var cur = _$focusedInput.val();
			if(key==='clear'){
				cur = cur.slice(0,-1);
			}else{
				if(cur.length<3) cur += key;
			}
			
			_$focusedInput.val(cur);
		}
		
		checkSearchBtnEnableState();
	}
	
	function getValues(){
		var v1 = $(".mea1 input", _$wrap ).val();
		var v2 = $(".mea2 input", _$wrap ).val();
		
		return [v1,v2];
	}
	
	function getConditionsMet(){
		var values = getValues();
		
		return !( values[0].isBlank() || values[1].isBlank() );
	}
	
	function checkSearchBtnEnableState(){	
		switchSearchBtnEnableState( getConditionsMet() );	
	}
	
	function switchSearchBtnEnableState(enabled){
		var $btnSearch = $(".btn_search", _$wrap);
		if(enabled){
			//$btnSearch.attr('disabled','disabled');
		}else{
			//$btnSearch.removeAttr('disabled');
		}
		$btnSearch.toggleClass("enabled",enabled).toggleClass("disabled",!enabled);
	}
	
	function onBtnSearch(event){
		log("@onBtnSearch");
		if(getConditionsMet()){		
			var values = getValues();
			log(values);
			//_this.trigger("searchTriggered",values);
			_this.publish("searchTriggered",[values]);
		}
		return false;
	}
		
	function resetForm(){
		log("@resetForm");
		$(".input_panel").removeClass("focus1").removeClass("focus2");
		$(".input_panel input[type=text]").val("");
		$(".keypad",_$wrap).hide();
		$(".link_panel",_$wrap).show();

		switchSearchBtnEnableState(false);
	}
	
	//_.extend(_this, Backbone.Events);
	Publisher.extend(_this);
	
	//public functions
	_this.init = init;
	_this.resetForm = resetForm;
	
	return _this;

	
})();