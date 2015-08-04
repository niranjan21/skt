'use strict';

// Bs controller
angular.module('bs').controller('BsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Bs',
	function($scope, $stateParams, $location, Authentication, Bs) {
		$scope.authentication = Authentication;

		// Create new B
		$scope.create = function() {
			// Create new B object
			var b = new Bs ({
				name: this.name
			});

			// Redirect after save
			b.$save(function(response) {
				$location.path('bs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing B
		$scope.remove = function(b) {
			if ( b ) { 
				b.$remove();

				for (var i in $scope.bs) {
					if ($scope.bs [i] === b) {
						$scope.bs.splice(i, 1);
					}
				}
			} else {
				$scope.b.$remove(function() {
					$location.path('bs');
				});
			}
		};

		// Update existing B
		$scope.update = function() {
			var b = $scope.b;

			b.$update(function() {
				$location.path('bs/' + b._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Bs
		$scope.find = function() {
			$scope.bs = Bs.query();
		};

		// Find existing B
		$scope.findOne = function() {
			$scope.b = Bs.get({ 
				bId: $stateParams.bId
			});
		};
	}
]);