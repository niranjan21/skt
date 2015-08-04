'use strict';

// Needle controller
angular.module('needles').controller('NeedlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Needles',
	function($scope, $stateParams, $location, Authentication, Needles) {
		$scope.authentication = Authentication;

		// Create new Needle
		$scope.create = function() {
			// Create new Needle object
			var needle = new Needles ({
        
        code: this.code,
        
        needleName: this.needleName,
              
        created: Date.now
  
			});

			// Redirect after save
			needle.$save(function(response) {
				$location.path('needles/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Needle
		$scope.remove = function(needle) {
			if ( needle ) { 
				needle.$remove();

				for (var i in $scope.Needles) {
					if ($scope.needles [i] === needle) {
						$scope.needles.splice(i, 1);
					}
				}
			} else {
				$scope.needle.$remove(function() {
					$location.path('needles');
				});
			}
		};

		// Update existing Needle
		$scope.update = function() {
			var needle = $scope.needle;

			needle.$update(function() {
				$location.path('needles/' + needle._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Needle
		$scope.find = function() {
			$scope.needles = Needles.query();
		};

		// Find existing Needle
		$scope.findOne = function() {


      Needles.get({ 
				needleId: $stateParams.needleId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        $scope.needle = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);