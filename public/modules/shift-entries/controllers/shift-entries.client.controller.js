'use strict';

// ShiftEntry controller
angular.module('shift-entries').controller('ShiftEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'ShiftEntries',
	function($scope, $stateParams, $location, Authentication, ShiftEntries) {
		$scope.authentication = Authentication;

		// Create new ShiftEntry
		$scope.create = function() {
			// Create new ShiftEntry object
			var shiftentry = new ShiftEntries ({
        
        date: this.date,
        
        shift: this.shift,
        
        code: this.code,
        
        employeeName: this.employeeName,
        
        numberOfShifts: this.numberOfShifts,
        
        overTimeHours: this.overTimeHours,
              
        created: Date.now
  
			});

			// Redirect after save
			shiftentry.$save(function(response) {
				$location.path('shift-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing ShiftEntry
		$scope.remove = function(shiftentry) {
			if ( shiftentry ) { 
				shiftentry.$remove();

				for (var i in $scope.ShiftEntries) {
					if ($scope.shiftentries [i] === shiftentry) {
						$scope.shiftentries.splice(i, 1);
					}
				}
			} else {
				$scope.shiftentry.$remove(function() {
					$location.path('shift-entries');
				});
			}
		};

		// Update existing ShiftEntry
		$scope.update = function() {
			var shiftentry = $scope.shiftentry;

			shiftentry.$update(function() {
				$location.path('shift-entries/' + shiftentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of ShiftEntry
		$scope.find = function() {
			$scope.shiftentries = ShiftEntries.query();
		};

		// Find existing ShiftEntry
		$scope.findOne = function() {


      ShiftEntries.get({ 
				shiftEntryId: $stateParams.shiftEntryId
			})
      .$promise.then(function(data) {
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.shiftentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);