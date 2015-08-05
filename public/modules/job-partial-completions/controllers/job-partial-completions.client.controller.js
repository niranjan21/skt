'use strict';

// JobPartialCompletion controller
angular.module('job-partial-completions').controller('JobPartialCompletionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'JobPartialCompletions',
	function($scope, $stateParams, $location, Authentication, JobPartialCompletions) {
		$scope.authentication = Authentication;

		// Create new JobPartialCompletion
		$scope.create = function() {
			// Create new JobPartialCompletion object
			var jobpartialcompletion = new JobPartialCompletions ({
        
        jobNo: this.jobNo,
        
        date: this.date,
        
        party: this.party,
        
        expectedDeliveryDate: this.expectedDeliveryDate,
        
        orderNo: this.orderNo,
        
        marketingBy: this.marketingBy,
        
        sNo: this.sNo,
        
        design: this.design,
        
        colour: this.colour,
        
        rate: this.rate,
        
        dIA: this.dIA,
        
        requiredQty: this.requiredQty,
        
        closedOrOpen: this.closedOrOpen,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			jobpartialcompletion.$save(function(response) {
				$location.path('job-partial-completions/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing JobPartialCompletion
		$scope.remove = function(jobpartialcompletion) {
			if ( jobpartialcompletion ) { 
				jobpartialcompletion.$remove();

				for (var i in $scope.JobPartialCompletions) {
					if ($scope.jobpartialcompletions [i] === jobpartialcompletion) {
						$scope.jobpartialcompletions.splice(i, 1);
					}
				}
			} else {
				$scope.jobpartialcompletion.$remove(function() {
					$location.path('job-partial-completions');
				});
			}
		};

		// Update existing JobPartialCompletion
		$scope.update = function() {
			var jobpartialcompletion = $scope.jobpartialcompletion;

			jobpartialcompletion.$update(function() {
				$location.path('job-partial-completions/' + jobpartialcompletion._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of JobPartialCompletion
		$scope.find = function() {
			$scope.jobpartialcompletions = JobPartialCompletions.query();
		};

		// Find existing JobPartialCompletion
		$scope.findOne = function() {


      JobPartialCompletions.get({ 
				jobPartialCompletionId: $stateParams.jobPartialCompletionId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        data.expectedDeliveryDate = moment(data.expectedDeliveryDate).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.jobpartialcompletion = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);