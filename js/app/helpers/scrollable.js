var Scrollable = function($wrapper, $btnUp, $btnDown){
	
	var _this = {};
	var _currentPos = 0;
	var _scrolling=false;

	var VIEW_HEIGHT = 1176;
	var BTN_HEIGHT = 116;

	init();

	function init(){
		bindEvents();
	}

	function log(msg){
		//console.log(msg);
	}

	function bindEvents(){
		$btnUp.click(function(event){
			goUp();
			return false;
		});

		$btnDown.click(function(event){
			goDown();
			return false;
		});
	}

	function reset(animate){
		log("reset")
		setTimeout(
			function(){
				scrollTo(0,animate);
			},
			500);
	}

	function refresh(animate){

		if(animate===undefined) animate=true;

		//_currentPos = parseInt($wrapper.css('top'),10)*-1;
		var h = $wrapper.height();

 		if(h <= VIEW_HEIGHT){
			$btnUp.hide();
			$btnDown.hide();
			return;
		}

		if(_currentPos === 0 ){
			if(animate) $btnUp.fadeOut(300);
			if(!animate) $btnUp.hide();
		}else{
			if(animate) $btnUp.fadeIn(300);
			if(!animate) $btnUp.show();
		}

		if( (h-_currentPos) < VIEW_HEIGHT){
		//if( _currentPos >= getMaxScroll() ){
			if(animate) $btnDown.fadeOut(300);
			if(!animate) $btnDown.hide();
		}else{
			if(animate) $btnDown.fadeIn(300);
			if(!animate) $btnDown.show();
		}

	}

	function getMaxScroll(){
		var h = $wrapper.height();
		var max = h - VIEW_HEIGHT + BTN_HEIGHT*2;
		return Math.max(max,0);
	}

	function getPositions(){
		var positions = [];
		$(".items li",$wrapper).each(function(ix,ele){
			positions.push( $(ele).position().top );
		});
		return positions;
	}

	function findNextUp(){
		var positions = getPositions();
		var pos = 0;

		for(var a=0,len=positions.length; a<len ;a++){
			if(positions[a] < _currentPos-10 ) pos = positions[a];
		}
		return pos;
	}

	function findNextDown(){
		var positions = getPositions();

		// console.log(positions);
		// console.log("_currentPos " + _currentPos);
		var pos = positions[positions.length-1];
		for(var a=positions.length-1; a>-1; a--){
			if(positions[a] > _currentPos+10 ) pos = positions[a];
		}

		//console.log("pos " + pos);
		return pos;
	}

	function goUp(){
		// if(_scrolling) return;
		scrollTo( findNextUp() );
	}

	function goDown(){
		//if(_scrolling) return;
		scrollTo( findNextDown() );
	}

	function scrollTo(pos,animate){
		log("scrollTo");
		log("pos " + pos);

		if(animate===undefined) animate=true;

		var max = getMaxScroll();

		log("max " + max);

		//dont let it scroll too much
		if(pos >= max+10) return;

		_currentPos = pos;
		

		var top = _currentPos*-1;
		if(_currentPos>0)		top += $btnUp.height();

		
		if(animate){
			_scrolling = true;
			$wrapper.stop(false,false).animate({top:top},500,function(){
				refresh();
				setTimeout(
					function(){_scrolling=false;},
					300)
			});
		}else{
			$wrapper.stop(false,false).css("top",top);
			refresh(false);
		}
	}

	_this.init= init;
	_this.reset = reset;

	return _this;

}