'use strict';

// YarnReceiptEntry controller
angular.module('yarn-receipt-entries').controller('YarnReceiptEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'YarnReceiptEntries',
	function($scope, $stateParams, $location, Authentication, YarnReceiptEntries) {
		$scope.authentication = Authentication;

		// Create new YarnReceiptEntry
		$scope.create = function() {
			// Create new YarnReceiptEntry object
			var yarnreceiptentry = new YarnReceiptEntries ({
        
        jobNo: this.jobNo,
        
        jobDate: this.jobDate,
        
        party: this.party,
        
        expectedDeliveryDate: this.expectedDeliveryDate,
        
        order: this.order,
        
        sample: this.sample,
        
        orderNo: this.orderNo,
        
        marketingBy: this.marketingBy,
        
        knitter: this.knitter,
        
        design: this.design,
        
        colour: this.colour,
        
        rate: this.rate,
        
        partyDeliveryChalanNo: this.partyDeliveryChalanNo,
        
        date: this.date,
        
        receivedVehicleNo: this.receivedVehicleNo,
        
        remarks: this.remarks,
        
        receivedBy: this.receivedBy,
        
        preparedBy: this.preparedBy,
        
        authorisedBy: this.authorisedBy,
        
        sNo: this.sNo,
        
        yarnDescription: this.yarnDescription,
        
        cones: this.cones,
        
        bags: this.bags,
        
        netKgs: this.netKgs,
        
        grossKgs: this.grossKgs,
              
        created: Date.now
  
			});

			// Redirect after save
			yarnreceiptentry.$save(function(response) {
				$location.path('yarn-receipt-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing YarnReceiptEntry
		$scope.remove = function(yarnreceiptentry) {
			if ( yarnreceiptentry ) { 
				yarnreceiptentry.$remove();

				for (var i in $scope.YarnReceiptEntries) {
					if ($scope.yarnreceiptentries [i] === yarnreceiptentry) {
						$scope.yarnreceiptentries.splice(i, 1);
					}
				}
			} else {
				$scope.yarnreceiptentry.$remove(function() {
					$location.path('yarn-receipt-entries');
				});
			}
		};

		// Update existing YarnReceiptEntry
		$scope.update = function() {
			var yarnreceiptentry = $scope.yarnreceiptentry;

			yarnreceiptentry.$update(function() {
				$location.path('yarn-receipt-entries/' + yarnreceiptentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of YarnReceiptEntry
		$scope.find = function() {
			$scope.yarnreceiptentries = YarnReceiptEntries.query();
		};

		// Find existing YarnReceiptEntry
		$scope.findOne = function() {


      YarnReceiptEntries.get({ 
				yarnReceiptEntryId: $stateParams.yarnReceiptEntryId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.jobDate = moment(data.jobDate).format('YYYY-MM-DD');
        
        
        
        
        
        data.expectedDeliveryDate = moment(data.expectedDeliveryDate).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.yarnreceiptentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);