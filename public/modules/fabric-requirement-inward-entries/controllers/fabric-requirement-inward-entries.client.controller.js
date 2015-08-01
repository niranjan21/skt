'use strict';

// FabricRequirementInwardEntry controller
angular.module('fabric-requirement-inward-entries').controller('FabricRequirementInwardEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'FabricRequirementInwardEntries',
	function($scope, $stateParams, $location, Authentication, FabricRequirementInwardEntries) {
		$scope.authentication = Authentication;

		// Create new FabricRequirementInwardEntry
		$scope.create = function() {
			// Create new FabricRequirementInwardEntry object
			var fabricrequirementinwardentry = new FabricRequirementInwardEntries ({
        
        jobNo: this.jobNo,
        
        date: this.date,
        
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
        
        gsm: this.gsm,
        
        lineLength: this.lineLength,
        
        gg: this.gg,
        
        mill: this.mill,
        
        count: this.count,
        
        sNo: this.sNo,
        
        dia: this.dia,
        
        requiredQuantity: this.requiredQuantity,
        
        machineNo: this.machineNo,
              
        created: Date.now
  
			});

			// Redirect after save
			fabricrequirementinwardentry.$save(function(response) {
				$location.path('fabric-requirement-inward-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing FabricRequirementInwardEntry
		$scope.remove = function(fabricrequirementinwardentry) {
			if ( fabricrequirementinwardentry ) { 
				fabricrequirementinwardentry.$remove();

				for (var i in $scope.FabricRequirementInwardEntries) {
					if ($scope.fabricrequirementinwardentries [i] === fabricrequirementinwardentry) {
						$scope.fabricrequirementinwardentries.splice(i, 1);
					}
				}
			} else {
				$scope.fabricrequirementinwardentry.$remove(function() {
					$location.path('fabric-requirement-inward-entries');
				});
			}
		};

		// Update existing FabricRequirementInwardEntry
		$scope.update = function() {
			var fabricrequirementinwardentry = $scope.fabricrequirementinwardentry;

			fabricrequirementinwardentry.$update(function() {
				$location.path('fabric-requirement-inward-entries/' + fabricrequirementinwardentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of FabricRequirementInwardEntry
		$scope.find = function() {
			$scope.fabricrequirementinwardentries = FabricRequirementInwardEntries.query();
		};

		// Find existing FabricRequirementInwardEntry
		$scope.findOne = function() {


      FabricRequirementInwardEntries.get({ 
				fabricRequirementInwardEntryId: $stateParams.fabricRequirementInwardEntryId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        data.expectedDeliveryDate = moment(data.expectedDeliveryDate).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.fabricrequirementinwardentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);