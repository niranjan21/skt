'use strict';

// YarnDescription controller
angular.module('yarn-descriptions').controller('YarnDescriptionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'YarnDescriptions',
	function($scope, $stateParams, $location, Authentication, YarnDescriptions) {
		$scope.authentication = Authentication;

		// Create new YarnDescription
		$scope.create = function() {
			// Create new YarnDescription object
			var yarndescription = new YarnDescriptions ({
        
        code: this.code,
        
        yarnDescription: this.yarnDescription,
              
        created: Date.now
  
			});

			// Redirect after save
			yarndescription.$save(function(response) {
				$location.path('yarn-descriptions/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing YarnDescription
		$scope.remove = function(yarndescription) {
			if ( yarndescription ) { 
				yarndescription.$remove();

				for (var i in $scope.YarnDescriptions) {
					if ($scope.yarndescriptions [i] === yarndescription) {
						$scope.yarndescriptions.splice(i, 1);
					}
				}
			} else {
				$scope.yarndescription.$remove(function() {
					$location.path('yarn-descriptions');
				});
			}
		};

		// Update existing YarnDescription
		$scope.update = function() {
			var yarndescription = $scope.yarndescription;

			yarndescription.$update(function() {
				$location.path('yarn-descriptions/' + yarndescription._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of YarnDescription
		$scope.find = function() {
			$scope.yarndescriptions = YarnDescriptions.query();
		};

		// Find existing YarnDescription
		$scope.findOne = function() {


      YarnDescriptions.get({ 
				yarnDescriptionId: $stateParams.yarnDescriptionId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        $scope.yarndescription = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);