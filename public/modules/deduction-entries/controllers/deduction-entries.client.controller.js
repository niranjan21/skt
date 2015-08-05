'use strict';

// DeductionEntry controller
angular.module('deduction-entries').controller('DeductionEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'DeductionEntries',
	function($scope, $stateParams, $location, Authentication, DeductionEntries) {
		$scope.authentication = Authentication;

		// Create new DeductionEntry
		$scope.create = function() {
			// Create new DeductionEntry object
			var deductionentry = new DeductionEntries ({
        
        date: this.date,
        
        employeeCode: this.employeeCode,
        
        employeeName: this.employeeName,
        
        deduction: this.deduction,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			deductionentry.$save(function(response) {
				$location.path('deduction-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing DeductionEntry
		$scope.remove = function(deductionentry) {
			if ( deductionentry ) { 
				deductionentry.$remove();

				for (var i in $scope.DeductionEntries) {
					if ($scope.deductionentries [i] === deductionentry) {
						$scope.deductionentries.splice(i, 1);
					}
				}
			} else {
				$scope.deductionentry.$remove(function() {
					$location.path('deduction-entries');
				});
			}
		};

		// Update existing DeductionEntry
		$scope.update = function() {
			var deductionentry = $scope.deductionentry;

			deductionentry.$update(function() {
				$location.path('deduction-entries/' + deductionentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of DeductionEntry
		$scope.find = function() {
			$scope.deductionentries = DeductionEntries.query();
		};

		// Find existing DeductionEntry
		$scope.findOne = function() {


      DeductionEntries.get({ 
				deductionEntryId: $stateParams.deductionEntryId
			})
      .$promise.then(function(data) {
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        $scope.deductionentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);