(function() {
	'use strict';

	angular
		.module('statsDashboard')
		.config(appRoutes)

	function appRoutes($stateProvider, $urlRouterProvider) {

		// L'ensemble des routes
		$stateProvider


			.state('home', {
			url: '',
			abstract: true,
			controller: "LayoutController",
			templateUrl: "app/shared/layout/layout.html"
		})

		.state("home.index", {
			url: "/index",
			views: {
				"content": {
					templateUrl: "app/components/index/index.html",
					controller: "IndexController",
					controllerAs: "index"
				}
			}
		})

		$urlRouterProvider.otherwise('/index');
	}

})();
