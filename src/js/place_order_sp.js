$(function(){
	var _min = $('#min');
	var _add = $('#add');
	var _res = $('#num_box');

	_min.on('touchend', function(event) {
		event.preventDefault();
		var _count  = _res.val();
		_count --;
		if ( _count > -1 ){
			return _res.val(_count);
		}
		else {
			console.log("sorry! it can't be negative!");
		}
	});

	_add.on('touchend',  function(event) {
		event.preventDefault();
		var _count  = _res.val();
		_count++;
		return _res.val(_count);
	});

	$('#submit').on('touchend', function(){
		document.forms.submit();
	});
})
