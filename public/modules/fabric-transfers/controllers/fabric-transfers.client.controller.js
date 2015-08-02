'use strict';

// FabricTransfer controller
angular.module('fabric-transfers').controller('FabricTransfersController', ['$scope', '$stateParams', '$location', 'Authentication', 'FabricTransfers',
	function($scope, $stateParams, $location, Authentication, FabricTransfers) {
		$scope.authentication = Authentication;

		// Create new FabricTransfer
		$scope.create = function() {
			// Create new FabricTransfer object
			var fabrictransfer = new FabricTransfers ({
        
        transferNo: this.transferNo,
        
        jobNo: this.jobNo,
        
        date: this.date,
        
        knitter: this.knitter,
        
        party: this.party,
        
        fabric: this.fabric,
        
        gsm: this.gsm,
        
        kgs: this.kgs,
        
        dia: this.dia,
        
        stockRolls: this.stockRolls,
        
        stockKgs: this.stockKgs,
        
        transferRolls: this.transferRolls,
        
        transferKgs: this.transferKgs,
              
        created: Date.now
  
			});

			// Redirect after save
			fabrictransfer.$save(function(response) {
				$location.path('fabric-transfers/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing FabricTransfer
		$scope.remove = function(fabrictransfer) {
			if ( fabrictransfer ) { 
				fabrictransfer.$remove();

				for (var i in $scope.FabricTransfers) {
					if ($scope.fabrictransfers [i] === fabrictransfer) {
						$scope.fabrictransfers.splice(i, 1);
					}
				}
			} else {
				$scope.fabrictransfer.$remove(function() {
					$location.path('fabric-transfers');
				});
			}
		};

		// Update existing FabricTransfer
		$scope.update = function() {
			var fabrictransfer = $scope.fabrictransfer;

			fabrictransfer.$update(function() {
				$location.path('fabric-transfers/' + fabrictransfer._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of FabricTransfer
		$scope.find = function() {
			$scope.fabrictransfers = FabricTransfers.query();
		};

		// Find existing FabricTransfer
		$scope.findOne = function() {


      FabricTransfers.get({ 
				fabricTransferId: $stateParams.fabricTransferId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.fabrictransfer = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);