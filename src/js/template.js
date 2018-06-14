(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['buoy'], factory(root));
    } else if (typeof exports === 'object') {
        module.exports = factory(require('buoy'));
    } else {
        root.myPlugin = factory(root, root.buoy);
    }
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

    'use strict';

    //
    // Variables
    //

    const myPlugin = {}; // Object for public APIs
    const supports = !!document.querySelector && !!root.addEventListener; // Feature test
    let settings; // Placeholder variables

    // Default settings
    const defaults = {
        resizeLog: 'The window was resized!',
        callbackOnInit: function() {
        },
        callbackBefore: function () {
        },
        callbackAfter: function () {
        }
    };


    //
    // Methods
    //

    /**
     * Add a class to a link when it's clicked
     * @private
     * @param {Event} event The click event
     */
    const addClass = function (event) {

        // Get the thing that was clicked
        const toggle = event.target;

        // Check if the thing that was clicked has the [data-click-me] attribute
        if (toggle && toggle.hasAttribute('data-click-me')) {

            // Prevent default click event
            if (toggle.tagName.toLowerCase() === 'a') {
                event.preventDefault();
            }

            // Set the [data-click-me] value as a class on the link
            toggle.classList.add(toggle.getAttribute('data-click-me'));

        }

    };

    /**
     * Handle events
     * @private
     */
    const eventHandler = function (event) {

        // Callback before the event handler runs
        settings.callbackBefore(myPlugin);

        // On click
        if (event.type === 'click') {
            addClass(event);
        }

        // On resize
        if (event.type === 'resize') {
            console.log(settings.resizeLog);
        }

        // Callback after the event handler runs
        settings.callbackAfter(myPlugin);

    };

    /**
     * Destroy the current initialization.
     * @public
     */
    myPlugin.destroy = function () {

        // If plugin isn't already initialized, stop
        if (!settings) return;

        // Remove all added classes
        const links = document.querySelectorAll('[data-click-me]');
        for (let i = 0, len = links.length; i < len; i++) {
            links[i].classList.remove(links[i].getAttribute('data-click-me'));
        }

        // Remove event listeners
        document.removeEventListener('click', eventHandler, false);
        window.removeEventListener('resize', eventHandler, false);

        // Reset variables
        settings = null;

    };

    /**
     * Initialize Plugin
     * @public
     * @param {Object} options User settings
     */
    myPlugin.init = function (options) {

        // feature test
        if (!supports) return;

        // Destroy any existing initializations
        myPlugin.destroy();

        // Merge user options with defaults
        settings = buoy.extend(defaults, options || {});

        // Listen for click events
        document.addEventListener('click', eventHandler, false);
        window.addEventListener('resize', eventHandler, false);

        // On Init callback
        settings.callbackOnInit().call(this);
    };


    //
    // Public APIs
    //

    return myPlugin;

});