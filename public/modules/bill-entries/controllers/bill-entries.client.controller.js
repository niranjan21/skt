'use strict';

// BillEntry controller
angular.module('bill-entries').controller('BillEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'BillEntries',
	function($scope, $stateParams, $location, Authentication, BillEntries) {
		$scope.authentication = Authentication;

		// Create new BillEntry
		$scope.create = function() {
			// Create new BillEntry object
			var billentry = new BillEntries ({
        
        outsideKnitter: this.outsideKnitter,
        
        billNo: this.billNo,
        
        billDate: this.billDate,
        
        jobNo: this.jobNo,
        
        amount: this.amount,
        
        partyDeliveryChallanNo: this.partyDeliveryChallanNo,
        
        date: this.date,
        
        inwardKgs: this.inwardKgs,
        
        include: this.include,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			billentry.$save(function(response) {
				$location.path('bill-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing BillEntry
		$scope.remove = function(billentry) {
			if ( billentry ) { 
				billentry.$remove();

				for (var i in $scope.BillEntries) {
					if ($scope.billentries [i] === billentry) {
						$scope.billentries.splice(i, 1);
					}
				}
			} else {
				$scope.billentry.$remove(function() {
					$location.path('bill-entries');
				});
			}
		};

		// Update existing BillEntry
		$scope.update = function() {
			var billentry = $scope.billentry;

			billentry.$update(function() {
				$location.path('bill-entries/' + billentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of BillEntry
		$scope.find = function() {
			$scope.billentries = BillEntries.query();
		};

		// Find existing BillEntry
		$scope.findOne = function() {


      BillEntries.get({ 
				billEntryId: $stateParams.billEntryId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        data.billDate = moment(data.billDate).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        $scope.billentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);