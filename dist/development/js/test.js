$( function () {

	function add( num1, num2 ) {
		console.log(" i'm in add!!");
		return num1 + num2;
	}
	add(1,2);
	var curriedAdd = curry(add, 5);
	console.log(curriedAdd);
	console.log( curriedAdd(3));
})


function curry( fn ) {
	var args = Array.prototype.slice.call( arguments, 1 );
	return function() {
		var innerArgs = Array.prototype.slice.call( arguments);
		var finalArgs = args.concat( innerArgs );
		return fn.apply( null, finalArgs );
	};
}
