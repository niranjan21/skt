'use strict';

// GeneralInvoiceRegister controller
angular.module('general-invoice-registers').controller('GeneralInvoiceRegistersController', ['$scope', '$stateParams', '$location', 'Authentication', 'GeneralInvoiceRegisters',
	function($scope, $stateParams, $location, Authentication, GeneralInvoiceRegisters) {
		$scope.authentication = Authentication;

		// Create new GeneralInvoiceRegister
		$scope.create = function() {
			// Create new GeneralInvoiceRegister object
			var generalinvoiceregister = new GeneralInvoiceRegisters ({
        
        invoiceNo: this.invoiceNo,
        
        date: this.date,
        
        party: this.party,
        
        amount: this.amount,
              
        created: Date.now
  
			});

			// Redirect after save
			generalinvoiceregister.$save(function(response) {
				$location.path('general-invoice-registers/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing GeneralInvoiceRegister
		$scope.remove = function(generalinvoiceregister) {
			if ( generalinvoiceregister ) { 
				generalinvoiceregister.$remove();

				for (var i in $scope.GeneralInvoiceRegisters) {
					if ($scope.generalinvoiceregisters [i] === generalinvoiceregister) {
						$scope.generalinvoiceregisters.splice(i, 1);
					}
				}
			} else {
				$scope.generalinvoiceregister.$remove(function() {
					$location.path('general-invoice-registers');
				});
			}
		};

		// Update existing GeneralInvoiceRegister
		$scope.update = function() {
			var generalinvoiceregister = $scope.generalinvoiceregister;

			generalinvoiceregister.$update(function() {
				$location.path('general-invoice-registers/' + generalinvoiceregister._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of GeneralInvoiceRegister
		$scope.find = function() {
			$scope.generalinvoiceregisters = GeneralInvoiceRegisters.query();
		};

		// Find existing GeneralInvoiceRegister
		$scope.findOne = function() {


      GeneralInvoiceRegisters.get({ 
				generalInvoiceRegisterId: $stateParams.generalInvoiceRegisterId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        $scope.generalinvoiceregister = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);