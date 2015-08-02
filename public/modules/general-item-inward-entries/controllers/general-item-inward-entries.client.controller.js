'use strict';

// GeneralItemInwardEntry controller
angular.module('general-item-inward-entries').controller('GeneralItemInwardEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'GeneralItemInwardEntries',
	function($scope, $stateParams, $location, Authentication, GeneralItemInwardEntries) {
		$scope.authentication = Authentication;

		// Create new GeneralItemInwardEntry
		$scope.create = function() {
			// Create new GeneralItemInwardEntry object
			var generaliteminwardentry = new GeneralItemInwardEntries ({
        
        grnno: this.grnno,
        
        grnyear: this.grnyear,
        
        date: this.date,
        
        ourDcno: this.ourDcno,
        
        yourDcno: this.yourDcno,
        
        receivedFrom: this.receivedFrom,
        
        sNo: this.sNo,
        
        nameoftheItem: this.nameoftheItem,
        
        uOm: this.uOm,
        
        quantity: this.quantity,
              
        created: Date.now
  
			});

			// Redirect after save
			generaliteminwardentry.$save(function(response) {
				$location.path('general-item-inward-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing GeneralItemInwardEntry
		$scope.remove = function(generaliteminwardentry) {
			if ( generaliteminwardentry ) { 
				generaliteminwardentry.$remove();

				for (var i in $scope.GeneralItemInwardEntries) {
					if ($scope.generaliteminwardentries [i] === generaliteminwardentry) {
						$scope.generaliteminwardentries.splice(i, 1);
					}
				}
			} else {
				$scope.generaliteminwardentry.$remove(function() {
					$location.path('general-item-inward-entries');
				});
			}
		};

		// Update existing GeneralItemInwardEntry
		$scope.update = function() {
			var generaliteminwardentry = $scope.generaliteminwardentry;

			generaliteminwardentry.$update(function() {
				$location.path('general-item-inward-entries/' + generaliteminwardentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of GeneralItemInwardEntry
		$scope.find = function() {
			$scope.generaliteminwardentries = GeneralItemInwardEntries.query();
		};

		// Find existing GeneralItemInwardEntry
		$scope.findOne = function() {


      GeneralItemInwardEntries.get({ 
				generalItemInwardEntryId: $stateParams.generalItemInwardEntryId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.generaliteminwardentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);