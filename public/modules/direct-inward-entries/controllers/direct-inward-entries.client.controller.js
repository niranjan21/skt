'use strict';

// DirectInwardEntry controller
angular.module('direct-inward-entries').controller('DirectInwardEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'DirectInwardEntries',
	function($scope, $stateParams, $location, Authentication, DirectInwardEntries) {
		$scope.authentication = Authentication;

		// Create new DirectInwardEntry
		$scope.create = function() {
			// Create new DirectInwardEntry object
			var directinwardentry = new DirectInwardEntries ({
        
        knitter: this.knitter,
        
        grnno: this.grnno,
        
        grnyear: this.grnyear,
        
        date: this.date,
        
        inwardFrom: this.inwardFrom,
        
        returnable: this.returnable,
        
        nonReturnable: this.nonReturnable,
        
        ourReference: this.ourReference,
        
        partyReference: this.partyReference,
        
        vehicle: this.vehicle,
        
        sNo: this.sNo,
        
        nameoftheItem: this.nameoftheItem,
        
        uOm: this.uOm,
        
        quantity: this.quantity,
              
        created: Date.now
  
			});

			// Redirect after save
			directinwardentry.$save(function(response) {
				$location.path('direct-inward-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing DirectInwardEntry
		$scope.remove = function(directinwardentry) {
			if ( directinwardentry ) { 
				directinwardentry.$remove();

				for (var i in $scope.DirectInwardEntries) {
					if ($scope.directinwardentries [i] === directinwardentry) {
						$scope.directinwardentries.splice(i, 1);
					}
				}
			} else {
				$scope.directinwardentry.$remove(function() {
					$location.path('direct-inward-entries');
				});
			}
		};

		// Update existing DirectInwardEntry
		$scope.update = function() {
			var directinwardentry = $scope.directinwardentry;

			directinwardentry.$update(function() {
				$location.path('direct-inward-entries/' + directinwardentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of DirectInwardEntry
		$scope.find = function() {
			$scope.directinwardentries = DirectInwardEntries.query();
		};

		// Find existing DirectInwardEntry
		$scope.findOne = function() {


      DirectInwardEntries.get({ 
				directInwardEntryId: $stateParams.directInwardEntryId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.directinwardentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);