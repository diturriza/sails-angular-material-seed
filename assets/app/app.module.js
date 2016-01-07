(function() {
    'use strict';

    angular.module('statsDashboard', [

        /*
         * Shared
         */
        'app.shared.layout',

        /*
         * Components
         */
        'app.components.index',

         /*
         * other
         */
        'ui.router',
        'ngMaterial',
        'ngMessages',
        'pusher-angular'
    ]);
})();
