'use strict';

// ExpenseEntry controller
angular.module('expense-entries').controller('ExpenseEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'ExpenseEntries',
	function($scope, $stateParams, $location, Authentication, ExpenseEntries) {
		$scope.authentication = Authentication;

		// Create new ExpenseEntry
		$scope.create = function() {
			// Create new ExpenseEntry object
			var expenseentry = new ExpenseEntries ({
        
        date: this.date,
        
        sNo: this.sNo,
        
        particulars: this.particulars,
        
        amount: this.amount,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			expenseentry.$save(function(response) {
				$location.path('expense-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing ExpenseEntry
		$scope.remove = function(expenseentry) {
			if ( expenseentry ) { 
				expenseentry.$remove();

				for (var i in $scope.ExpenseEntries) {
					if ($scope.expenseentries [i] === expenseentry) {
						$scope.expenseentries.splice(i, 1);
					}
				}
			} else {
				$scope.expenseentry.$remove(function() {
					$location.path('expense-entries');
				});
			}
		};

		// Update existing ExpenseEntry
		$scope.update = function() {
			var expenseentry = $scope.expenseentry;

			expenseentry.$update(function() {
				$location.path('expense-entries/' + expenseentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of ExpenseEntry
		$scope.find = function() {
			$scope.expenseentries = ExpenseEntries.query();
		};

		// Find existing ExpenseEntry
		$scope.findOne = function() {


      ExpenseEntries.get({ 
				expenseEntryId: $stateParams.expenseEntryId
			})
      .$promise.then(function(data) {
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        $scope.expenseentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);