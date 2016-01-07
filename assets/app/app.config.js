(function() {
	'use strict';

	angular
		.module('statsDashboard')
		.config(appConfig)

	function appConfig($mdThemingProvider) {
		$mdThemingProvider
			.theme('default')
			.primaryPalette('teal')
			.accentPalette('orange');
	}

})();
