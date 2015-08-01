'use strict';

// YarnReturnEntry controller
angular.module('yarn-return-entries').controller('YarnReturnEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'YarnReturnEntries',
	function($scope, $stateParams, $location, Authentication, YarnReturnEntries) {
		$scope.authentication = Authentication;

		// Create new YarnReturnEntry
		$scope.create = function() {
			// Create new YarnReturnEntry object
			var yarnreturnentry = new YarnReturnEntries ({
        
        returnDeliveryChalanNo: this.returnDeliveryChalanNo,
        
        returnDeliveryChalanDate: this.returnDeliveryChalanDate,
        
        jobNo: this.jobNo,
        
        jobDate: this.jobDate,
        
        knitter: this.knitter,
        
        party: this.party,
        
        partyDeliveryChalanNo: this.partyDeliveryChalanNo,
        
        date: this.date,
        
        vehicleNo: this.vehicleNo,
        
        remarks: this.remarks,
        
        mistakeClotheKgs: this.mistakeClotheKgs,
        
        sNo: this.sNo,
        
        yarnDescription: this.yarnDescription,
        
        receivedBags: this.receivedBags,
        
        receivedWeightKgs: this.receivedWeightKgs,
        
        returnCones: this.returnCones,
        
        returnBags: this.returnBags,
        
        returnKgsNet: this.returnKgsNet,
        
        returnKgsGross: this.returnKgsGross,
              
        created: Date.now
  
			});

			// Redirect after save
			yarnreturnentry.$save(function(response) {
				$location.path('yarn-return-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing YarnReturnEntry
		$scope.remove = function(yarnreturnentry) {
			if ( yarnreturnentry ) { 
				yarnreturnentry.$remove();

				for (var i in $scope.YarnReturnEntries) {
					if ($scope.yarnreturnentries [i] === yarnreturnentry) {
						$scope.yarnreturnentries.splice(i, 1);
					}
				}
			} else {
				$scope.yarnreturnentry.$remove(function() {
					$location.path('yarn-return-entries');
				});
			}
		};

		// Update existing YarnReturnEntry
		$scope.update = function() {
			var yarnreturnentry = $scope.yarnreturnentry;

			yarnreturnentry.$update(function() {
				$location.path('yarn-return-entries/' + yarnreturnentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of YarnReturnEntry
		$scope.find = function() {
			$scope.yarnreturnentries = YarnReturnEntries.query();
		};

		// Find existing YarnReturnEntry
		$scope.findOne = function() {


      YarnReturnEntries.get({ 
				yarnReturnEntryId: $stateParams.yarnReturnEntryId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.returnDeliveryChalanDate = moment(data.returnDeliveryChalanDate).format('YYYY-MM-DD');
        
        
        
        
        
        data.jobDate = moment(data.jobDate).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.yarnreturnentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);