'use strict';

// CountMaster controller
angular.module('count-masters').controller('CountMastersController', ['$scope', '$stateParams', '$location', 'Authentication', 'CountMasters',
	function($scope, $stateParams, $location, Authentication, CountMasters) {
		$scope.authentication = Authentication;

		// Create new CountMaster
		$scope.create = function() {
			// Create new CountMaster object
			var countmaster = new CountMasters ({
        
        sno: this.sno,
        
        permissibleCountList: this.permissibleCountList,
              
        created: Date.now
  
			});

			// Redirect after save
			countmaster.$save(function(response) {
				$location.path('count-masters/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing CountMaster
		$scope.remove = function(countmaster) {
			if ( countmaster ) { 
				countmaster.$remove();

				for (var i in $scope.CountMasters) {
					if ($scope.countmasters [i] === countmaster) {
						$scope.countmasters.splice(i, 1);
					}
				}
			} else {
				$scope.countmaster.$remove(function() {
					$location.path('count-masters');
				});
			}
		};

		// Update existing CountMaster
		$scope.update = function() {
			var countmaster = $scope.countmaster;

			countmaster.$update(function() {
				$location.path('count-masters/' + countmaster._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of CountMaster
		$scope.find = function() {
			$scope.countmasters = CountMasters.query();
		};

		// Find existing CountMaster
		$scope.findOne = function() {


      CountMasters.get({ 
				countMasterId: $stateParams.countMasterId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        $scope.countmaster = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);