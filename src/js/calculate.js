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
			console.log( keyVal[index].method);
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
		console.log(typeof(storage_count));
		var key = storage_count %10;
		var equalVal = eval(_val);
		getLocalStorage().setItem(key, _val + "=" + equalVal);
		storage_count++;
		getLocalStorage().setItem("storage_count", storage_count);

		var calcuHistoryItem = $("#calcu .weui_actionsheet_cell");
		var readyItem = _val + "=" + equalVal;

		if( calcuHistoryItem ){
			calcuHistoryItem.each( function(index, el) {
				var me = $(this);
				if (me.data("num") === key ) {
					me.html(readyItem );
				}
			});
		}
		else {
			creatSheetItem( key, readyItem);
		}
		return equalVal;
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
		/*
		var getClick = sessionStorage.getItem("click_count");
		var temp_count = getLocalStorage().getItem("storage_count");
		var click_count = ( getClick && getClick < 10 )  ? getClick : 0;

		click_count ++;
		sessionStorage.click_count = click_count;

		temp_count = ((temp_count - click_count- 1)%10)> -1? (temp_count - click_count- 1)%10 :  0;

		return getLocalStorage().getItem(temp_count);
		*/
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
	console.log("localStorage.length:" + getLocalStorage().length);
	for (var i = 0 ; i < length-1; i++) {
		var locationlist = getLocalStorage().getItem(i);
		console.log( locationlist );
		creatSheetItem( i, locationlist );
	};
}

var creatSheetItem = function( index, obj ) {
	var newEle = $("<div class='weui_actionsheet_cell'"+"data-num = "+ index +">"+ obj +"</div>");
	var calcuList = $("#calcu .weui_actionsheet_menu");
	calcuList.append(newEle);
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
