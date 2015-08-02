'use strict';

// FabricSaleRegister controller
angular.module('fabric-sale-registers').controller('FabricSaleRegistersController', ['$scope', '$stateParams', '$location', 'Authentication', 'FabricSaleRegisters',
	function($scope, $stateParams, $location, Authentication, FabricSaleRegisters) {
		$scope.authentication = Authentication;

		// Create new FabricSaleRegister
		$scope.create = function() {
			// Create new FabricSaleRegister object
			var fabricsaleregister = new FabricSaleRegisters ({
        
        invoiceNo: this.invoiceNo,
        
        date: this.date,
        
        party: this.party,
        
        partyReference: this.partyReference,
        
        fabric: this.fabric,
        
        count: this.count,
        
        gsm: this.gsm,
        
        dia: this.dia,
        
        rolls: this.rolls,
        
        kgs: this.kgs,
        
        rate: this.rate,
        
        amount: this.amount,
              
        created: Date.now
  
			});

			// Redirect after save
			fabricsaleregister.$save(function(response) {
				$location.path('fabric-sale-registers/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing FabricSaleRegister
		$scope.remove = function(fabricsaleregister) {
			if ( fabricsaleregister ) { 
				fabricsaleregister.$remove();

				for (var i in $scope.FabricSaleRegisters) {
					if ($scope.fabricsaleregisters [i] === fabricsaleregister) {
						$scope.fabricsaleregisters.splice(i, 1);
					}
				}
			} else {
				$scope.fabricsaleregister.$remove(function() {
					$location.path('fabric-sale-registers');
				});
			}
		};

		// Update existing FabricSaleRegister
		$scope.update = function() {
			var fabricsaleregister = $scope.fabricsaleregister;

			fabricsaleregister.$update(function() {
				$location.path('fabric-sale-registers/' + fabricsaleregister._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of FabricSaleRegister
		$scope.find = function() {
			$scope.fabricsaleregisters = FabricSaleRegisters.query();
		};

		// Find existing FabricSaleRegister
		$scope.findOne = function() {


      FabricSaleRegisters.get({ 
				fabricSaleRegisterId: $stateParams.fabricSaleRegisterId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.fabricsaleregister = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);