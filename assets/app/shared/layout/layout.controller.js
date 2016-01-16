(function() {
	'use strict';

	angular
		.module('app.shared.layout')
		.controller('LayoutController', layout)


	function layout($mdSidenav, $state, Auth) {
		var vm = this;

		vm.isAuthenticated = isAuthenticated;
		vm.logout = logout;

		vm.menuItems = [
			{
				icon: 'dashboard',
				name: 'Dashboard',
				state: 'home.index'
			},
			{
				icon: 'supervisor_account',
				name: 'Users',
				state: 'home.users'
			},
			{
				icon: 'settings',
				name: 'Settings',
				state: 'home.account'
			},
			{
				icon: 'account',
				name: 'Account',
				state: 'home.account'
			}
		];

		/**
		 * [isAuthenticated description]
		 * @method isAuthenticated
		 * @return {Boolean}       [description]
		 */
		function isAuthenticated(){
			return Auth.isAuthenticated();
		}

		/**
		 * [logout description]
		 * @method logout
		 * @return {[type]} [description]
		 */
		function logout(){
			Auth.logout();
		}
	}

})();
