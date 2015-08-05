'use strict';

// ItemInclusion controller
angular.module('item-inclusions').controller('ItemInclusionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'ItemInclusions',
	function($scope, $stateParams, $location, Authentication, ItemInclusions) {
		$scope.authentication = Authentication;

		// Create new ItemInclusion
		$scope.create = function() {
			// Create new ItemInclusion object
			var iteminclusion = new ItemInclusions ({
        
        jobNo: this.jobNo,
        
        date: this.date,
        
        party: this.party,
        
        orderNo: this.orderNo,
        
        sNo: this.sNo,
        
        itemDescription: this.itemDescription,
        
        bags: this.bags,
        
        netKgs: this.netKgs,
        
        grossKgs: this.grossKgs,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			iteminclusion.$save(function(response) {
				$location.path('item-inclusions/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing ItemInclusion
		$scope.remove = function(iteminclusion) {
			if ( iteminclusion ) { 
				iteminclusion.$remove();

				for (var i in $scope.ItemInclusions) {
					if ($scope.iteminclusions [i] === iteminclusion) {
						$scope.iteminclusions.splice(i, 1);
					}
				}
			} else {
				$scope.iteminclusion.$remove(function() {
					$location.path('item-inclusions');
				});
			}
		};

		// Update existing ItemInclusion
		$scope.update = function() {
			var iteminclusion = $scope.iteminclusion;

			iteminclusion.$update(function() {
				$location.path('item-inclusions/' + iteminclusion._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of ItemInclusion
		$scope.find = function() {
			$scope.iteminclusions = ItemInclusions.query();
		};

		// Find existing ItemInclusion
		$scope.findOne = function() {


      ItemInclusions.get({ 
				itemInclusionId: $stateParams.itemInclusionId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.iteminclusion = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);