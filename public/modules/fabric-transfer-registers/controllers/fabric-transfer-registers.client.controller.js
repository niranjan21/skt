'use strict';

// FabricTransferRegister controller
angular.module('fabric-transfer-registers').controller('FabricTransferRegistersController', ['$scope', '$stateParams', '$location', 'Authentication', 'FabricTransferRegisters',
	function($scope, $stateParams, $location, Authentication, FabricTransferRegisters) {
		$scope.authentication = Authentication;

		// Create new FabricTransferRegister
		$scope.create = function() {
			// Create new FabricTransferRegister object
			var fabrictransferregister = new FabricTransferRegisters ({
        
        transferNo: this.transferNo,
        
        jobNo: this.jobNo,
        
        party: this.party,
        
        fabric: this.fabric,
        
        count: this.count,
        
        gsm: this.gsm,
        
        dia: this.dia,
        
        rolls: this.rolls,
        
        kgs: this.kgs,
              
        created: Date.now
  
			});

			// Redirect after save
			fabrictransferregister.$save(function(response) {
				$location.path('fabric-transfer-registers/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing FabricTransferRegister
		$scope.remove = function(fabrictransferregister) {
			if ( fabrictransferregister ) { 
				fabrictransferregister.$remove();

				for (var i in $scope.FabricTransferRegisters) {
					if ($scope.fabrictransferregisters [i] === fabrictransferregister) {
						$scope.fabrictransferregisters.splice(i, 1);
					}
				}
			} else {
				$scope.fabrictransferregister.$remove(function() {
					$location.path('fabric-transfer-registers');
				});
			}
		};

		// Update existing FabricTransferRegister
		$scope.update = function() {
			var fabrictransferregister = $scope.fabrictransferregister;

			fabrictransferregister.$update(function() {
				$location.path('fabric-transfer-registers/' + fabrictransferregister._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of FabricTransferRegister
		$scope.find = function() {
			$scope.fabrictransferregisters = FabricTransferRegisters.query();
		};

		// Find existing FabricTransferRegister
		$scope.findOne = function() {


      FabricTransferRegisters.get({ 
				fabricTransferRegisterId: $stateParams.fabricTransferRegisterId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.fabrictransferregister = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);