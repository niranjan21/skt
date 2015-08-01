'use strict';

// FabricItemMaster controller
angular.module('fabric-item-masters').controller('FabricItemMastersController', ['$scope', '$stateParams', '$location', 'Authentication', 'FabricItemMasters',
	function($scope, $stateParams, $location, Authentication, FabricItemMasters) {
		$scope.authentication = Authentication;

		// Create new FabricItemMaster
		$scope.create = function() {
			// Create new FabricItemMaster object
			var fabricitemmaster = new FabricItemMasters ({
        
        fabric: this.fabric,
        
        count: this.count,
        
        dia: this.dia,
        
        gsm: this.gsm,
        
        openingRolls: this.openingRolls,
        
        openingKgs: this.openingKgs,
        
        ratePerKg: this.ratePerKg,
              
        created: Date.now
  
			});

			// Redirect after save
			fabricitemmaster.$save(function(response) {
				$location.path('fabric-item-masters/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing FabricItemMaster
		$scope.remove = function(fabricitemmaster) {
			if ( fabricitemmaster ) { 
				fabricitemmaster.$remove();

				for (var i in $scope.FabricItemMasters) {
					if ($scope.fabricitemmasters [i] === fabricitemmaster) {
						$scope.fabricitemmasters.splice(i, 1);
					}
				}
			} else {
				$scope.fabricitemmaster.$remove(function() {
					$location.path('fabric-item-masters');
				});
			}
		};

		// Update existing FabricItemMaster
		$scope.update = function() {
			var fabricitemmaster = $scope.fabricitemmaster;

			fabricitemmaster.$update(function() {
				$location.path('fabric-item-masters/' + fabricitemmaster._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of FabricItemMaster
		$scope.find = function() {
			$scope.fabricitemmasters = FabricItemMasters.query();
		};

		// Find existing FabricItemMaster
		$scope.findOne = function() {


      FabricItemMasters.get({ 
				fabricItemMasterId: $stateParams.fabricItemMasterId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.fabricitemmaster = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);