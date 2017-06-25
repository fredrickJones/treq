'use strict';

/**
 * @ngdoc function
 * @name treq.service:Adventure
 * @description
 * # Adventure
 * Service of treq
 */
angular.module('treq').factory('Adventure', ['$location', '$http', '$q', '$state', 'User',
	function Adventure($location, $http, $q, $state, User) {

		function getNear() {
			var treqs = [];
			var all = $q.all([rock, camp]);
			User.getUserPosition().then(function(coords) {
				console.log('GET THE TREQS')
				console.log(coords);
				$http.get('api/users');
				$http.get('api/rockClimb?lon=' + coords.lon + '&lat=' + coords.lat)
			});

			// navigator.geolocation.watchPosition(function (position) {
			// 	deferred.resolve(position);
			// }, function (err) {
			// 	deferred.reject(err);
			// }, {
			// 	enableHighAccuracy: true
			// });
			// return deferred.promise;
		}
		// this.getNear = function () {
		// 	var currentMarkers = [];
		// 	var deferred = $q.defer();
		// 	locationService.getCoords().then(function (coords) {
		// 		// console.log(coords);
		// 		$http.get('api/rockClimb?lon=' + coords.lon + '&lat=' + coords.lat).then(function (resp) {
		// 			// console.log(resp);
		// 			currentMarkers = [];
		// 			var markerData = resp.data;
		// 			function NewMarker(name, lat, lon, difficult, trailHead, id, url) {
		// 				this.name = name;
		// 				this.id = id;
		// 				this.coords = {
		// 					latitude: lat,
		// 					longitude: lon
		// 				};
		// 				this.difficult = difficult;
		// 				this.trailHead = trailHead;
		// 				this.url = url;
		// 			};
		// 			var url = 'images/location-marker.png';
		// 			for (var i = 0; i < markerData.length; i++) {
		// 				var cragMarker = new NewMarker(
		// 					markerData[i].name,
		// 					markerData[i].loc[1],
		// 					markerData[i].loc[0],
		// 					markerData[i].difficult,
		// 					markerData[i].trailHead,
		// 					i,
		// 					url
		// 				);
		// 				currentMarkers.push(cragMarker);
		// 			};
		// 			// console.log(currentMarkers);
		// 			deferred.resolve(currentMarkers);
		// 		}).catch(function (err) {
		// 			deferred.reject(err);
		// 		});
		// 	});
		// 	return deferred.promise;
		// };
		
		function save(x) {
			// var isNew = !x.ID;
			return $http.post('/ajax/axomo-item.aspx?data=saveItem', x).then(function (response) {
					angular.copy(response.data, x);
					// promises = [];
					// initItem(x);
					return x;
			});
		}
		function getByID(ID) {
			return $http.get('/ajax/axomo-item.aspx?data=GetByID&itemID=' + ID).then(function (result) {
					if (result.data.isError) {
						// Toaster.pop('warning', 'Error', result.data.errorMessage);
						$state.go("store");
						return {};
					}
					if (result.data.ID === 0) {
						// Toaster.pop('warning', 'Error', 'Item #' + ID + ' does not exist');
						$state.go("store");
						return {};
					}

					// initItem(result.data);
					return result.data;
			});
		}
		function deleteUser(ID) {
			return $http.get('/ajax/axomo-item.aspx?data=DeleteByID&itemID=' + ID).then(function (result) {
					if (result.data.isError) {
						console.log("Error: " + result.data.errorMessage);
						// Toaster.pop('warning', 'Error', result.data.errorMessage);
						return {};
					}
					// promises = [];
					return result.data;
			});
		}

		function getUserByID() {
			var req = $http.get('api/users');

			req.then(function (res) {
				master.awesomeUsers = res.data.users;
			});
			req.catch(function (err) {
				// console.log(err);
			});
		}

		var USER_STATUS = {
				RETAIL_PRICE: { ID: 1, Text: 'Retail Price' },
				COST_TO_SELL: { ID: 2, Text: 'Cost to Sell' },
				COST_TO_REPLENISH: { ID: 3, Text: 'Cost to Replenish' },
				FIXED: { ID: 4, Text: 'Fixed Price' }
		};
		var STATUS = {
				NOT_ON_STORE: { ID: -1, Text: 'Not on Store' },
				ACTIVE: { ID: 0, Text: 'Active' },
				QUOTE: { ID: 1, Text: 'Quote' },
				PENDING_APPROVAL: { ID: 2, Text: 'Pending Approval' },
				PRE_ORDER: { ID: 3, Text: 'Pre Order' },
				DISCONTINUED: { ID: 4, Text: 'Discontinued' }
		};
		// var SpecTypeEnum = {
		// 		ItemSeparator: -1,
		// 		Item: 0,
		// 		Size: 1,
		// 		Note: 2,
		// 		Textbox: 3,
		// 		Dimension: 4,
		// 		Fee: 5,
		// 		Color: 6,
		// 		Multimedia: 7
		// };

//////FUNCTIONS
		return {
			save: save,
			getByID: getByID,
			deleteUser: deleteUser,
			getNear: getNear,
			getUserByID: getUserByID,
			USER_STATUS: USER_STATUS,
			STATUS: STATUS
		};
}]);