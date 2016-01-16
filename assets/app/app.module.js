(function() {
    'use strict';

    angular.module('statsDashboard', [

        /*
         * Shared
         */
        'app.shared.layout',
        'app.shared.table',


        /*
         * Components
         */
        'app.components.index',
        'app.components.auth',
        'app.components.users',
        'app.components.account',


         /*
         * other
         */
        'ui.router',
        'ngMaterial',
        'ngMessages',
        'pusher-angular',
        'ngMdIcons',
        'angularMoment'
    ]);
})();
