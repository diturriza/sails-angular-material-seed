(function() {

    angular.module('statsDashboard')
        .run(runBlock);

    runBlock.$inject = ['$rootScope', '$state', 'Auth', '$location', '$http'];

    function runBlock($rootScope, $state, Auth, $location, $http) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            $rootScope.currentState = toState.name;
            /**
             * if the state does not requires authentication and the
             * user is logged in, redirect to the dashboard page.
             */

            // if (!toState.authenticate && Auth.isAuthenticated()) {
            //     event.preventDefault();
            //     $state.go('home.index');
            //     $rootScope.currentState = 'home.index';
            // }

            /**
             * if the state requires authentication and the
             * user is not logged in, redirect to the login page.
             */
            if (toState.authenticate && !Auth.isAuthenticated()) {
                console.log('not auth');
                event.preventDefault();
                $state.go('home.login');
                $rootScope.currentState = 'home.login';
            }

        });

    }


}());
