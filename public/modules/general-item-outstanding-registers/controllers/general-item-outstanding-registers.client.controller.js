'use strict';

// GeneralItemOutstandingRegister controller
angular.module('general-item-outstanding-registers').controller('GeneralItemOutstandingRegistersController', ['$scope', '$stateParams', '$location', 'Authentication', 'GeneralItemOutstandingRegisters',
	function($scope, $stateParams, $location, Authentication, GeneralItemOutstandingRegisters) {
		$scope.authentication = Authentication;

		// Create new GeneralItemOutstandingRegister
		$scope.create = function() {
			// Create new GeneralItemOutstandingRegister object
			var generalitemoutstandingregister = new GeneralItemOutstandingRegisters ({
        
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
			generalitemoutstandingregister.$save(function(response) {
				$location.path('general-item-outstanding-registers/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing GeneralItemOutstandingRegister
		$scope.remove = function(generalitemoutstandingregister) {
			if ( generalitemoutstandingregister ) { 
				generalitemoutstandingregister.$remove();

				for (var i in $scope.GeneralItemOutstandingRegisters) {
					if ($scope.generalitemoutstandingregisters [i] === generalitemoutstandingregister) {
						$scope.generalitemoutstandingregisters.splice(i, 1);
					}
				}
			} else {
				$scope.generalitemoutstandingregister.$remove(function() {
					$location.path('general-item-outstanding-registers');
				});
			}
		};

		// Update existing GeneralItemOutstandingRegister
		$scope.update = function() {
			var generalitemoutstandingregister = $scope.generalitemoutstandingregister;

			generalitemoutstandingregister.$update(function() {
				$location.path('general-item-outstanding-registers/' + generalitemoutstandingregister._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of GeneralItemOutstandingRegister
		$scope.find = function() {
			$scope.generalitemoutstandingregisters = GeneralItemOutstandingRegisters.query();
		};

		// Find existing GeneralItemOutstandingRegister
		$scope.findOne = function() {


      GeneralItemOutstandingRegisters.get({ 
				generalItemOutstandingRegisterId: $stateParams.generalItemOutstandingRegisterId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.generalitemoutstandingregister = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);