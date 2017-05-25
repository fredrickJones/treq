'use strict';
/**
 * @ngdoc overview
 * @name treq
 * @description
 * # treq
 *
 * Main module of the application.
 */
angular.module('treq', ['ngAnimate', 'ngAria', 'ngCookies', 'ngMessages', 'ngResource', 'ngRoute', 'ui.router', 'ngSanitize', 'ngStorage', 'ngTouch', 'uiGmapgoogle-maps'])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  
  $urlRouterProvider.otherwise("/");
  $stateProvider
  .state('master', {
    url: '/',
    templateUrl: 'views/master-view.html',
    controller: 'MasterCtrl',
    controllerAs: 'master',
    resolve: {
      UserPosition: function (User) {
        return User.getUserPosition();
        // var deferred = $q.defer()
        // locationService.getCoords().then(function (coords) {
        //   coords.latitude = coords.lat;
        //   coords.longitude = coords.lon;
        //   deferred.resolve(coords);
        // })
        // return deferred.promise;
      }//,
      // AllAdventres: function (rockService) {  /*--- THIS WILL LOAD ALL TREQs ---*/
      //   return rockService.getNear();
      // }
    }
  })
  .state('about', {
    url: '/about',
    templateUrl: 'views/about-view.html',
    controller: 'AboutCtrl',
    controllerAs: 'vm'
  })
  .state('contact', {
    url: '/contact',
    templateUrl: 'views/contact-view.html',
    controller: 'ContactCtrl',
    controllerAs: 'vm'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'views/signup-view.html',
    controller: 'SignupCtrl',
    controllerAs: 'vm'
  });
}])
  
.config(['uiGmapGoogleMapApiProvider',
function (uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    china: true,
    key: 'AIzaSyAOz4CsnPpBUGAfe7pI1D5tJY5morf_xNA',
    v: '3', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });
}]);
