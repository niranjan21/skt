'use strict';

// ProductionTestEntry controller
angular.module('production-test-entries').controller('ProductionTestEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'ProductionTestEntries',
	function($scope, $stateParams, $location, Authentication, ProductionTestEntries) {
		$scope.authentication = Authentication;

		// Create new ProductionTestEntry
		$scope.create = function() {
			// Create new ProductionTestEntry object
			var productiontestentry = new ProductionTestEntries ({
        
        jobNo: this.jobNo,
        
        date: this.date,
        
        party: this.party,
        
        count: this.count,
        
        mill: this.mill,
        
        numberofCones: this.numberofCones,
        
        grossWeight: this.grossWeight,
        
        netWeight: this.netWeight,
        
        fabricProduced: this.fabricProduced,
        
        balanceYarnNetWeight: this.balanceYarnNetWeight,
        
        shortageKgs: this.shortageKgs,
        
        inPercentage: this.inPercentage,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			productiontestentry.$save(function(response) {
				$location.path('production-test-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing ProductionTestEntry
		$scope.remove = function(productiontestentry) {
			if ( productiontestentry ) { 
				productiontestentry.$remove();

				for (var i in $scope.ProductionTestEntries) {
					if ($scope.productiontestentries [i] === productiontestentry) {
						$scope.productiontestentries.splice(i, 1);
					}
				}
			} else {
				$scope.productiontestentry.$remove(function() {
					$location.path('production-test-entries');
				});
			}
		};

		// Update existing ProductionTestEntry
		$scope.update = function() {
			var productiontestentry = $scope.productiontestentry;

			productiontestentry.$update(function() {
				$location.path('production-test-entries/' + productiontestentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of ProductionTestEntry
		$scope.find = function() {
			$scope.productiontestentries = ProductionTestEntries.query();
		};

		// Find existing ProductionTestEntry
		$scope.findOne = function() {


      ProductionTestEntries.get({ 
				productionTestEntryId: $stateParams.productionTestEntryId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.productiontestentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);