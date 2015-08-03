'use strict';

// FabricDescription controller
angular.module('fabric-descriptions').controller('FabricDescriptionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'FabricDescriptions',
	function($scope, $stateParams, $location, Authentication, FabricDescriptions) {
		$scope.authentication = Authentication;

		// Create new FabricDescription
		$scope.create = function() {
			// Create new FabricDescription object
			var fabricdescription = new FabricDescriptions ({
        
        code: this.code,
        
        fabricDescription: this.fabricDescription,
              
        created: Date.now
  
			});

			// Redirect after save
			fabricdescription.$save(function(response) {
				$location.path('fabric-descriptions/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing FabricDescription
		$scope.remove = function(fabricdescription) {
			if ( fabricdescription ) { 
				fabricdescription.$remove();

				for (var i in $scope.FabricDescriptions) {
					if ($scope.fabricdescriptions [i] === fabricdescription) {
						$scope.fabricdescriptions.splice(i, 1);
					}
				}
			} else {
				$scope.fabricdescription.$remove(function() {
					$location.path('fabric-descriptions');
				});
			}
		};

		// Update existing FabricDescription
		$scope.update = function() {
			var fabricdescription = $scope.fabricdescription;

			fabricdescription.$update(function() {
				$location.path('fabric-descriptions/' + fabricdescription._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of FabricDescription
		$scope.find = function() {
			$scope.fabricdescriptions = FabricDescriptions.query();
		};

		// Find existing FabricDescription
		$scope.findOne = function() {


      FabricDescriptions.get({ 
				fabricDescriptionId: $stateParams.fabricDescriptionId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        $scope.fabricdescription = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);