(function() {
    'use strict';

    angular
      .module('app.shared.searchbox')
      .controller('searchBoxController', Controller);


    Controller.$inject = ['$http','$q','$log','$mdDialog'];

    /* @ngInject */
    function Controller($http, $q,$log,$mdDialog) {
      var vm = this;

      activate();

      function activate() {
          loadAll();
      }

      vm.simulateQuery = false;
      vm.placeholder = 'Lookup for your item'
      vm.isDisabled = false;
      // list of `state` value/display objects

      vm.querySearch = querySearch;
      vm.selectedItemChange = selectedItemChange;
      vm.searchTextChange = searchTextChange;
      vm.newState = newState;

      function newState(state) {
        alert("Sorry! You'll need to create a Constituion for " + state + " first!");
      }
      // ******************************
      // Internal methods
      // ******************************
      /**
       * Search for states... use $timeout to simulate
       * remote dataservice call.
       */
      function querySearch(query) {
        var results = query ? vm.states.filter(createFilterFor(query)) : vm.states,
          deferred;
        if (vm.simulateQuery) {
          deferred = $q.defer();
          $timeout(function() {
            deferred.resolve(results);
          }, Math.random() * 1000, false);
          return deferred.promise;
        } else {
          return results;
        }
      }

      function searchTextChange(text) {
        $log.info('Text changed to ' + text);
      }

      function selectedItemChange(item) {
        $log.info('Item changed to ' + JSON.stringify(item));
      }
      /**
       * Build `states` list of key/value pairs
       */
      function loadAll() {

        $http.get('/clinic').then(function(resp){
          var values = resp.data;
          vm.states = values.map(function(clinic) {
            return {
              value: clinic.shortname,
              display: clinic.name
            };
          });
        }, function(err){
            console.log(err);
        });
      }
      /**
       * Create filter function for a query string
       */
      function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(state) {
          return (state.value.indexOf(lowercaseQuery) === 0);
        };
      }

    vm.cancel = function($event) {
      $mdDialog.cancel();
    };
    vm.finish = function($event) {
      $mdDialog.hide(vm.selectedItem);
    };
    }
})();
