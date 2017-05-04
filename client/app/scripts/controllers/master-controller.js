'use strict';

/**
 * @ngdoc function
 * @name treq.controller:MasterCtrl
 * @description
 * # MasterCtrl
 * Controller of the treq
 */
angular.module('treq').controller('MasterCtrl', ['$scope', '$http',
  function MasterCtrl($scope, $http) {
    var master = this;

    //////VARIABLES
    master.tagline = 'To the moon and back!';

    //////METHODS

    //////INIT
    function init() {

    }
    init();
    //////IMPLEMENTATION
    var req = $http.get('api/users');

    req.then(function(res){
      master.awesomeUsers = res.data.users;
    });
    req.catch(function(err){
      console.log(err);
    });
    master.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
}]);