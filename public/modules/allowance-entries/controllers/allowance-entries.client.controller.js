'use strict';

// AllowanceEntry controller
angular.module('allowance-entries').controller('AllowanceEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'AllowanceEntries',
	function($scope, $stateParams, $location, Authentication, AllowanceEntries) {
		$scope.authentication = Authentication;

		// Create new AllowanceEntry
		$scope.create = function() {
			// Create new AllowanceEntry object
			var allowanceentry = new AllowanceEntries ({
        
        date: this.date,
        
        employeeCode: this.employeeCode,
        
        employeeName: this.employeeName,
        
        allowance: this.allowance,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			allowanceentry.$save(function(response) {
				$location.path('allowance-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing AllowanceEntry
		$scope.remove = function(allowanceentry) {
			if ( allowanceentry ) { 
				allowanceentry.$remove();

				for (var i in $scope.AllowanceEntries) {
					if ($scope.allowanceentries [i] === allowanceentry) {
						$scope.allowanceentries.splice(i, 1);
					}
				}
			} else {
				$scope.allowanceentry.$remove(function() {
					$location.path('allowance-entries');
				});
			}
		};

		// Update existing AllowanceEntry
		$scope.update = function() {
			var allowanceentry = $scope.allowanceentry;

			allowanceentry.$update(function() {
				$location.path('allowance-entries/' + allowanceentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of AllowanceEntry
		$scope.find = function() {
			$scope.allowanceentries = AllowanceEntries.query();
		};

		// Find existing AllowanceEntry
		$scope.findOne = function() {


      AllowanceEntries.get({ 
				allowanceEntryId: $stateParams.allowanceEntryId
			})
      .$promise.then(function(data) {
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        $scope.allowanceentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);