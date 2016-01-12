(function() {
  'use strict';

  angular
    .module('app.components.index')
    .controller('IndexController', index)

  index.$inject = ["$scope", "$state", "$mdToast", "$pusher", "$log", "$mdDialog", "EventService"];

  function index($scope, $state, $mdToast, $pusher, $log, $mdDialog, EventService) {
    var vm = this;
    var client = new Pusher('05cebc0ddd1d3b1ba09f');
    var pusher = $pusher(client);
    var imagePath = "http://placehold.it/40x40";
    vm.seeEventDetail = seeEventDetail;

		init();


    $scope.selected = [];
    $scope.query = {
      order: 'name',
      limit: 5,
      page: 1
    };

    $scope.pie = {
      labels: ["Booked Appoinments", "Cancelled Appoinments"],
      data: [10, 0]
    };

    $scope.lineChart = {
      'labels': ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      'series': ["Daily Booked Appoinments"],
      'data': [
        [0, 10, 0, 0, 0, 0, 0]
      ]
    };

    $scope.onClick = function(points, evt) {
      console.log(points, evt);
    };


    $scope.onPaginate = function(page, limit) {
      getData(angular.extend({}, $scope.query, {
        page: page,
        limit: limit
      }));
    };

    $scope.onReorder = function(order) {
      getData(angular.extend({}, $scope.query, {
        order: order
      }));
    };

		function getData(query) {

		}

		function success(desserts) {

		}


    function init() {
      vm.events = [];
      vm.events.created = [];
      vm.events.cancelled = [];

      vm.content = "Hello content !";

      pusher.subscribe('test-channel');
      pusher.bind('app.booked-appointment-created',
        function(pusherEvent) {
          vm.events.push(pusherEvent);
          var today = new Date().getDay();
          vm.events.created.push(pusherEvent);
          $scope.pie.data[0] = parseInt($scope.pie.data[0]) + 1;
          $scope.lineChart.data[0][today] = parseInt($scope.lineChart.data[0][today]) + 1;
          saveEvent(pusherEvent);
        });

      pusher.bind('app.booked-appointment-cancelled',
        function(pusherEvent) {
          vm.events.push(pusherEvent);
          vm.events.cancelled.push(pusherEvent);
          $scope.pie.data[1] = parseInt($scope.pie.data[1]) + 1;
          //saveEvent(pusherEvent);
        });
    }

    function saveEvent(data) {
      EventService.saveEvent(data).then(function(data) {
        $log.log(data);
      }, function err(err) {
        $log.log(err);
      });
    }

    function seeEventDetail(data, event) {
      $mdDialog.show(
        $mdDialog.alert()
        .title('Navigating')
        .textContent('Inspect ' + data.name)
        .ariaLabel('Person inspect demo')
        .ok('Neat!')
        .targetEvent(event)
      );
    }

  }
})();
