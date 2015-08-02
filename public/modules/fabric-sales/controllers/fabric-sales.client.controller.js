'use strict';

// FabricSale controller
angular.module('fabric-sales').controller('FabricSalesController', ['$scope', '$stateParams', '$location', 'Authentication', 'FabricSales',
	function($scope, $stateParams, $location, Authentication, FabricSales) {
		$scope.authentication = Authentication;

		// Create new FabricSale
		$scope.create = function() {
			// Create new FabricSale object
			var fabricsale = new FabricSales ({
        
        invoiceNo: this.invoiceNo,
        
        date: this.date,
        
        knitter: this.knitter,
        
        party: this.party,
        
        partyReference: this.partyReference,
        
        sNo: this.sNo,
        
        fabric: this.fabric,
        
        count: this.count,
        
        gsm: this.gsm,
        
        dia: this.dia,
        
        rolls: this.rolls,
        
        kgs: this.kgs,
        
        rate: this.rate,
        
        ratePerUnit: this.ratePerUnit,
              
        created: Date.now
  
			});

			// Redirect after save
			fabricsale.$save(function(response) {
				$location.path('fabric-sales/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing FabricSale
		$scope.remove = function(fabricsale) {
			if ( fabricsale ) { 
				fabricsale.$remove();

				for (var i in $scope.FabricSales) {
					if ($scope.fabricsales [i] === fabricsale) {
						$scope.fabricsales.splice(i, 1);
					}
				}
			} else {
				$scope.fabricsale.$remove(function() {
					$location.path('fabric-sales');
				});
			}
		};

		// Update existing FabricSale
		$scope.update = function() {
			var fabricsale = $scope.fabricsale;

			fabricsale.$update(function() {
				$location.path('fabric-sales/' + fabricsale._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of FabricSale
		$scope.find = function() {
			$scope.fabricsales = FabricSales.query();
		};

		// Find existing FabricSale
		$scope.findOne = function() {


      FabricSales.get({ 
				fabricSaleId: $stateParams.fabricSaleId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.fabricsale = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);