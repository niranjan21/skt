'use strict';

// PowerAndDieselConsumptionEntry controller
angular.module('power-and-diesel-consumption-entries').controller('PowerAndDieselConsumptionEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'PowerAndDieselConsumptionEntries',
	function($scope, $stateParams, $location, Authentication, PowerAndDieselConsumptionEntries) {
		$scope.authentication = Authentication;

		// Create new PowerAndDieselConsumptionEntry
		$scope.create = function() {
			// Create new PowerAndDieselConsumptionEntry object
			var poweranddieselconsumptionentry = new PowerAndDieselConsumptionEntries ({
        
        date: this.date,
        
        powerConsumptionUnits: this.powerConsumptionUnits,
        
        amount: this.amount,
        
        dieselConsumptionLitres: this.dieselConsumptionLitres,
        
        value: this.value,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			poweranddieselconsumptionentry.$save(function(response) {
				$location.path('power-and-diesel-consumption-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing PowerAndDieselConsumptionEntry
		$scope.remove = function(poweranddieselconsumptionentry) {
			if ( poweranddieselconsumptionentry ) { 
				poweranddieselconsumptionentry.$remove();

				for (var i in $scope.PowerAndDieselConsumptionEntries) {
					if ($scope.poweranddieselconsumptionentries [i] === poweranddieselconsumptionentry) {
						$scope.poweranddieselconsumptionentries.splice(i, 1);
					}
				}
			} else {
				$scope.poweranddieselconsumptionentry.$remove(function() {
					$location.path('power-and-diesel-consumption-entries');
				});
			}
		};

		// Update existing PowerAndDieselConsumptionEntry
		$scope.update = function() {
			var poweranddieselconsumptionentry = $scope.poweranddieselconsumptionentry;

			poweranddieselconsumptionentry.$update(function() {
				$location.path('power-and-diesel-consumption-entries/' + poweranddieselconsumptionentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of PowerAndDieselConsumptionEntry
		$scope.find = function() {
			$scope.poweranddieselconsumptionentries = PowerAndDieselConsumptionEntries.query();
		};

		// Find existing PowerAndDieselConsumptionEntry
		$scope.findOne = function() {


      PowerAndDieselConsumptionEntries.get({ 
				powerAndDieselConsumptionEntryId: $stateParams.powerAndDieselConsumptionEntryId
			})
      .$promise.then(function(data) {
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.poweranddieselconsumptionentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);