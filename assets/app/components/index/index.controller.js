(function() {
	'use strict';

	angular
		.module('app.components.index')
		.controller('IndexController', index)

	index.$inject = ["$scope","$state", "$mdToast","$pusher", "$log", "$mdDialog", "EventService"];

	function index($scope, $state, $mdToast ,$pusher,$log,$mdDialog, EventService) {
		var vm = this;
		var client = new Pusher('05cebc0ddd1d3b1ba09f');
 		var pusher = $pusher(client);
		var imagePath = "http://placehold.it/40x40";
		vm.seeEventDetail = seeEventDetail;

		init();

		function init(){
			vm.events = [];
			vm.content = "Hello content !";

			pusher.subscribe('test-channel');
			pusher.bind('app.booked-appointment-created',
		  function(pusherEvent) {
				vm.events.push(pusherEvent);
				saveEvent(pusherEvent);
		  });
		}

		 function saveEvent(data){
			EventService.saveEvent(data).then(function(data){
				$log.log(data);
			}, function err(err){
				$log.log(err);
			});
		}

		function seeEventDetail(data, event){
			$mdDialog.show(
      $mdDialog.alert()
        .title('Navigating')
        .textContent('Inspect ' + data.name)
        .ariaLabel('Person inspect demo')
        .ok('Neat!')
        .targetEvent(event)
    	);
		}

		$scope.phones = [
		{ type: 'Home', number: '(555) 251-1234' },
		{ type: 'Cell', number: '(555) 786-9841' },
		{ type: 'Office', number: '(555) 314-1592' }
	];
	$scope.todos = [
		{
			face : imagePath,
			what: 'Brunch this weekend?',
			who: 'Min Li Chan',
			when: '3:08PM',
			notes: " I'll be in your neighborhood doing errands"
		},
		{
			face : imagePath,
			what: 'Brunch this weekend?',
			who: 'Min Li Chan',
			when: '3:08PM',
			notes: " I'll be in your neighborhood doing errands"
		},
		{
			face : imagePath,
			what: 'Brunch this weekend?',
			who: 'Min Li Chan',
			when: '3:08PM',
			notes: " I'll be in your neighborhood doing errands"
		},
		{
			face : imagePath,
			what: 'Brunch this weekend?',
			who: 'Min Li Chan',
			when: '3:08PM',
			notes: " I'll be in your neighborhood doing errands"
		},
		{
			face : imagePath,
			what: 'Brunch this weekend?',
			who: 'Min Li Chan',
			when: '3:08PM',
			notes: " I'll be in your neighborhood doing errands"
		},
	];
	}
})();
