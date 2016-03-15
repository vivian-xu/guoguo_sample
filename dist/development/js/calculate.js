$(function() {
	var _keys = $("#calcu button");
	var _screen = $("#calcu .screen");
	var isExp1 = 1;
	var operators = [];

	keyVal.push(equal);
	keyVal.push(clear);
	keyVal.push(back);


	_keys.on('click', function() {
		var _me = $(this);
		var _keyVal = _me.data('val');
		var _screenVal = _screen.val();

		function isOperator(obj) {
			var i = 0;
			var idx = -1;
			for (; i<keyVal.length; i++) {
				if ( obj === keyVal[i].name) {
					var idx = i;
					break;
				}
			}
			return idx;
		}

	/*	if (_me.hasClass('operators')) {
			var i = 0;
			var idx = -1;
			for (; i<keyVal.length; i++) {
				if ( _keyVal === keyVal[i].name) {
					idx = i;
					break;
				}
			}

			console.log(idx);

			if ( idx > -1 ){
				_screenVal = keyVal[idx].method(_screenVal);
			}
			else {
				_screenVal = _screenVal + _keyVal;
			}
		}
		*/
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

var equal = {
	name: "equal",
	method: function( _val) {
		return eval(_val);
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
