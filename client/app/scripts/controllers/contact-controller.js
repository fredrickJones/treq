'use strict';

/**
 * @ngdoc function
 * @name treq.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the treq
 */
angular.module('treq').controller('ContactCtrl', ['$http', function ($http) {
  var vm = this;
  var req = $http.get('api/users');

  req.then(function(res){
    vm.awesomeUsers = res.data.users;
  });
  req.catch(function(err){
    console.log(err);
  });
  vm.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
}]);