'use strict';

/**
 * @ngdoc overview
 * @name treq
 * @description
 * # treq
 *
 * Main module of the application.
 */
angular
  .module('treq', ['ngAnimate', 'ngAria', 'ngCookies', 'ngMessages', 'ngResource', 'ngRoute', 'ui.router', 'ngSanitize', 'ngTouch'])
  
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('master', {
        url: "/",
        templateUrl: 'views/master-view.html',
        controller: 'MasterCtrl',
        controllerAs: 'master'
      })
      .state('about', {
        url: "/about",
        templateUrl: 'views/about-view.html',
        controller: 'AboutCtrl',
        controllerAs: 'vm'
      })
      .state('contact', {
        url: "/contact",
        templateUrl: 'views/contact-view.html',
        controller: 'ContactCtrl',
        controllerAs: 'vm'
      });
  });
