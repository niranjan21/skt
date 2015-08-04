'use strict';

// Stoppage controller
angular.module('stoppages').controller('StoppagesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Stoppages',
	function($scope, $stateParams, $location, Authentication, Stoppages) {
		$scope.authentication = Authentication;

		// Create new Stoppage
		$scope.create = function() {
			// Create new Stoppage object
			var stoppage = new Stoppages ({
        
        date: this.date,
        
        code: this.code,
        
        stoppageReason: this.stoppageReason,
              
        created: Date.now
  
			});

			// Redirect after save
			stoppage.$save(function(response) {
				$location.path('stoppages/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Stoppage
		$scope.remove = function(stoppage) {
			if ( stoppage ) { 
				stoppage.$remove();

				for (var i in $scope.Stoppages) {
					if ($scope.stoppages [i] === stoppage) {
						$scope.stoppages.splice(i, 1);
					}
				}
			} else {
				$scope.stoppage.$remove(function() {
					$location.path('stoppages');
				});
			}
		};

		// Update existing Stoppage
		$scope.update = function() {
			var stoppage = $scope.stoppage;

			stoppage.$update(function() {
				$location.path('stoppages/' + stoppage._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Stoppage
		$scope.find = function() {
			$scope.stoppages = Stoppages.query();
		};

		// Find existing Stoppage
		$scope.findOne = function() {


      Stoppages.get({ 
				stoppageId: $stateParams.stoppageId
			})
      .$promise.then(function(data) {
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        $scope.stoppage = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);