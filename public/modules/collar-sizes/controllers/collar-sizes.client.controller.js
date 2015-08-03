'use strict';

// CollarSize controller
angular.module('collar-sizes').controller('CollarSizesController', ['$scope', '$stateParams', '$location', 'Authentication', 'CollarSizes',
	function($scope, $stateParams, $location, Authentication, CollarSizes) {
		$scope.authentication = Authentication;

		// Create new CollarSize
		$scope.create = function() {
			// Create new CollarSize object
			var collarsize = new CollarSizes ({
        
        sno: this.sno,
        
        add: this.add,
        
        permissibleSizeList: this.permissibleSizeList,
              
        created: Date.now
  
			});

			// Redirect after save
			collarsize.$save(function(response) {
				$location.path('collar-sizes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing CollarSize
		$scope.remove = function(collarsize) {
			if ( collarsize ) { 
				collarsize.$remove();

				for (var i in $scope.CollarSizes) {
					if ($scope.collarsizes [i] === collarsize) {
						$scope.collarsizes.splice(i, 1);
					}
				}
			} else {
				$scope.collarsize.$remove(function() {
					$location.path('collar-sizes');
				});
			}
		};

		// Update existing CollarSize
		$scope.update = function() {
			var collarsize = $scope.collarsize;

			collarsize.$update(function() {
				$location.path('collar-sizes/' + collarsize._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of CollarSize
		$scope.find = function() {
			$scope.collarsizes = CollarSizes.query();
		};

		// Find existing CollarSize
		$scope.findOne = function() {


      CollarSizes.get({ 
				collarSizeId: $stateParams.collarSizeId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        
        $scope.collarsize = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);