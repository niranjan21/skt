'use strict';

// Invoice controller
angular.module('invoices').controller('InvoicesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Invoices',
	function($scope, $stateParams, $location, Authentication, Invoices) {
		$scope.authentication = Authentication;

		// Create new Invoice
		$scope.create = function() {
			// Create new Invoice object
			var invoice = new Invoices ({
        
        invoiceNo: this.invoiceNo,
        
        invoiceDate: this.invoiceDate,
        
        knitter: this.knitter,
        
        jobNo: this.jobNo,
        
        date: this.date,
        
        party: this.party,
        
        deliveryNo: this.deliveryNo,
        
        deliveryDate: this.deliveryDate,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			invoice.$save(function(response) {
				$location.path('invoices/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Invoice
		$scope.remove = function(invoice) {
			if ( invoice ) { 
				invoice.$remove();

				for (var i in $scope.Invoices) {
					if ($scope.invoices [i] === invoice) {
						$scope.invoices.splice(i, 1);
					}
				}
			} else {
				$scope.invoice.$remove(function() {
					$location.path('invoices');
				});
			}
		};

		// Update existing Invoice
		$scope.update = function() {
			var invoice = $scope.invoice;

			invoice.$update(function() {
				$location.path('invoices/' + invoice._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Invoice
		$scope.find = function() {
			$scope.invoices = Invoices.query();
		};

		// Find existing Invoice
		$scope.findOne = function() {


      Invoices.get({ 
				invoiceId: $stateParams.invoiceId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.invoiceDate = moment(data.invoiceDate).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        data.deliveryDate = moment(data.deliveryDate).format('YYYY-MM-DD');
        
        
        
        
        $scope.invoice = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);