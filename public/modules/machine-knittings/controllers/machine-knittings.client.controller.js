'use strict';

// MachineKnitting controller
angular.module('machine-knittings').controller('MachineKnittingsController', ['$scope', '$stateParams', '$location', 'Authentication', 'MachineKnittings',
	function($scope, $stateParams, $location, Authentication, MachineKnittings) {
		$scope.authentication = Authentication;

		// Create new MachineKnitting
		$scope.create = function() {
			// Create new MachineKnitting object
			var machineknitting = new MachineKnittings ({
        
        knitter: this.knitter,
        
        machineCode: this.machineCode,
        
        machineMake: this.machineMake,
        
        dia: this.dia,
        
        mark: this.mark,
        
        productionPerDay: this.productionPerDay,
        
        index: this.index,
              
        created: Date.now
  
			});

			// Redirect after save
			machineknitting.$save(function(response) {
				$location.path('machine-knittings/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing MachineKnitting
		$scope.remove = function(machineknitting) {
			if ( machineknitting ) { 
				machineknitting.$remove();

				for (var i in $scope.MachineKnittings) {
					if ($scope.machineknittings [i] === machineknitting) {
						$scope.machineknittings.splice(i, 1);
					}
				}
			} else {
				$scope.machineknitting.$remove(function() {
					$location.path('machine-knittings');
				});
			}
		};

		// Update existing MachineKnitting
		$scope.update = function() {
			var machineknitting = $scope.machineknitting;

			machineknitting.$update(function() {
				$location.path('machine-knittings/' + machineknitting._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of MachineKnitting
		$scope.find = function() {
			$scope.machineknittings = MachineKnittings.query();
		};

		// Find existing MachineKnitting
		$scope.findOne = function() {


      MachineKnittings.get({ 
				machineKnittingId: $stateParams.machineKnittingId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.machineknitting = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);