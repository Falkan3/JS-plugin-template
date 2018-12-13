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

    const defaults = {};


    //
    // Shared Methods
    //

    //
    // Helpers
    //
    const helpers = require('modules/helpers.js');

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
            settings = helpers.extend2(defaults, options || {});

            // Code goes here...

        };

        // Initialize the plugin
        publicAPIs.init(options);

        // Return the public APIs
        return publicAPIs;

    };


    //
    // Return the constructor
    //

    return Constructor;

});