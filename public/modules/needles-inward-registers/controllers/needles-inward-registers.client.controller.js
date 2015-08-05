'use strict';

// NeedlesInwardRegister controller
angular.module('needles-inward-registers').controller('NeedlesInwardRegistersController', ['$scope', '$stateParams', '$location', 'Authentication', 'NeedlesInwardRegisters',
	function($scope, $stateParams, $location, Authentication, NeedlesInwardRegisters) {
		$scope.authentication = Authentication;

		// Create new NeedlesInwardRegister
		$scope.create = function() {
			// Create new NeedlesInwardRegister object
			var needlesinwardregister = new NeedlesInwardRegisters ({
        
        receiptNo: this.receiptNo,
        
        date: this.date,
        
        party: this.party,
        
        deliveryChallanNo: this.deliveryChallanNo,
        
        itemDescription: this.itemDescription,
        
        receivedQuantity: this.receivedQuantity,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			needlesinwardregister.$save(function(response) {
				$location.path('needles-inward-registers/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing NeedlesInwardRegister
		$scope.remove = function(needlesinwardregister) {
			if ( needlesinwardregister ) { 
				needlesinwardregister.$remove();

				for (var i in $scope.NeedlesInwardRegisters) {
					if ($scope.needlesinwardregisters [i] === needlesinwardregister) {
						$scope.needlesinwardregisters.splice(i, 1);
					}
				}
			} else {
				$scope.needlesinwardregister.$remove(function() {
					$location.path('needles-inward-registers');
				});
			}
		};

		// Update existing NeedlesInwardRegister
		$scope.update = function() {
			var needlesinwardregister = $scope.needlesinwardregister;

			needlesinwardregister.$update(function() {
				$location.path('needles-inward-registers/' + needlesinwardregister._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of NeedlesInwardRegister
		$scope.find = function() {
			$scope.needlesinwardregisters = NeedlesInwardRegisters.query();
		};

		// Find existing NeedlesInwardRegister
		$scope.findOne = function() {


      NeedlesInwardRegisters.get({ 
				needlesInwardRegisterId: $stateParams.needlesInwardRegisterId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.needlesinwardregister = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);