'use strict';

// PerHourProduction controller
angular.module('per-hour-productions').controller('PerHourProductionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'PerHourProductions',
	function($scope, $stateParams, $location, Authentication, PerHourProductions) {
		$scope.authentication = Authentication;

		// Create new PerHourProduction
		$scope.create = function() {
			// Create new PerHourProduction object
			var perhourproduction = new PerHourProductions ({
        
        dia: this.dia,
        
        count: this.count,
        
        perHourProductionKgs: this.perHourProductionKgs,
        
        shift: this.shift,
        
        date: this.date,
              
        created: Date.now
  
			});

			// Redirect after save
			perhourproduction.$save(function(response) {
				$location.path('per-hour-productions/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing PerHourProduction
		$scope.remove = function(perhourproduction) {
			if ( perhourproduction ) { 
				perhourproduction.$remove();

				for (var i in $scope.PerHourProductions) {
					if ($scope.perhourproductions [i] === perhourproduction) {
						$scope.perhourproductions.splice(i, 1);
					}
				}
			} else {
				$scope.perhourproduction.$remove(function() {
					$location.path('per-hour-productions');
				});
			}
		};

		// Update existing PerHourProduction
		$scope.update = function() {
			var perhourproduction = $scope.perhourproduction;

			perhourproduction.$update(function() {
				$location.path('per-hour-productions/' + perhourproduction._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of PerHourProduction
		$scope.find = function() {
			$scope.perhourproductions = PerHourProductions.query();
		};

		// Find existing PerHourProduction
		$scope.findOne = function() {


      PerHourProductions.get({ 
				perHourProductionId: $stateParams.perHourProductionId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        $scope.perhourproduction = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);