(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require('jQuery'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jQuery'], factory);
    } else {
        // Browser globals (root is window)
        root.Draggable = factory(root.jQuery);
    }
}(this, function ($) {

	var container = document.getElementById('container'),
		element = document.getElementsByClassName('ball')[0],
		labelX = document.getElementsByClassName('coords-x')[0],
		labelY = document.getElementsByClassName('coords-y')[0],
		inputGrid = document.getElementById('input-grid'),
		inputSmooth = document.getElementById('input-smooth');

	// options
	var options = {
		grid: 10,
		setCursor: true,
		onDrag: update,
		onDragEnd: update
	};

	// initialize drag
	var drag = new Draggable(element, options);

	function update (element, x, y) {
		labelX.innerHTML = x;
		labelY.innerHTML = y;
	}

	// form events
	$(inputGrid).on('change', function() {

		var grid = +inputGrid.value;

		// resize visual grid 
		container.style.backgroundSize = grid;

		// update grid size in drag instance
		drag.setOption('grid', grid);

	});

	$(inputSmooth).on('change', function() {

		drag.setOption('smoothDrag', inputSmooth.checked);

	});

}));