(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals (root is window)
        root.jQuery = factory();
    }
}(this, function () {

    'use strict';

    var jQuery = function (element) {

        return element instanceof Wrap ? element : new Wrap(element);

    };

    function Wrap(element) {

        this.element = element;

    }

    // prototype methods

    extend(jQuery, {

        extend: extend

    });

    extend(Wrap.prototype, {

        on: function (e, fn) {
            if (e && fn) {
                this.addEvent(e, fn);
            } else if (e) {
                for (var ee in e) {
                    this.addEvent(ee, e[ee]);
                }
            }
        },

        off: function (e, fn) {
            if (e && fn) {
                this.removeEvent(e, fn);
            } else if (e) {
                for (var ee in e) {
                    this.removeEvent(ee, e[ee]);
                }
            }
        },

        addEvent: function (e, fn) {
						this.element.addEventListener(e, fn, false);
				},

        removeEvent: function (e, fn) {
            this.element.removeEventListener(e, fn);
        }

    });

    // helpers

    function extend() {

        var obj = arguments[0];
        var count = arguments.length;

        if (!obj) {
            throw new TypeError('$.extend expects argument 0 to be an Object');
        }

        if (count > 1) {
            for (var n = 1; n < count; n++) {
                var argument = arguments[n];
                for (var key in argument) {
                    obj[key] = argument[key];
                }
            }
        }

        return obj;

    }

    // export

    return jQuery;

}));