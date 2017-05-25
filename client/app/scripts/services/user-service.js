'use strict';

/**
 * @ngdoc function
 * @name treq.service:User
 * @description
 * # User
 * Service of treq
 */
angular.module('treq').factory('User', ['$location', '$http', '$q', '$state',
	function User($location, $http, $q, $state) {
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

		function getUserPosition() {
			var userMarker = [];
			var deferred = $q.defer();
			navigator.geolocation.watchPosition(function (position) {
				deferred.resolve(position);
			}, function (err) {
				deferred.reject(err);
			}, {
				enableHighAccuracy: true
			});
			return deferred.promise;
		}
		// this.getCoords = function () {
		// 	var userMarker = [];
		// 	// console.log("in service");
		// 	var centerDfd = $q.defer();
		// 	navigator.geolocation.getCurrentPosition(function (position) {
		// 		centerDfd.resolve(
		// 			{
		// 				lat: position.coords.latitude,
		// 				lon: position.coords.longitude
		// 			});
		// 	}, function (err) {

		// 	}, {
		// 			enableHighAccuracy: true
		// 		});
		// 	return centerDfd.promise;
		// };

		// function getAxomoSpecType() {
		// 	return [
		// 		{ ID: 0, Text: "Item" },
		// 		{ ID: 1, Text: "Size" },
		// 		{ ID: 2, Text: "Note" },
		// 		{ ID: 3, Text: "Textbox" },
		// 		{ ID: 4, Text: "Dimension" },
		// 		{ ID: 5, Text: "Fee" },
		// 		{ ID: 6, Text: "Color" },
		// 		{ ID: 7, Text: "Multimedia" },
		// 		{ ID: 8, Text: "Text Group" }
		// 	];
		// }
		// function getAxomoStatusType() {
		// 	return [
		// 		{ ID: -1, Text: "Not On Store", IsSytem: true },
		// 		{ ID: 0, Text: "Active" },
		// 		{ ID: 2, Text: "Pending" },
		// 		{ ID: 4, Text: "Discontinued" }
		// 	];
		// }

		var USER_STATUS = {
				RETAIL_PRICE: { ID: 1, Text: 'Retail Price' },
				COST_TO_SELL: { ID: 2, Text: 'Cost to Sell' },
				COST_TO_REPLENISH: { ID: 3, Text: 'Cost to Replenish' },
				FIXED: { ID: 3, Text: 'Fixed Price' }
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
			getUserPosition: getUserPosition,
			// getAllUsers: getAllUsers,
			USER_STATUS: USER_STATUS,
			STATUS: STATUS
		};
}]);