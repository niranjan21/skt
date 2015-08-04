'use strict';

// Mill controller
angular.module('mills').controller('MillsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Mills',
	function($scope, $stateParams, $location, Authentication, Mills) {
		$scope.authentication = Authentication;

		// Create new Mill
		$scope.create = function() {
			// Create new Mill object
			var mill = new Mills ({
        
        code: this.code,
        
        millName: this.millName,
              
        created: Date.now
  
			});

			// Redirect after save
			mill.$save(function(response) {
				$location.path('mills/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Mill
		$scope.remove = function(mill) {
			if ( mill ) { 
				mill.$remove();

				for (var i in $scope.Mills) {
					if ($scope.mills [i] === mill) {
						$scope.mills.splice(i, 1);
					}
				}
			} else {
				$scope.mill.$remove(function() {
					$location.path('mills');
				});
			}
		};

		// Update existing Mill
		$scope.update = function() {
			var mill = $scope.mill;

			mill.$update(function() {
				$location.path('mills/' + mill._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Mill
		$scope.find = function() {
			$scope.mills = Mills.query();
		};

		// Find existing Mill
		$scope.findOne = function() {


      Mills.get({ 
				millId: $stateParams.millId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        $scope.mill = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);