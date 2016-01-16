(function() {
  'use strict';

  angular
    .module('app.components.index')
    .controller('IndexController', index)

  index.$inject = ["$http", "$q", "$scope", "$state", "$mdToast", "$pusher", "$log", "$mdDialog", "EventService"];

  function index($http, $q, $scope, $state, $mdToast, $pusher, $log, $mdDialog, EventService) {
    var vm = this;
    var client = new Pusher('05cebc0ddd1d3b1ba09f');
    var pusher = $pusher(client);
    var imagePath = "http://placehold.it/40x40";
    vm.seeEventDetail = seeEventDetail;

    $scope.selected = [];

    vm.title = 'Debug Console';

    vm.headers = [{
      name: 'Event',
      field: 'event'
    }, {
      name: 'Código',
      field: 'code'
    }, {
      name: 'Descripción',
      field: 'description'
    }, {
      name: 'CreatedAt',
      field: 'CreatedAt'
    }, {
      name: 'updatedAt',
      field: 'updatedAt'
    }];

    vm.filter = false;
    vm.selected = [];
    vm.data = [];
    vm.count = 0;

    vm.query = {
      order: 'name',
      limit: '5',
      page: 1
    };


    $scope.onClick = function(points, evt) {
      console.log(points, evt);
    };

    init();



    function init() {
      vm.events = [];
      vm.eventsCountTotal = 0;
      vm.eventsBookedTotal = 0;
      vm.eventsCancelledTotal = 0;
      vm.events.created = [];
      vm.events.cancelled = [];
      vm.onPaginate = onPaginate;
      vm.content = "Hello content !";

      $q.all([getEvents(), getEventsResume(), getEventsTotals()]).then(function() {
        suscribeToPusher();
        console.log('Index View Activated');
      });

      $http.get('/event/jwt');
    }

    function saveEvent(data) {
      EventService.saveEvent(data).then(function(data) {
        $log.log(data);
        updateDashboard('booked');
      }, function err(err) {
        $log.log(err);
      });
    }

    function updateDashboard(event) {

      $q.all([getEvents(), getEventsResume(), getEventsTotals()]).then(function() {
        vm.count++;
        switch (event) {
          case 'booked':
            vm.eventsBookedTotal++;
            break;
          case 'Cancelled':
            vm.eventsCancelledTotal++;
          default:
        }
      });

    }

    function getEventsTotals() {
      EventService.getEventsTotals().then(function(data) {
        console.log(data);

        var booked, cancelled = 0;

        if (data.length > 0){
          booked = data[0].count;
          cancelled = data[1].count;
        }
        var totals = {
          booked: {
            label: "Booked Appoinments",
            count: booked
          },
          cancelled: {
            label: "Cancelled Appoinments",
            count: cancelled
          }
        };

        vm.eventsBookedTotal = totals['booked'].count;
        vm.eventsCancelledTotal = totals['cancelled'].count;

        $scope.pie = {
          labels: [ totals['booked'].label, totals['cancelled'].label],
          data: [ vm.eventsBookedTotal, vm.eventsCancelledTotal]
        };

      });
    }

    function getEventsResume() {
      EventService.getEventsResume().then(function(data) {
        var resume = [];

        for (var i = 0; i < data.length; i++) {
          resume.push(data[i].count);
        }

        $scope.lineChart = {
          'labels': ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          'series': ["Daily Booked Appoinments"],
          'data': [
            resume
          ]
        };
      }, function(err) {
        console.log(err);
      });
    }

    function getEvents(query) {
      vm.promise = EventService.getEvents(query || vm.query).then(function(res) {
        console.log(res);
        vm.data = res.data;
        vm.count = res.count;
      }, function(err) {
        console.log(err);
      });
    }

    function onPaginate(page, limit) {
      getEvents({page: page,limit: limit,sort: ''});
    }

    function cancelEvent(pusherEvent) {
      console.log(pusherEvent);
      EventService.setAppoinmentAsCancelled(pusherEvent.event.id).then(function(res) {
        vm.events.cancelled.push(pusherEvent);
        $scope.pie.data[1] = parseInt($scope.pie.data[1]) + 1;
        updateDashboard('cancelled');
        console.log(res);
      }, function(err) {
        console.log(err);
      });
    }

    function suscribeToPusher() {
      pusher.subscribe('test-channel');

      pusher.bind('app.booked-appointment-created',
        function(pusherEvent) {
          vm.events.push(pusherEvent);
          var today = new Date().getDay();
          console.log(today);
          vm.events.created.push(pusherEvent);
          $scope.pie.data[0] = parseInt($scope.pie.data[0]) + 1;
          $scope.lineChart.data[0][today] = parseInt($scope.lineChart.data[0][today]) + 1;
          saveEvent(pusherEvent);
        });

      pusher.bind('app.booked-appointment-cancelled',
        function(pusherEvent) {
          vm.events.push(pusherEvent);
          cancelEvent(pusherEvent);
        });

      pusher.bind('pusher:subscription_error', function(status) {
        console.log(status);
        alert('an error ocurred, please reload the page');
        console.log('you have to reload the page my friend');
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
