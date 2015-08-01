'use strict';

// JobCard controller
angular.module('job-cards').controller('JobCardsController', ['$scope', '$stateParams', '$location', 'Authentication', 'JobCards',
	function($scope, $stateParams, $location, Authentication, JobCards) {
		$scope.authentication = Authentication;

		// Create new JobCard
		$scope.create = function() {
			// Create new JobCard object
			var jobcard = new JobCards ({
        
        job: this.job,
        
        date: this.date,
        
        isTheJobFinished: this.isTheJobFinished,
        
        remarks: this.remarks,
        
        preparedBy: this.preparedBy,
        
        authorisedBy: this.authorisedBy,
              
        created: Date.now
  
			});

			// Redirect after save
			jobcard.$save(function(response) {
				$location.path('job-cards/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing JobCard
		$scope.remove = function(jobcard) {
			if ( jobcard ) { 
				jobcard.$remove();

				for (var i in $scope.JobCards) {
					if ($scope.jobcards [i] === jobcard) {
						$scope.jobcards.splice(i, 1);
					}
				}
			} else {
				$scope.jobcard.$remove(function() {
					$location.path('job-cards');
				});
			}
		};

		// Update existing JobCard
		$scope.update = function() {
			var jobcard = $scope.jobcard;

			jobcard.$update(function() {
				$location.path('job-cards/' + jobcard._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of JobCard
		$scope.find = function() {
			$scope.jobcards = JobCards.query();
		};

		// Find existing JobCard
		$scope.findOne = function() {


      JobCards.get({ 
				jobCardId: $stateParams.jobCardId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        $scope.jobcard = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);