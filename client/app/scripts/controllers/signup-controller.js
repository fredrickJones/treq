'use strict';

/**
 * @ngdoc function
 * @name treq.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the treq
 */

angular.module('treq').controller('SignupCtrl', ['$scope', '$http',
 function ($scope, $http) {
    var vm = this;

    //////VARIABLES
    vm.user = {};

    //////METHODS
    vm.submit = submit;

    //////INIT
    function init(){

    }
    init();

    //////FUNCTIONS
    function submit() {
      // make sure all fields are filled out...
      // aren't you glad you're not typing out
      // $scope.signup.user.firstname everytime now??
      if (!vm.user.firstname || !vm.user.lastname || !vm.user.email || !vm.user.password1 || !vm.user.password2) {
        alert('Please fill out all form fields.');
        return false;
      }
      // make sure the passwords match match
      if (vm.user.password1 !== vm.user.password2) {
        alert('Your passwords must match.');
        return false;
      }

      // Just so we can confirm that the bindings are working
      console.log('THE USER')
      console.log(vm.user);

      // Make the request to the server ... which doesn't exist just yet
      // MOVE THIS TO A SERVICE LATER
      $http.post('/signup', vm.user).then(function successCB(response){
        // our json response is recognized as
        // the data parameter here. See? Our msg
        // value is right there!
        console.log(response.msg);
      }, function errorCB(response){
        // to be filled in on error
        console.log(response.msg);
      });
    }
  }]);