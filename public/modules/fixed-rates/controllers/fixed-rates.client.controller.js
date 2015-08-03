'use strict';

// FixedRate controller
angular.module('fixed-rates').controller('FixedRatesController', ['$scope', '$stateParams', '$location', 'Authentication', 'FixedRates',
	function($scope, $stateParams, $location, Authentication, FixedRates) {
		$scope.authentication = Authentication;

		// Create new FixedRate
		$scope.create = function() {
			// Create new FixedRate object
			var fixedrate = new FixedRates ({
        
        party: this.party,
        
        fabric: this.fabric,
        
        rate: this.rate,
              
        created: Date.now
  
			});

			// Redirect after save
			fixedrate.$save(function(response) {
				$location.path('fixed-rates/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing FixedRate
		$scope.remove = function(fixedrate) {
			if ( fixedrate ) { 
				fixedrate.$remove();

				for (var i in $scope.FixedRates) {
					if ($scope.fixedrates [i] === fixedrate) {
						$scope.fixedrates.splice(i, 1);
					}
				}
			} else {
				$scope.fixedrate.$remove(function() {
					$location.path('fixed-rates');
				});
			}
		};

		// Update existing FixedRate
		$scope.update = function() {
			var fixedrate = $scope.fixedrate;

			fixedrate.$update(function() {
				$location.path('fixed-rates/' + fixedrate._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of FixedRate
		$scope.find = function() {
			$scope.fixedrates = FixedRates.query();
		};

		// Find existing FixedRate
		$scope.findOne = function() {


      FixedRates.get({ 
				fixedRateId: $stateParams.fixedRateId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        
        $scope.fixedrate = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);