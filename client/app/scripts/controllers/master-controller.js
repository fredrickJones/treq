'use strict';

/**
 * @ngdoc function
 * @name treq.controller:MasterCtrl
 * @description
 * # MasterCtrl
 * Controller of the treq
 */
angular.module('treq').controller('MasterCtrl', ['$http', '$localStorage', 'uiGmapGoogleMapApi', 'User', 'UserPosition',
  function MasterCtrl($http, $localStorage, uiGmapGoogleMapApi, User, UserPosition) {
    var master = this;

    //////VARIABLES
    // master.location = User.getUserPosition();
    master.tagline = 'To the moon and back!';
    master.isMap = true;
    master.isLoading = true;
    master.map = {
      center: master.location || UserPosition.coords,
      zoom: 12,
      options: {
        scrollwheel: false,
        // mapTypeControlOptions: {
        //   mapTypeIds: [google.maps.MapTypeId.TERRAIN]
        // },
        disableDefaultUI: true,
        // mapTypeId: google.maps.MapTypeId.TERRAIN,
        zoomControl: true,
        zoomControlOptions: {
          style: 'SMALL'
        }
      }
    };
    console.log('MAP');
    console.log(master.map);
    master.userMarker = {
      id: "user",
      coords: UserPosition.coords,
      options: {
        icon: '../images/markers/user.svg'//yeoman.png'//'user-marker.png'
      }
    };

    //////METHODS
    master.setLocation = setLocation;

    //////INIT
    function init() {
      // var location = {};
      if (navigator.geolocation) {
        console.log('User Position');
        console.log(UserPosition);
        uiGmapGoogleMapApi.then(function (mapData) {
          console.log('MAP DATA');
          console.log(mapData);
          master.map.options.mapTypeId = mapData.mapTypeId.TERRAIN;
          master.isLoading = false;
        });
      } else {
        master.isMap = false;
      }

      // if($localStorage.treqUser) {
      //   User.getByID($localStorage.treqUser.ID).then(function(data) {
      //     console.log(data);
      //   });
      // }
    }
    init();

    //////IMPLEMENTATION
    function setLocation(info) {
      console.log(info);
    }
}]);