var Publisher = (function(){

	function extend(obj){
		obj.subscribe = subscribe;
		obj.unsubscribe = unsubscribe;
		obj.publish = publish;
	}

	function subscribe(name, handler) {
		if (!this.subscribedEvents) this.subscribedEvents = {};
		if (!this.subscribedEvents[name]) this.subscribedEvents[name] = [];
		this.subscribedEvents[name].push(handler);
	}
	
	function unsubscribe(name, handler) {
		if (!this.subscribedEvents) return;
		if (!this.subscribedEvents[name]) return;
		for (var i = this.subscribedEvents[name].length - 1; i >= 0; i--){
			if (this.subscribedEvents[name][i] == handler){
				this.subscribedEvents[name].splice(i, 1);
			}
		}
	}

	function publish(name, args) {
		if (!this.subscribedEvents) return;
		if (!this.subscribedEvents[name]) return;
		if(args===undefined) args = []
		for (var i = 0, len=this.subscribedEvents[name].length; i < len; i++){
			this.subscribedEvents[name][i].apply(this, args);
		}
	}
	
	return {
		extend:extend
	}

})();