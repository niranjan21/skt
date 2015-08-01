'use strict';

// StoppagesEntry controller
angular.module('stoppages-entries').controller('StoppagesEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'StoppagesEntries',
	function($scope, $stateParams, $location, Authentication, StoppagesEntries) {
		$scope.authentication = Authentication;

		// Create new StoppagesEntry
		$scope.create = function() {
			// Create new StoppagesEntry object
			var stoppagesentry = new StoppagesEntries ({
        
        date: this.date,
        
        shift: this.shift,
        
        machineCode: this.machineCode,
        
        stoppageReason: this.stoppageReason,
        
        stopInMinutes: this.stopInMinutes,
              
        created: Date.now
  
			});

			// Redirect after save
			stoppagesentry.$save(function(response) {
				$location.path('stoppages-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing StoppagesEntry
		$scope.remove = function(stoppagesentry) {
			if ( stoppagesentry ) { 
				stoppagesentry.$remove();

				for (var i in $scope.StoppagesEntries) {
					if ($scope.stoppagesentries [i] === stoppagesentry) {
						$scope.stoppagesentries.splice(i, 1);
					}
				}
			} else {
				$scope.stoppagesentry.$remove(function() {
					$location.path('stoppages-entries');
				});
			}
		};

		// Update existing StoppagesEntry
		$scope.update = function() {
			var stoppagesentry = $scope.stoppagesentry;

			stoppagesentry.$update(function() {
				$location.path('stoppages-entries/' + stoppagesentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of StoppagesEntry
		$scope.find = function() {
			$scope.stoppagesentries = StoppagesEntries.query();
		};

		// Find existing StoppagesEntry
		$scope.findOne = function() {


      StoppagesEntries.get({ 
				stoppagesEntryId: $stateParams.stoppagesEntryId
			})
      .$promise.then(function(data) {
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        $scope.stoppagesentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);