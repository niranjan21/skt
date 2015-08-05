'use strict';

// FormJj controller
angular.module('form-jjs').controller('FormJjsController', ['$scope', '$stateParams', '$location', 'Authentication', 'FormJjs',
	function($scope, $stateParams, $location, Authentication, FormJjs) {
		$scope.authentication = Authentication;

		// Create new FormJj
		$scope.create = function() {
			// Create new FormJj object
			var formjj = new FormJjs ({
        
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
			formjj.$save(function(response) {
				$location.path('form-jjs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing FormJj
		$scope.remove = function(formjj) {
			if ( formjj ) { 
				formjj.$remove();

				for (var i in $scope.FormJjs) {
					if ($scope.formjjs [i] === formjj) {
						$scope.formjjs.splice(i, 1);
					}
				}
			} else {
				$scope.formjj.$remove(function() {
					$location.path('form-jjs');
				});
			}
		};

		// Update existing FormJj
		$scope.update = function() {
			var formjj = $scope.formjj;

			formjj.$update(function() {
				$location.path('form-jjs/' + formjj._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of FormJj
		$scope.find = function() {
			$scope.formjjs = FormJjs.query();
		};

		// Find existing FormJj
		$scope.findOne = function() {


      FormJjs.get({ 
				formJjId: $stateParams.formJjId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.formjj = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);