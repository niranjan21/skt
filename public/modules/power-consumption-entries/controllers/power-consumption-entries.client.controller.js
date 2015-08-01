'use strict';

// PowerConsumptionEntry controller
angular.module('power-consumption-entries').controller('PowerConsumptionEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'PowerConsumptionEntries',
	function($scope, $stateParams, $location, Authentication, PowerConsumptionEntries) {
		$scope.authentication = Authentication;

		// Create new PowerConsumptionEntry
		$scope.create = function() {
			// Create new PowerConsumptionEntry object
			var powerconsumptionentry = new PowerConsumptionEntries ({
        
        date: this.date,
        
        powerConsumptionUnits: this.powerConsumptionUnits,
        
        rate: this.rate,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			powerconsumptionentry.$save(function(response) {
				$location.path('power-consumption-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing PowerConsumptionEntry
		$scope.remove = function(powerconsumptionentry) {
			if ( powerconsumptionentry ) { 
				powerconsumptionentry.$remove();

				for (var i in $scope.PowerConsumptionEntries) {
					if ($scope.powerconsumptionentries [i] === powerconsumptionentry) {
						$scope.powerconsumptionentries.splice(i, 1);
					}
				}
			} else {
				$scope.powerconsumptionentry.$remove(function() {
					$location.path('power-consumption-entries');
				});
			}
		};

		// Update existing PowerConsumptionEntry
		$scope.update = function() {
			var powerconsumptionentry = $scope.powerconsumptionentry;

			powerconsumptionentry.$update(function() {
				$location.path('power-consumption-entries/' + powerconsumptionentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of PowerConsumptionEntry
		$scope.find = function() {
			$scope.powerconsumptionentries = PowerConsumptionEntries.query();
		};

		// Find existing PowerConsumptionEntry
		$scope.findOne = function() {


      PowerConsumptionEntries.get({ 
				powerConsumptionEntryId: $stateParams.powerConsumptionEntryId
			})
      .$promise.then(function(data) {
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        $scope.powerconsumptionentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);