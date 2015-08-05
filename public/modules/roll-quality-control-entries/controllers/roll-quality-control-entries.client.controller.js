'use strict';

// RollQualityControlEntry controller
angular.module('roll-quality-control-entries').controller('RollQualityControlEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'RollQualityControlEntries',
	function($scope, $stateParams, $location, Authentication, RollQualityControlEntries) {
		$scope.authentication = Authentication;

		// Create new RollQualityControlEntry
		$scope.create = function() {
			// Create new RollQualityControlEntry object
			var rollqualitycontrolentry = new RollQualityControlEntries ({
        
        date: this.date,
        
        shift: this.shift,
        
        machineNo: this.machineNo,
        
        dia: this.dia,
        
        make: this.make,
        
        sNo: this.sNo,
        
        jobNo: this.jobNo,
        
        party: this.party,
        
        fabric: this.fabric,
              
        created: Date.now
  
			});

			// Redirect after save
			rollqualitycontrolentry.$save(function(response) {
				$location.path('roll-quality-control-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing RollQualityControlEntry
		$scope.remove = function(rollqualitycontrolentry) {
			if ( rollqualitycontrolentry ) { 
				rollqualitycontrolentry.$remove();

				for (var i in $scope.RollQualityControlEntries) {
					if ($scope.rollqualitycontrolentries [i] === rollqualitycontrolentry) {
						$scope.rollqualitycontrolentries.splice(i, 1);
					}
				}
			} else {
				$scope.rollqualitycontrolentry.$remove(function() {
					$location.path('roll-quality-control-entries');
				});
			}
		};

		// Update existing RollQualityControlEntry
		$scope.update = function() {
			var rollqualitycontrolentry = $scope.rollqualitycontrolentry;

			rollqualitycontrolentry.$update(function() {
				$location.path('roll-quality-control-entries/' + rollqualitycontrolentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of RollQualityControlEntry
		$scope.find = function() {
			$scope.rollqualitycontrolentries = RollQualityControlEntries.query();
		};

		// Find existing RollQualityControlEntry
		$scope.findOne = function() {


      RollQualityControlEntries.get({ 
				rollQualityControlEntryId: $stateParams.rollQualityControlEntryId
			})
      .$promise.then(function(data) {
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.rollqualitycontrolentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);