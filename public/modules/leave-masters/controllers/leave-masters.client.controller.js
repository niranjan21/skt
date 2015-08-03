'use strict';

// LeaveMaster controller
angular.module('leave-masters').controller('LeaveMastersController', ['$scope', '$stateParams', '$location', 'Authentication', 'LeaveMasters',
	function($scope, $stateParams, $location, Authentication, LeaveMasters) {
		$scope.authentication = Authentication;

		// Create new LeaveMaster
		$scope.create = function() {
			// Create new LeaveMaster object
			var leavemaster = new LeaveMasters ({
        
        date: this.date,
        
        day: this.day,
        
        shift: this.shift,
              
        created: Date.now
  
			});

			// Redirect after save
			leavemaster.$save(function(response) {
				$location.path('leave-masters/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing LeaveMaster
		$scope.remove = function(leavemaster) {
			if ( leavemaster ) { 
				leavemaster.$remove();

				for (var i in $scope.LeaveMasters) {
					if ($scope.leavemasters [i] === leavemaster) {
						$scope.leavemasters.splice(i, 1);
					}
				}
			} else {
				$scope.leavemaster.$remove(function() {
					$location.path('leave-masters');
				});
			}
		};

		// Update existing LeaveMaster
		$scope.update = function() {
			var leavemaster = $scope.leavemaster;

			leavemaster.$update(function() {
				$location.path('leave-masters/' + leavemaster._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of LeaveMaster
		$scope.find = function() {
			$scope.leavemasters = LeaveMasters.query();
		};

		// Find existing LeaveMaster
		$scope.findOne = function() {


      LeaveMasters.get({ 
				leaveMasterId: $stateParams.leaveMasterId
			})
      .$promise.then(function(data) {
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        $scope.leavemaster = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);