'use strict';

// OutwardEntry controller
angular.module('outward-entries').controller('OutwardEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'OutwardEntries',
	function($scope, $stateParams, $location, Authentication, OutwardEntries) {
		$scope.authentication = Authentication;

		// Create new OutwardEntry
		$scope.create = function() {
			// Create new OutwardEntry object
			var outwardentry = new OutwardEntries ({
        
        deliveryTo: this.deliveryTo,
        
        deliveryChalanNo: this.deliveryChalanNo,
        
        date: this.date,
        
        receiver: this.receiver,
        
        sNo: this.sNo,
        
        nameOfTheItem: this.nameOfTheItem,
        
        uOm: this.uOm,
        
        issued: this.issued,
        
        jobNo: this.jobNo,
              
        created: Date.now
  
			});

			// Redirect after save
			outwardentry.$save(function(response) {
				$location.path('outward-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing OutwardEntry
		$scope.remove = function(outwardentry) {
			if ( outwardentry ) { 
				outwardentry.$remove();

				for (var i in $scope.OutwardEntries) {
					if ($scope.outwardentries [i] === outwardentry) {
						$scope.outwardentries.splice(i, 1);
					}
				}
			} else {
				$scope.outwardentry.$remove(function() {
					$location.path('outward-entries');
				});
			}
		};

		// Update existing OutwardEntry
		$scope.update = function() {
			var outwardentry = $scope.outwardentry;

			outwardentry.$update(function() {
				$location.path('outward-entries/' + outwardentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of OutwardEntry
		$scope.find = function() {
			$scope.outwardentries = OutwardEntries.query();
		};

		// Find existing OutwardEntry
		$scope.findOne = function() {


      OutwardEntries.get({ 
				outwardEntryId: $stateParams.outwardEntryId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.outwardentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);