$(function() {
	var _keys = $("#calcu button");
	var _screen = $("#calcu .screen");

	keyVal.push(equal);
	keyVal.push(clear);
	keyVal.push(back);
	keyVal.push(last);
	initMenu();

	_keys.on('touchend', function() {
		var _me = $(this);
		var _keyVal = _me.data('val');
		var _screenVal = _screen.val();

		if( _keyVal !== "last" ) { sessionStorage.clear(); }
		function isOperator(obj) {
			var i = 0;
			var idx = -1;
			for (;   i<keyVal.length; i++) {
				if ( obj === keyVal[i].name ) {
					var idx = i;
					break;
				}
			}
			return idx;
		}

		if ( _me.hasClass('operators') && isOperator(_keyVal)> -1 ) {
			var index = isOperator(_keyVal);
			_screenVal = keyVal[index].method(_screenVal);
		}
		else {
			_screenVal = _screenVal + _keyVal;
		}
		return _screen.val( _screenVal );
	});
});

var keyVal = [];
var temp_count = getLocalStorage().getItem("storage_count");
var storage_count = temp_count? temp_count : 0;

var equal = {
	name: "equal",
	method: function( _val) {
		var key = storage_count %10;
		var equalVal = eval(_val);
		getLocalStorage().setItem(key, _val + "=" + equalVal);
		storage_count++;
		getLocalStorage().setItem("storage_count", storage_count);

		var calcuHistoryItem = $("#calcu .weui_actionsheet_menu .weui_actionsheet_cell ");
		var readyItem = _val + "=" + equalVal;

		if ( calcuHistoryItem.length > 9) {
			// last()选择器，选择匹配元素的最后一项， calcuHIstoryItem[ num ],  andior 不支持， 可能是是因为 calcuHistoryItem 非数组。

			var rmItem = calcuHistoryItem.last();
			rmItem.remove();
		}
		creatSheetItem( readyItem);
		return(equalVal) ;
	},
};

var clear = {
	name: "clear",
	method: function(_val) {
		return "";
	},
};

var back = {
	name: "back",
	method: function(_val) {
	 	var _valArray= _val.split("");
		_valArray.pop();
		console.log(_valArray);
		return _valArray.join("");
	},
};

var last = {
	name: "last",
	method: function() {
		lastOut();
	}
};

function getLocalStorage() {
	if ( typeof localStorage == 'object' ) {
		return localStorage;
	}
	else if ( typeof globalStorage == 'object' ) {
		return globalStorage[ location.host ];
	}
	else {
		throw new Error( "Local Storage not available. " );
	}
}

var  initMenu = function() {
	var length = getLocalStorage().length;
	// console.log("localStorage.length:" + getLocalStorage().length);
	for (var i = 0 ; i < length-1; i++) {
		var locationlist = getLocalStorage().getItem(i);
		// console.log( locationlist );
		creatSheetItem( locationlist );
	};
}

var creatSheetItem = function(obj ) {
	var newEle = $("<div class='weui_actionsheet_cell' " +">"+ obj +"</div>");
	var calcuList = $("#calcu .weui_actionsheet_menu");
	newEle.prependTo( calcuList );
}

var lastOut = function () {
	var mask = $('#mask');
	var weuiActionsheet = $('#weui_actionsheet');
	weuiActionsheet.addClass('weui_actionsheet_toggle');
	mask.show().addClass('weui_fade_toggle').one('touchend', function () {
	    hideActionSheet(weuiActionsheet, mask);
	});
	$('#actionsheet_cancel').one('touchend', function () {
	    hideActionSheet(weuiActionsheet, mask);
	});
	weuiActionsheet.unbind('transitionend').unbind('webkitTransitionEnd');
}

function hideActionSheet(weuiActionsheet, mask) {
    weuiActionsheet.removeClass('weui_actionsheet_toggle');
    mask.removeClass('weui_fade_toggle');
    weuiActionsheet.on('transitionend', function () {
        mask.hide();
    }).on('webkitTransitionEnd', function () {
        mask.hide();
    })
}
