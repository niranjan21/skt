'use strict';

// FabricGroup controller
angular.module('fabric-groups').controller('FabricGroupsController', ['$scope', '$stateParams', '$location', 'Authentication', 'FabricGroups',
	function($scope, $stateParams, $location, Authentication, FabricGroups) {
		$scope.authentication = Authentication;

		// Create new FabricGroup
		$scope.create = function() {
			// Create new FabricGroup object
			var fabricgroup = new FabricGroups ({
        
        code: this.code,
        
        fabricGroup: this.fabricGroup,
              
        created: Date.now
  
			});

			// Redirect after save
			fabricgroup.$save(function(response) {
				$location.path('fabric-groups/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing FabricGroup
		$scope.remove = function(fabricgroup) {
			if ( fabricgroup ) { 
				fabricgroup.$remove();

				for (var i in $scope.FabricGroups) {
					if ($scope.fabricgroups [i] === fabricgroup) {
						$scope.fabricgroups.splice(i, 1);
					}
				}
			} else {
				$scope.fabricgroup.$remove(function() {
					$location.path('fabric-groups');
				});
			}
		};

		// Update existing FabricGroup
		$scope.update = function() {
			var fabricgroup = $scope.fabricgroup;

			fabricgroup.$update(function() {
				$location.path('fabric-groups/' + fabricgroup._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of FabricGroup
		$scope.find = function() {
			$scope.fabricgroups = FabricGroups.query();
		};

		// Find existing FabricGroup
		$scope.findOne = function() {


      FabricGroups.get({ 
				fabricGroupId: $stateParams.fabricGroupId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        $scope.fabricgroup = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);