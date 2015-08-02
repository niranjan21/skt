'use strict';

// DirectOutwardEntry controller
angular.module('direct-outward-entries').controller('DirectOutwardEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'DirectOutwardEntries',
	function($scope, $stateParams, $location, Authentication, DirectOutwardEntries) {
		$scope.authentication = Authentication;

		// Create new DirectOutwardEntry
		$scope.create = function() {
			// Create new DirectOutwardEntry object
			var directoutwardentry = new DirectOutwardEntries ({
        
        deliveryChalanNo: this.deliveryChalanNo,
        
        deliveryChalanYear: this.deliveryChalanYear,
        
        date: this.date,
        
        ourGrnno: this.ourGrnno,
        
        inwardFrom: this.inwardFrom,
        
        sNo: this.sNo,
        
        nameoftheItem: this.nameoftheItem,
        
        uOm: this.uOm,
        
        quantity: this.quantity,
              
        created: Date.now
  
			});

			// Redirect after save
			directoutwardentry.$save(function(response) {
				$location.path('direct-outward-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing DirectOutwardEntry
		$scope.remove = function(directoutwardentry) {
			if ( directoutwardentry ) { 
				directoutwardentry.$remove();

				for (var i in $scope.DirectOutwardEntries) {
					if ($scope.directoutwardentries [i] === directoutwardentry) {
						$scope.directoutwardentries.splice(i, 1);
					}
				}
			} else {
				$scope.directoutwardentry.$remove(function() {
					$location.path('direct-outward-entries');
				});
			}
		};

		// Update existing DirectOutwardEntry
		$scope.update = function() {
			var directoutwardentry = $scope.directoutwardentry;

			directoutwardentry.$update(function() {
				$location.path('direct-outward-entries/' + directoutwardentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of DirectOutwardEntry
		$scope.find = function() {
			$scope.directoutwardentries = DirectOutwardEntries.query();
		};

		// Find existing DirectOutwardEntry
		$scope.findOne = function() {


      DirectOutwardEntries.get({ 
				directOutwardEntryId: $stateParams.directOutwardEntryId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.directoutwardentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);