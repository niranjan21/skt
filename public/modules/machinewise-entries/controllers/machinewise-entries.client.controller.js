'use strict';

// MachinewiseEntry controller
angular.module('machinewise-entries').controller('MachinewiseEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'MachinewiseEntries',
	function($scope, $stateParams, $location, Authentication, MachinewiseEntries) {
		$scope.authentication = Authentication;

		// Create new MachinewiseEntry
		$scope.create = function() {
			// Create new MachinewiseEntry object
			var machinewiseentry = new MachinewiseEntries ({
        
        date: this.date,
        
        shift: this.shift,
        
        machineNo: this.machineNo,
        
        dia: this.dia,
        
        make: this.make,
        
        sNo: this.sNo,
        
        jobNo: this.jobNo,
        
        party: this.party,
        
        operator: this.operator,
        
        fabric: this.fabric,
        
        requirement: this.requirement,
        
        kgs: this.kgs,
        
        production: this.production,
        
        rolls: this.rolls,
        
        productionKgs: this.productionKgs,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			machinewiseentry.$save(function(response) {
				$location.path('machinewise-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing MachinewiseEntry
		$scope.remove = function(machinewiseentry) {
			if ( machinewiseentry ) { 
				machinewiseentry.$remove();

				for (var i in $scope.MachinewiseEntries) {
					if ($scope.machinewiseentries [i] === machinewiseentry) {
						$scope.machinewiseentries.splice(i, 1);
					}
				}
			} else {
				$scope.machinewiseentry.$remove(function() {
					$location.path('machinewise-entries');
				});
			}
		};

		// Update existing MachinewiseEntry
		$scope.update = function() {
			var machinewiseentry = $scope.machinewiseentry;

			machinewiseentry.$update(function() {
				$location.path('machinewise-entries/' + machinewiseentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of MachinewiseEntry
		$scope.find = function() {
			$scope.machinewiseentries = MachinewiseEntries.query();
		};

		// Find existing MachinewiseEntry
		$scope.findOne = function() {


      MachinewiseEntries.get({ 
				machinewiseEntryId: $stateParams.machinewiseEntryId
			})
      .$promise.then(function(data) {
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.machinewiseentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);