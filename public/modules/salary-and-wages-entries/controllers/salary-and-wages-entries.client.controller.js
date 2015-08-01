'use strict';

// SalaryAndWagesEntry controller
angular.module('salary-and-wages-entries').controller('SalaryAndWagesEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'SalaryAndWagesEntries',
	function($scope, $stateParams, $location, Authentication, SalaryAndWagesEntries) {
		$scope.authentication = Authentication;

		// Create new SalaryAndWagesEntry
		$scope.create = function() {
			// Create new SalaryAndWagesEntry object
			var salaryandwagesentry = new SalaryAndWagesEntries ({
        
        date: this.date,
        
        wages: this.wages,
        
        salary: this.salary,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			salaryandwagesentry.$save(function(response) {
				$location.path('salary-and-wages-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing SalaryAndWagesEntry
		$scope.remove = function(salaryandwagesentry) {
			if ( salaryandwagesentry ) { 
				salaryandwagesentry.$remove();

				for (var i in $scope.SalaryAndWagesEntries) {
					if ($scope.salaryandwagesentries [i] === salaryandwagesentry) {
						$scope.salaryandwagesentries.splice(i, 1);
					}
				}
			} else {
				$scope.salaryandwagesentry.$remove(function() {
					$location.path('salary-and-wages-entries');
				});
			}
		};

		// Update existing SalaryAndWagesEntry
		$scope.update = function() {
			var salaryandwagesentry = $scope.salaryandwagesentry;

			salaryandwagesentry.$update(function() {
				$location.path('salary-and-wages-entries/' + salaryandwagesentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of SalaryAndWagesEntry
		$scope.find = function() {
			$scope.salaryandwagesentries = SalaryAndWagesEntries.query();
		};

		// Find existing SalaryAndWagesEntry
		$scope.findOne = function() {


      SalaryAndWagesEntries.get({ 
				salaryAndWagesEntryId: $stateParams.salaryAndWagesEntryId
			})
      .$promise.then(function(data) {
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        $scope.salaryandwagesentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);