$(function() {
	var _keys = $("#calcu button");
	var _screen = $("#calcu .screen");

	keyVal.push(equal);
	keyVal.push(clear);
	keyVal.push(back);
	keyVal.push(last);

	_keys.on('touchend', function() {
		var _me = $(this);
		var _keyVal = _me.data('val');
		var _screenVal = _screen.val();

		if( _keyVal !== "last" ) { sessionStorage.clear(); }

		function isOperator(obj) {
			var i = 0;
			var idx = -1;
			for (; i<keyVal.length; i++) {
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
		console.log(typeof(storage_count));
		var key = storage_count %10;
		var equalVal = eval(_val);
		getLocalStorage().setItem(key, equalVal);
		storage_count++;
		getLocalStorage().setItem("storage_count", storage_count);
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
		var getClick = sessionStorage.getItem("click_count");
		var temp_count = getLocalStorage().getItem("storage_count");
		var click_count = ( getClick && getClick < 10 )  ? getClick : 0;

		click_count ++;
		sessionStorage.click_count = click_count;

		temp_count = ((temp_count - click_count- 1)%10)> -1? (temp_count - click_count- 1)%10 :  0;

		return getLocalStorage().getItem(temp_count);
	}
}


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

