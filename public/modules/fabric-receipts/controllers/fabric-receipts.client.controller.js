'use strict';

// FabricReceipt controller
angular.module('fabric-receipts').controller('FabricReceiptsController', ['$scope', '$stateParams', '$location', 'Authentication', 'FabricReceipts',
	function($scope, $stateParams, $location, Authentication, FabricReceipts) {
		$scope.authentication = Authentication;

		// Create new FabricReceipt
		$scope.create = function() {
			// Create new FabricReceipt object
			var fabricreceipt = new FabricReceipts ({
        
        jobNo: this.jobNo,
        
        party: this.party,
        
        partyDeliveryChallanNo: this.partyDeliveryChallanNo,
        
        deliveryChallanDate: this.deliveryChallanDate,
        
        sNo: this.sNo,
        
        description: this.description,
        
        colour: this.colour,
        
        code: this.code,
        
        rate: this.rate,
        
        gSM: this.gSM,
        
        lLength: this.lLength,
        
        gG: this.gG,
        
        mill: this.mill,
        
        count: this.count,
        
        dIA: this.dIA,
        
        balanceQtyKgs: this.balanceQtyKgs,
        
        receivedQtyRoll: this.receivedQtyRoll,
        
        receivedQtyKgs: this.receivedQtyKgs,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			fabricreceipt.$save(function(response) {
				$location.path('fabric-receipts/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing FabricReceipt
		$scope.remove = function(fabricreceipt) {
			if ( fabricreceipt ) { 
				fabricreceipt.$remove();

				for (var i in $scope.FabricReceipts) {
					if ($scope.fabricreceipts [i] === fabricreceipt) {
						$scope.fabricreceipts.splice(i, 1);
					}
				}
			} else {
				$scope.fabricreceipt.$remove(function() {
					$location.path('fabric-receipts');
				});
			}
		};

		// Update existing FabricReceipt
		$scope.update = function() {
			var fabricreceipt = $scope.fabricreceipt;

			fabricreceipt.$update(function() {
				$location.path('fabric-receipts/' + fabricreceipt._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of FabricReceipt
		$scope.find = function() {
			$scope.fabricreceipts = FabricReceipts.query();
		};

		// Find existing FabricReceipt
		$scope.findOne = function() {


      FabricReceipts.get({ 
				fabricReceiptId: $stateParams.fabricReceiptId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        
        
        data.deliveryChallanDate = moment(data.deliveryChallanDate).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.fabricreceipt = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);