'use strict';

// Marketing controller
angular.module('marketings').controller('MarketingsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Marketings',
	function($scope, $stateParams, $location, Authentication, Marketings) {
		$scope.authentication = Authentication;

		// Create new Marketing
		$scope.create = function() {
			// Create new Marketing object
			var marketing = new Marketings ({
        
        code: this.code,
        
        nameoftheMarketing: this.nameoftheMarketing,
              
        created: Date.now
  
			});

			// Redirect after save
			marketing.$save(function(response) {
				$location.path('marketings/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Marketing
		$scope.remove = function(marketing) {
			if ( marketing ) { 
				marketing.$remove();

				for (var i in $scope.Marketings) {
					if ($scope.marketings [i] === marketing) {
						$scope.marketings.splice(i, 1);
					}
				}
			} else {
				$scope.marketing.$remove(function() {
					$location.path('marketings');
				});
			}
		};

		// Update existing Marketing
		$scope.update = function() {
			var marketing = $scope.marketing;

			marketing.$update(function() {
				$location.path('marketings/' + marketing._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Marketing
		$scope.find = function() {
			$scope.marketings = Marketings.query();
		};

		// Find existing Marketing
		$scope.findOne = function() {


      Marketings.get({ 
				marketingId: $stateParams.marketingId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        $scope.marketing = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);