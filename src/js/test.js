var handler = {
	message : "Event handler",

	// handlerClick : function(name, event ) {
		// alert( this.message + ":" + name + ":" + event.$.type);
	handlerClick : function (event) {
		alert(this.message);
	}
	// }
};

var btn = document.getElementById("my-btn");
// EventUtil.addHandler( btn, "click", bind(handler.handlerClick, handler, my-btn));
EventUtil.addHandler( btn, "click", handlerClick);
