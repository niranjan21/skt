'use strict';

// ProductionReport controller
angular.module('production-reports').controller('ProductionReportsController', ['$scope', '$stateParams', '$location', 'Authentication', 'ProductionReports',
	function($scope, $stateParams, $location, Authentication, ProductionReports) {
		$scope.authentication = Authentication;

		// Create new ProductionReport
		$scope.create = function() {
			// Create new ProductionReport object
			var productionreport = new ProductionReports ({
        
        date: this.date,
        
        shift: this.shift,
        
        sNo: this.sNo,
        
        machineNo: this.machineNo,
        
        dia: this.dia,
        
        make: this.make,
        
        jobOrderNo: this.jobOrderNo,
        
        party: this.party,
        
        operator: this.operator,
        
        fabric: this.fabric,
        
        gsm: this.gsm,
        
        lLength: this.lLength,
        
        production: this.production,
        
        rolls: this.rolls,
        
        kgs: this.kgs,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			productionreport.$save(function(response) {
				$location.path('production-reports/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing ProductionReport
		$scope.remove = function(productionreport) {
			if ( productionreport ) { 
				productionreport.$remove();

				for (var i in $scope.ProductionReports) {
					if ($scope.productionreports [i] === productionreport) {
						$scope.productionreports.splice(i, 1);
					}
				}
			} else {
				$scope.productionreport.$remove(function() {
					$location.path('production-reports');
				});
			}
		};

		// Update existing ProductionReport
		$scope.update = function() {
			var productionreport = $scope.productionreport;

			productionreport.$update(function() {
				$location.path('production-reports/' + productionreport._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of ProductionReport
		$scope.find = function() {
			$scope.productionreports = ProductionReports.query();
		};

		// Find existing ProductionReport
		$scope.findOne = function() {


      ProductionReports.get({ 
				productionReportId: $stateParams.productionReportId
			})
      .$promise.then(function(data) {
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.productionreport = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);