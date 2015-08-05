'use strict';

// RollwiseEntry controller
angular.module('rollwise-entries').controller('RollwiseEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'RollwiseEntries',
	function($scope, $stateParams, $location, Authentication, RollwiseEntries) {
		$scope.authentication = Authentication;

		// Create new RollwiseEntry
		$scope.create = function() {
			// Create new RollwiseEntry object
			var rollwiseentry = new RollwiseEntries ({
        
        date: this.date,
        
        shift: this.shift,
        
        machineNo: this.machineNo,
        
        dia: this.dia,
        
        make: this.make,
        
        sNo: this.sNo,
        
        jobNo: this.jobNo,
        
        party: this.party,
        
        fabric: this.fabric,
        
        operator: this.operator,
        
        rollNo: this.rollNo,
        
        weight: this.weight,
        
        holes: this.holes,
        
        lycraCut: this.lycraCut,
        
        puVari: this.puVari,
        
        shutoff: this.shutoff,
        
        needleLine: this.needleLine,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			rollwiseentry.$save(function(response) {
				$location.path('rollwise-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing RollwiseEntry
		$scope.remove = function(rollwiseentry) {
			if ( rollwiseentry ) { 
				rollwiseentry.$remove();

				for (var i in $scope.RollwiseEntries) {
					if ($scope.rollwiseentries [i] === rollwiseentry) {
						$scope.rollwiseentries.splice(i, 1);
					}
				}
			} else {
				$scope.rollwiseentry.$remove(function() {
					$location.path('rollwise-entries');
				});
			}
		};

		// Update existing RollwiseEntry
		$scope.update = function() {
			var rollwiseentry = $scope.rollwiseentry;

			rollwiseentry.$update(function() {
				$location.path('rollwise-entries/' + rollwiseentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of RollwiseEntry
		$scope.find = function() {
			$scope.rollwiseentries = RollwiseEntries.query();
		};

		// Find existing RollwiseEntry
		$scope.findOne = function() {


      RollwiseEntries.get({ 
				rollwiseEntryId: $stateParams.rollwiseEntryId
			})
      .$promise.then(function(data) {
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.rollwiseentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);