/*!
 * Universal Module Definition (UMD) with Constructor Boilerplate
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 */

(function (root, factory) {
    if ( typeof define === 'function' && define.amd ) {
        define([], function () {
            return factory(root);
        });
    } else if ( typeof exports === 'object' ) {
        module.exports = factory(root);
    } else {
        root.myPlugin = factory(root);
    }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function (window) {

    'use strict';

    //
    // Shared Variables
    //

    const defaults = {
        someVar: 123,
        initClass: 'js-myplugin',
        callbackOnInit: function() {
        },
        callbackBefore: function () {
        },
        callbackAfter: function () {
        },
        callbackOnInitArray: [
            function () {
                console.log('Init function callback array 1');
            },
            function () {
                console.log('Init function callback array 2');
            },
        ],
    };


    //
    // Shared Methods
    //

    //
    // Helpers
    //
    const Helpers = require('./modules/helpers.js');
    const InternalHelper = require('./modules/internal_helper.js');

    //
    // Constructor
    // Can be named anything you want
    //

    const Constructor = function (options) {

        //
        // Unique Variables
        //

        const publicAPIs = {};
        let settings;

        //
        // Internal Helpers
        //

        let internalHelper;

        //
        // Unique Methods
        //

        /**
         * A private method
         */
        const somePrivateMethod = function () {
            // Code goes here...
        };

        /**
         * A public method
         */
        publicAPIs.doSomething = function () {
            somePrivateMethod();
            // Code goes here...
        };

        /**
         * Another public method
         */
        publicAPIs.init = function (options) {

            // Merge options into defaults
            settings = Helpers.mergeDeep(defaults, options || {});

            // Initialize internal helpers
            internalHelper = new InternalHelper(settings);

            // Code goes here...

            // On Init callback
            publicAPIs.callbackCall('Init');
        };

        // Initialize the plugin
        publicAPIs.init(options);

        /**
         * Call callback by name
         * @public
         * @param {String} callbackName callback's name
         */
        publicAPIs.callbackCall = function (callbackName) {
            const callback = settings[`callbackOn${callbackName}`];
            const callbackArray = settings[`callbackOn${callbackName}Array`];
            if (typeof callback === 'function') {
                callback.call(this);
            }
            if(Helpers.isArray(callbackArray)) {
                Helpers.forEach(callbackArray, function(value, prop) {
                    if (typeof callbackArray[prop] === 'function') {
                        callbackArray[prop].call(this);
                    }
                }, this);
            }
        };

        // Return the public APIs
        return publicAPIs;

    };


    //
    // Return the constructor
    //

    return Constructor;

});