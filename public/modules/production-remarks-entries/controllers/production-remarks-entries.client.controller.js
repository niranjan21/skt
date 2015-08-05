'use strict';

// ProductionRemarksEntry controller
angular.module('production-remarks-entries').controller('ProductionRemarksEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'ProductionRemarksEntries',
	function($scope, $stateParams, $location, Authentication, ProductionRemarksEntries) {
		$scope.authentication = Authentication;

		// Create new ProductionRemarksEntry
		$scope.create = function() {
			// Create new ProductionRemarksEntry object
			var productionremarksentry = new ProductionRemarksEntries ({
        
        date: this.date,
        
        shift: this.shift,
        
        machineDia: this.machineDia,
        
        machine: this.machine,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			productionremarksentry.$save(function(response) {
				$location.path('production-remarks-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing ProductionRemarksEntry
		$scope.remove = function(productionremarksentry) {
			if ( productionremarksentry ) { 
				productionremarksentry.$remove();

				for (var i in $scope.ProductionRemarksEntries) {
					if ($scope.productionremarksentries [i] === productionremarksentry) {
						$scope.productionremarksentries.splice(i, 1);
					}
				}
			} else {
				$scope.productionremarksentry.$remove(function() {
					$location.path('production-remarks-entries');
				});
			}
		};

		// Update existing ProductionRemarksEntry
		$scope.update = function() {
			var productionremarksentry = $scope.productionremarksentry;

			productionremarksentry.$update(function() {
				$location.path('production-remarks-entries/' + productionremarksentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of ProductionRemarksEntry
		$scope.find = function() {
			$scope.productionremarksentries = ProductionRemarksEntries.query();
		};

		// Find existing ProductionRemarksEntry
		$scope.findOne = function() {


      ProductionRemarksEntries.get({ 
				productionRemarksEntryId: $stateParams.productionRemarksEntryId
			})
      .$promise.then(function(data) {
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        $scope.productionremarksentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);