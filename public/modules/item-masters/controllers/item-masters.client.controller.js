'use strict';

// ItemMaster controller
angular.module('item-masters').controller('ItemMastersController', ['$scope', '$stateParams', '$location', 'Authentication', 'ItemMasters',
	function($scope, $stateParams, $location, Authentication, ItemMasters) {
		$scope.authentication = Authentication;

		// Create new ItemMaster
		$scope.create = function() {
			// Create new ItemMaster object
			var itemmaster = new ItemMasters ({
        
        itemCode: this.itemCode,
        
        nameOfTheItem: this.nameOfTheItem,
        
        uOm: this.uOm,
        
        unitRate: this.unitRate,
        
        openingBalance: this.openingBalance,
        
        type: this.type,
              
        created: Date.now
  
			});

			// Redirect after save
			itemmaster.$save(function(response) {
				$location.path('item-masters/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing ItemMaster
		$scope.remove = function(itemmaster) {
			if ( itemmaster ) { 
				itemmaster.$remove();

				for (var i in $scope.ItemMasters) {
					if ($scope.itemmasters [i] === itemmaster) {
						$scope.itemmasters.splice(i, 1);
					}
				}
			} else {
				$scope.itemmaster.$remove(function() {
					$location.path('item-masters');
				});
			}
		};

		// Update existing ItemMaster
		$scope.update = function() {
			var itemmaster = $scope.itemmaster;

			itemmaster.$update(function() {
				$location.path('item-masters/' + itemmaster._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of ItemMaster
		$scope.find = function() {
			$scope.itemmasters = ItemMasters.query();
		};

		// Find existing ItemMaster
		$scope.findOne = function() {


      ItemMasters.get({ 
				itemMasterId: $stateParams.itemMasterId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.itemmaster = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);