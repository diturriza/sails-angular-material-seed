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
			authenticate: false,
			controller: "LayoutController",
			templateUrl: "app/shared/layout/layout.html",
			controllerAs: "vm"
		})

		.state("home.index", {
			url: "/",
			authenticate: true,
			views: {
				"content": {
					templateUrl: "app/components/index/index.html",
					controller: "IndexController",
					controllerAs: "vm"
				}
			}
		})

		.state("home.users", {
			url: "/users",
			authenticate: true,
			views: {
				"content": {
					templateUrl: "app/components/users/users.html",
					controller: "UsersController",
					controllerAs: "vm"
				}
			}
		})

		.state("home.login", {
			url: "/login",
			authenticate: false,
			views: {
				"content": {
					templateUrl: "app/components/auth/login.html",
					controller: "AuthController",
					controllerAs: "auth"
				}
			}
		})

		.state("home.account", {
			url: "/account",
			authenticate: true,
			views: {
				"content": {
					templateUrl: "app/components/account/account.html",
					controller: "AccountController",
					controllerAs: "vm"
				}
			}
		})

		$urlRouterProvider.otherwise('/');
	}

})();
