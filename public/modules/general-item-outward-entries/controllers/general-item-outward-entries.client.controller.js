'use strict';

// GeneralItemOutwardEntry controller
angular.module('general-item-outward-entries').controller('GeneralItemOutwardEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'GeneralItemOutwardEntries',
	function($scope, $stateParams, $location, Authentication, GeneralItemOutwardEntries) {
		$scope.authentication = Authentication;

		// Create new GeneralItemOutwardEntry
		$scope.create = function() {
			// Create new GeneralItemOutwardEntry object
			var generalitemoutwardentry = new GeneralItemOutwardEntries ({
        
        deliveryChalanNo: this.deliveryChalanNo,
        
        deliveryChalanYear: this.deliveryChalanYear,
        
        date: this.date,
        
        deliveryTo: this.deliveryTo,
        
        sNo: this.sNo,
        
        nameoftheItem: this.nameoftheItem,
        
        uOm: this.uOm,
        
        quantity: this.quantity,
              
        created: Date.now
  
			});

			// Redirect after save
			generalitemoutwardentry.$save(function(response) {
				$location.path('general-item-outward-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing GeneralItemOutwardEntry
		$scope.remove = function(generalitemoutwardentry) {
			if ( generalitemoutwardentry ) { 
				generalitemoutwardentry.$remove();

				for (var i in $scope.GeneralItemOutwardEntries) {
					if ($scope.generalitemoutwardentries [i] === generalitemoutwardentry) {
						$scope.generalitemoutwardentries.splice(i, 1);
					}
				}
			} else {
				$scope.generalitemoutwardentry.$remove(function() {
					$location.path('general-item-outward-entries');
				});
			}
		};

		// Update existing GeneralItemOutwardEntry
		$scope.update = function() {
			var generalitemoutwardentry = $scope.generalitemoutwardentry;

			generalitemoutwardentry.$update(function() {
				$location.path('general-item-outward-entries/' + generalitemoutwardentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of GeneralItemOutwardEntry
		$scope.find = function() {
			$scope.generalitemoutwardentries = GeneralItemOutwardEntries.query();
		};

		// Find existing GeneralItemOutwardEntry
		$scope.findOne = function() {


      GeneralItemOutwardEntries.get({ 
				generalItemOutwardEntryId: $stateParams.generalItemOutwardEntryId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.generalitemoutwardentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);