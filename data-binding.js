( function () {
	"use strict";

	var bindings = []; // Binds object

	var modify = function ( value ) {

		console.log( this.filter );

		if ( this.prop.match( /innerText|innerHTML|value/ ) ) {

			this.element[ this.prop ] = value;

		} else if ( this.prop.match( /class/ ) ) {

			if ( value ) {
				this.element.classList.add( this.opt );
			} else {
				this.element.classList.remove( this.opt );
			}
			
		}
	};

	var setValue = function ( prop, value ) {
		for ( var i = 0, l = bindings.length; i < l; i++ ) {
			if ( prop === bindings[ i ].bind ) {
				modify.call( bindings[ i ], value );
			}
		}
	};

	var app = document.getElementById( 'app' );
	var e = app.querySelectorAll( '[data-binding]' );

	for ( var i = 0; i < e.length; i++ ) {
		var dataSet = e[ i ].dataset.binding;

		var propsAndFilters = dataSet.split( ':' );
		var bind = propsAndFilters[ 0 ].split( '|' );
		var filter = propsAndFilters[ 1 ];

		if ( !bind ) { continue; }

		var tmp = {
			element: e[ i ]
			, bind: bind[ 0 ]
			, prop: bind[ 1 ]
			, opt: bind[ 2 ]
			, filter: filter
		};

		bindings.push( tmp );
	}



	/*
	* Initialize
	**/
	var inputs = document.querySelectorAll( '[data-binding-target]' );
	for ( var i = 0, l = inputs.length; i < l; i++ ) {
		inputs[ i ].onkeyup = function () {
			var n = this.dataset.bindingTarget;

			setValue( n, this.value );
		};
	}

})();