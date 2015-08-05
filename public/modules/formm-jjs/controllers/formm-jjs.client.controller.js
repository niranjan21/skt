'use strict';

// FormmJJ controller
angular.module('formm-jjs').controller('FormmJJSController', ['$scope', '$stateParams', '$location', 'Authentication', 'FormmJJS',
	function($scope, $stateParams, $location, Authentication, FormmJJS) {
		$scope.authentication = Authentication;

		// Create new FormmJJ
		$scope.create = function() {
			// Create new FormmJJ object
			var formmjj = new FormmJJS ({
        
        sNo: this.sNo,
        
        date: this.date,
        
        party: this.party,
        
        concern: this.concern,
        
        place: this.place,
        
        attn: this.attn,
        
        quantityOfWeight: this.quantityOfWeight,
        
        valueOfGoods: this.valueOfGoods,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			formmjj.$save(function(response) {
				$location.path('formm-jjs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing FormmJJ
		$scope.remove = function(formmjj) {
			if ( formmjj ) { 
				formmjj.$remove();

				for (var i in $scope.FormmJJS) {
					if ($scope.formmjjs [i] === formmjj) {
						$scope.formmjjs.splice(i, 1);
					}
				}
			} else {
				$scope.formmjj.$remove(function() {
					$location.path('formm-jjs');
				});
			}
		};

		// Update existing FormmJJ
		$scope.update = function() {
			var formmjj = $scope.formmjj;

			formmjj.$update(function() {
				$location.path('formm-jjs/' + formmjj._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of FormmJJ
		$scope.find = function() {
			$scope.formmjjs = FormmJJS.query();
		};

		// Find existing FormmJJ
		$scope.findOne = function() {


      FormmJJS.get({ 
				formmJjId: $stateParams.formmJjId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.formmjj = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);