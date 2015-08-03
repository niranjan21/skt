'use strict';

// DiaList controller
angular.module('dia-lists').controller('DiaListsController', ['$scope', '$stateParams', '$location', 'Authentication', 'DiaLists',
	function($scope, $stateParams, $location, Authentication, DiaLists) {
		$scope.authentication = Authentication;

		// Create new DiaList
		$scope.create = function() {
			// Create new DiaList object
			var dialist = new DiaLists ({
        
        sno: this.sno,
        
        permissibleDiaList: this.permissibleDiaList,
              
        created: Date.now
  
			});

			// Redirect after save
			dialist.$save(function(response) {
				$location.path('dia-lists/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing DiaList
		$scope.remove = function(dialist) {
			if ( dialist ) { 
				dialist.$remove();

				for (var i in $scope.DiaLists) {
					if ($scope.dialists [i] === dialist) {
						$scope.dialists.splice(i, 1);
					}
				}
			} else {
				$scope.dialist.$remove(function() {
					$location.path('dia-lists');
				});
			}
		};

		// Update existing DiaList
		$scope.update = function() {
			var dialist = $scope.dialist;

			dialist.$update(function() {
				$location.path('dia-lists/' + dialist._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of DiaList
		$scope.find = function() {
			$scope.dialists = DiaLists.query();
		};

		// Find existing DiaList
		$scope.findOne = function() {


      DiaLists.get({ 
				diaListId: $stateParams.diaListId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        $scope.dialist = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);