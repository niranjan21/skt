'use strict';

// GeneralItemOutwardRegister controller
angular.module('general-item-outward-registers').controller('GeneralItemOutwardRegistersController', ['$scope', '$stateParams', '$location', 'Authentication', 'GeneralItemOutwardRegisters',
	function($scope, $stateParams, $location, Authentication, GeneralItemOutwardRegisters) {
		$scope.authentication = Authentication;

		// Create new GeneralItemOutwardRegister
		$scope.create = function() {
			// Create new GeneralItemOutwardRegister object
			var generalitemoutwardregister = new GeneralItemOutwardRegisters ({
        
        deliveryChalanNo: this.deliveryChalanNo,
        
        date: this.date,
        
        jobNo: this.jobNo,
        
        sentTo: this.sentTo,
        
        itemDescription: this.itemDescription,
        
        quantity: this.quantity,
        
        uOm: this.uOm,
              
        created: Date.now
  
			});

			// Redirect after save
			generalitemoutwardregister.$save(function(response) {
				$location.path('general-item-outward-registers/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing GeneralItemOutwardRegister
		$scope.remove = function(generalitemoutwardregister) {
			if ( generalitemoutwardregister ) { 
				generalitemoutwardregister.$remove();

				for (var i in $scope.GeneralItemOutwardRegisters) {
					if ($scope.generalitemoutwardregisters [i] === generalitemoutwardregister) {
						$scope.generalitemoutwardregisters.splice(i, 1);
					}
				}
			} else {
				$scope.generalitemoutwardregister.$remove(function() {
					$location.path('general-item-outward-registers');
				});
			}
		};

		// Update existing GeneralItemOutwardRegister
		$scope.update = function() {
			var generalitemoutwardregister = $scope.generalitemoutwardregister;

			generalitemoutwardregister.$update(function() {
				$location.path('general-item-outward-registers/' + generalitemoutwardregister._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of GeneralItemOutwardRegister
		$scope.find = function() {
			$scope.generalitemoutwardregisters = GeneralItemOutwardRegisters.query();
		};

		// Find existing GeneralItemOutwardRegister
		$scope.findOne = function() {


      GeneralItemOutwardRegisters.get({ 
				generalItemOutwardRegisterId: $stateParams.generalItemOutwardRegisterId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.generalitemoutwardregister = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);