'use strict';

// FabricStockReport controller
angular.module('fabric-stock-reports').controller('FabricStockReportsController', ['$scope', '$stateParams', '$location', 'Authentication', 'FabricStockReports',
	function($scope, $stateParams, $location, Authentication, FabricStockReports) {
		$scope.authentication = Authentication;

		// Create new FabricStockReport
		$scope.create = function() {
			// Create new FabricStockReport object
			var fabricstockreport = new FabricStockReports ({
        
        sNo: this.sNo,
        
        fabric: this.fabric,
        
        count: this.count,
        
        gsm: this.gsm,
        
        dia: this.dia,
        
        rolls: this.rolls,
        
        kgs: this.kgs,
              
        created: Date.now
  
			});

			// Redirect after save
			fabricstockreport.$save(function(response) {
				$location.path('fabric-stock-reports/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing FabricStockReport
		$scope.remove = function(fabricstockreport) {
			if ( fabricstockreport ) { 
				fabricstockreport.$remove();

				for (var i in $scope.FabricStockReports) {
					if ($scope.fabricstockreports [i] === fabricstockreport) {
						$scope.fabricstockreports.splice(i, 1);
					}
				}
			} else {
				$scope.fabricstockreport.$remove(function() {
					$location.path('fabric-stock-reports');
				});
			}
		};

		// Update existing FabricStockReport
		$scope.update = function() {
			var fabricstockreport = $scope.fabricstockreport;

			fabricstockreport.$update(function() {
				$location.path('fabric-stock-reports/' + fabricstockreport._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of FabricStockReport
		$scope.find = function() {
			$scope.fabricstockreports = FabricStockReports.query();
		};

		// Find existing FabricStockReport
		$scope.findOne = function() {


      FabricStockReports.get({ 
				fabricStockReportId: $stateParams.fabricStockReportId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.fabricstockreport = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);