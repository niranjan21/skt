'use strict';

// FabricReturnEntry controller
angular.module('fabric-return-entries').controller('FabricReturnEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'FabricReturnEntries',
	function($scope, $stateParams, $location, Authentication, FabricReturnEntries) {
		$scope.authentication = Authentication;

		// Create new FabricReturnEntry
		$scope.create = function() {
			// Create new FabricReturnEntry object
			var fabricreturnentry = new FabricReturnEntries ({
        
        deliveryChalanNo: this.deliveryChalanNo,
        
        deliveryChalanDate: this.deliveryChalanDate,
        
        knitter: this.knitter,
        
        jobNo: this.jobNo,
        
        jobDate: this.jobDate,
        
        party: this.party,
        
        fabric: this.fabric,
        
        gsm: this.gsm,
        
        kgs: this.kgs,
        
        partyDeliveryChalanNo: this.partyDeliveryChalanNo,
        
        date: this.date,
        
        remarks: this.remarks,
        
        dia: this.dia,
        
        stockRolls: this.stockRolls,
        
        stockKgs: this.stockKgs,
        
        deliveryRolls: this.deliveryRolls,
        
        deliveryKgs: this.deliveryKgs,
              
        created: Date.now
  
			});

			// Redirect after save
			fabricreturnentry.$save(function(response) {
				$location.path('fabric-return-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing FabricReturnEntry
		$scope.remove = function(fabricreturnentry) {
			if ( fabricreturnentry ) { 
				fabricreturnentry.$remove();

				for (var i in $scope.FabricReturnEntries) {
					if ($scope.fabricreturnentries [i] === fabricreturnentry) {
						$scope.fabricreturnentries.splice(i, 1);
					}
				}
			} else {
				$scope.fabricreturnentry.$remove(function() {
					$location.path('fabric-return-entries');
				});
			}
		};

		// Update existing FabricReturnEntry
		$scope.update = function() {
			var fabricreturnentry = $scope.fabricreturnentry;

			fabricreturnentry.$update(function() {
				$location.path('fabric-return-entries/' + fabricreturnentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of FabricReturnEntry
		$scope.find = function() {
			$scope.fabricreturnentries = FabricReturnEntries.query();
		};

		// Find existing FabricReturnEntry
		$scope.findOne = function() {


      FabricReturnEntries.get({ 
				fabricReturnEntryId: $stateParams.fabricReturnEntryId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.deliveryChalanDate = moment(data.deliveryChalanDate).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        data.jobDate = moment(data.jobDate).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.fabricreturnentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);