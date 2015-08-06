'use strict';

// InwardEntry controller
angular.module('inward-entries').controller('InwardEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'InwardEntries',
	function($scope, $stateParams, $location, Authentication, InwardEntries) {
		$scope.authentication = Authentication;

		// Create new InwardEntry
		$scope.create = function() {
			// Create new InwardEntry object
			var inwardentry = new InwardEntries ({
        
        receivedFrom: this.receivedFrom,
        
        grnno: this.grnno,
        
        date: this.date,
        
        deliveryChallanNo: this.deliveryChallanNo,
        
        sNo: this.sNo,
        
        nameoftheItem: this.nameoftheItem,
        
        uom: this.uom,
        
        rate: this.rate,
        
        received: this.received,
        
        jobNo: this.jobNo,
              
        created: Date.now
  
			});

			// Redirect after save
			inwardentry.$save(function(response) {
				$location.path('inward-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing InwardEntry
		$scope.remove = function(inwardentry) {
			if ( inwardentry ) { 
				inwardentry.$remove();

				for (var i in $scope.InwardEntries) {
					if ($scope.inwardentries [i] === inwardentry) {
						$scope.inwardentries.splice(i, 1);
					}
				}
			} else {
				$scope.inwardentry.$remove(function() {
					$location.path('inward-entries');
				});
			}
		};

		// Update existing InwardEntry
		$scope.update = function() {
			var inwardentry = $scope.inwardentry;

			inwardentry.$update(function() {
				$location.path('inward-entries/' + inwardentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of InwardEntry
		$scope.find = function() {
			$scope.inwardentries = InwardEntries.query();
		};

		// Find existing InwardEntry
		$scope.findOne = function() {


      InwardEntries.get({ 
				inwardEntryId: $stateParams.inwardEntryId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.inwardentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);