(function() {
  'use strict';

  angular
    .module('app.components.users')
    .controller('UsersController', users)

  users.$inject = ['$q', '$state', '$mdDialog','UserService'];

  function users($q, $state, $mdDialog, UserService) {
    var vm = this;
    vm.tableTitle = 'Users';
    vm.addUser = addUser;
    vm.selected = [];
    vm.onPaginate = onPaginate;
    vm.editUser = editUser;
    vm.removeFilter = removeFilter;
    vm.filter =  false;

    vm.query = {
      order: 'name',
      limit: '5',
      page: 1
    };

    init();



    function init() {
      vm.promise = $q.all([getUsers()]).then(function() {
        console.log('users View activated');
      });
    }

    function getUsers(query) {
      vm.promise = UserService.getUsers(query || vm.query).then(success, err);
    }

    function success(res){
      vm.data = res.data;
      vm.count = res.count;
    }

    function err(err) {
      console.log(err);
    }

    function onPaginate(page , limit){
      getUsers({page: page, limit: limit, sort: ''});
    }

    function removeFilter() {
      vm.filter = false;
    }

    function addUser(event) {
      $mdDialog.show({
        clickOutsideToClose: true,
        controller: 'AddUserController',
        controllerAs: 'ctrl',
        focusOnOpen: false,
        targetEvent: event,
        fullscreen: true,
        templateUrl: 'app/components/users/addUser.html',
      }).then(getUsers);
    };

    function editUser() {
      console.log(vm.selected);
    }
  }

})();
