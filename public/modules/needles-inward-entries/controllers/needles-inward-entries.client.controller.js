'use strict';

// NeedlesInwardEntry controller
angular.module('needles-inward-entries').controller('NeedlesInwardEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'NeedlesInwardEntries',
	function($scope, $stateParams, $location, Authentication, NeedlesInwardEntries) {
		$scope.authentication = Authentication;

		// Create new NeedlesInwardEntry
		$scope.create = function() {
			// Create new NeedlesInwardEntry object
			var needlesinwardentry = new NeedlesInwardEntries ({
        
        invoiceNo: this.invoiceNo,
        
        date: this.date,
        
        deliveryChalanNo: this.deliveryChalanNo,
        
        localorImport: this.localorImport,
        
        party: this.party,
        
        knitter: this.knitter,
        
        sno: this.sno,
        
        typeofNeedle: this.typeofNeedle,
        
        stock: this.stock,
        
        received: this.received,
              
        created: Date.now
  
			});

			// Redirect after save
			needlesinwardentry.$save(function(response) {
				$location.path('needles-inward-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing NeedlesInwardEntry
		$scope.remove = function(needlesinwardentry) {
			if ( needlesinwardentry ) { 
				needlesinwardentry.$remove();

				for (var i in $scope.NeedlesInwardEntries) {
					if ($scope.needlesinwardentries [i] === needlesinwardentry) {
						$scope.needlesinwardentries.splice(i, 1);
					}
				}
			} else {
				$scope.needlesinwardentry.$remove(function() {
					$location.path('needles-inward-entries');
				});
			}
		};

		// Update existing NeedlesInwardEntry
		$scope.update = function() {
			var needlesinwardentry = $scope.needlesinwardentry;

			needlesinwardentry.$update(function() {
				$location.path('needles-inward-entries/' + needlesinwardentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of NeedlesInwardEntry
		$scope.find = function() {
			$scope.needlesinwardentries = NeedlesInwardEntries.query();
		};

		// Find existing NeedlesInwardEntry
		$scope.findOne = function() {


      NeedlesInwardEntries.get({ 
				needlesInwardEntryId: $stateParams.needlesInwardEntryId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.needlesinwardentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);