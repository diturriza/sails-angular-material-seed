(function() {
	'use strict';

	angular
		.module('app.components.index')
		.factory('EventService', EventService)

	EventService.$inject = ["$http", "$q","$state","BaseApiUrl"];

	function EventService($http, $q ,$state,BaseApiUrl) {

    var EventService = {
      saveEvent: saveEvent
    };

    function saveEvent(payload) {

      var deferred = $q.defer();

      $http.post(BaseApiUrl + '/event/', payload)
        .success(function(data, status, headers, config) {
          deferred.resolve(data);
        })
        .error(function(status) {
          deferred.reject(status);
        });
      return deferred.promise;
    }

    function getEvents() {

      var deferred = $q.defer();

      $http.get(BaseApiUrl + '/event/')
        .success(function(data, status, headers, config) {
          deferred.resolve(data);
        })
        .error(function(status) {
          deferred.reject(status);
        });
      return deferred.promise;
    }


    return EventService;
	}
})();
