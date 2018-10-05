/*!
 * Vanilla Javascript Boilerplate with optional jQuery initialization
 * Author: Jan Rembold
 * Git: https://github.com/janrembold
 * License: MIT
 */

(function (root, factory) {
    const pluginName = 'Boilerplate';

    if (typeof define === 'function' && define.amd) {
        define([], factory(pluginName));
    } else if (typeof exports === 'object') {
        module.exports = factory(pluginName);
    } else {
        root[pluginName] = factory(pluginName);
    }
}(this, function (pluginName) {
    'use strict';

    const defaults = {
        someDefaultOption: 'foo',
        callbackOnInit: function() {
        }
    };


    /**
     * Merge defaults with user options
     * @param {Object} defaults Default settings
     * @param {Object} options User options
     */
    const extend = function (target, options) {
        let prop, extended = {};
        for (prop in defaults) {
            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                extended[prop] = defaults[prop];
            }
        }
        for (prop in options) {
            if (Object.prototype.hasOwnProperty.call(options, prop)) {
                extended[prop] = options[prop];
            }
        }
        return extended;
    };


    /**
     * Some private helper function
     */
    const privateFunction = function () {
        // private helper code goes here
    };


    /**
     * Plugin Object
     * @param element The html element to initialize
     * @param {Object} options User options
     * @constructor
     */
    function Plugin(element, options) {
        this.element = element;
        this.options = extend(defaults, options);

        // On Init callback
        if (typeof this.options.callbackOnInit === 'function') {
            this.options.callbackOnInit.call(this);
        }

        //init code goes here
        console.log('Plugin inititalized');
    }


    // Plugin prototype
    Plugin.prototype = {

        doSomething: function () {
            this.element.innerHTML = this.options.someDefaultOption;
        }

    };


    // add lightweight jQuery wrapper, if available
    if (window.jQuery) {
        const $ = window.jQuery;

        $.fn[pluginName] = function (options) {
            options = options || {};

            return this.each(function () {
                // add plugin to element data
                if (!$.data(this, 'plugin_' + pluginName)) {
                    options.element = this;
                    $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                }
            });
        };
    }


    return Plugin;
}));