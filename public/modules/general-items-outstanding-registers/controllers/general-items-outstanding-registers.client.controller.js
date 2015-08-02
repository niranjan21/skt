'use strict';

// GeneralItemsOutstandingRegister controller
angular.module('general-items-outstanding-registers').controller('GeneralItemsOutstandingRegistersController', ['$scope', '$stateParams', '$location', 'Authentication', 'GeneralItemsOutstandingRegisters',
	function($scope, $stateParams, $location, Authentication, GeneralItemsOutstandingRegisters) {
		$scope.authentication = Authentication;

		// Create new GeneralItemsOutstandingRegister
		$scope.create = function() {
			// Create new GeneralItemsOutstandingRegister object
			var generalitemsoutstandingregister = new GeneralItemsOutstandingRegisters ({
        
        deliveryChalanNo: this.deliveryChalanNo,
        
        date: this.date,
        
        jobNo: this.jobNo,
        
        sentTo: this.sentTo,
        
        itemDescription: this.itemDescription,
        
        balanceQty: this.balanceQty,
        
        uOm: this.uOm,
              
        created: Date.now
  
			});

			// Redirect after save
			generalitemsoutstandingregister.$save(function(response) {
				$location.path('general-items-outstanding-registers/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing GeneralItemsOutstandingRegister
		$scope.remove = function(generalitemsoutstandingregister) {
			if ( generalitemsoutstandingregister ) { 
				generalitemsoutstandingregister.$remove();

				for (var i in $scope.GeneralItemsOutstandingRegisters) {
					if ($scope.generalitemsoutstandingregisters [i] === generalitemsoutstandingregister) {
						$scope.generalitemsoutstandingregisters.splice(i, 1);
					}
				}
			} else {
				$scope.generalitemsoutstandingregister.$remove(function() {
					$location.path('general-items-outstanding-registers');
				});
			}
		};

		// Update existing GeneralItemsOutstandingRegister
		$scope.update = function() {
			var generalitemsoutstandingregister = $scope.generalitemsoutstandingregister;

			generalitemsoutstandingregister.$update(function() {
				$location.path('general-items-outstanding-registers/' + generalitemsoutstandingregister._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of GeneralItemsOutstandingRegister
		$scope.find = function() {
			$scope.generalitemsoutstandingregisters = GeneralItemsOutstandingRegisters.query();
		};

		// Find existing GeneralItemsOutstandingRegister
		$scope.findOne = function() {


      GeneralItemsOutstandingRegisters.get({ 
				generalItemsOutstandingRegisterId: $stateParams.generalItemsOutstandingRegisterId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.generalitemsoutstandingregister = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);