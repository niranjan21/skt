'use strict';

// Fabrics controller
angular.module('fabrics').controller('FabricsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Fabrics',
	function($scope, $stateParams, $location, Authentication, Fabrics) {
		$scope.authentication = Authentication;

		// Create new Fabric
		$scope.create = function() {
			// Create new Fabric object
			var fabric = new Fabrics ({
				name: this.name
			});

			// Redirect after save
			fabric.$save(function(response) {
				$location.path('fabrics/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Fabric
		$scope.remove = function(fabric) {
			if ( fabric ) { 
				fabric.$remove();

				for (var i in $scope.fabrics) {
					if ($scope.fabrics [i] === fabric) {
						$scope.fabrics.splice(i, 1);
					}
				}
			} else {
				$scope.fabric.$remove(function() {
					$location.path('fabrics');
				});
			}
		};

		// Update existing Fabric
		$scope.update = function() {
			var fabric = $scope.fabric;

			fabric.$update(function() {
				$location.path('fabrics/' + fabric._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Fabrics
		$scope.find = function() {
			$scope.fabrics = Fabrics.query();
		};

		// Find existing Fabric
		$scope.findOne = function() {
			$scope.fabric = Fabrics.get({ 
				fabricId: $stateParams.fabricId
			});
		};
	}
]);