'use strict';

// InvoiceEntry controller
angular.module('invoice-entries').controller('InvoiceEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'InvoiceEntries',
	function($scope, $stateParams, $location, Authentication, InvoiceEntries) {
		$scope.authentication = Authentication;

		// Create new InvoiceEntry
		$scope.create = function() {
			// Create new InvoiceEntry object
			var invoiceentry = new InvoiceEntries ({
        
        invoiceNo: this.invoiceNo,
        
        date: this.date,
        
        knitter: this.knitter,
        
        party: this.party,
        
        partyReference: this.partyReference,
        
        ourDcno: this.ourDcno,
        
        preparedBy: this.preparedBy,
        
        verifiedBy: this.verifiedBy,
        
        authorisedBy: this.authorisedBy,
        
        sNo: this.sNo,
        
        descriptionofGoods: this.descriptionofGoods,
        
        rolls: this.rolls,
        
        quantityInKgs: this.quantityInKgs,
        
        ratePerUnit: this.ratePerUnit,
        
        amount: this.amount,
              
        created: Date.now
  
			});

			// Redirect after save
			invoiceentry.$save(function(response) {
				$location.path('invoice-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing InvoiceEntry
		$scope.remove = function(invoiceentry) {
			if ( invoiceentry ) { 
				invoiceentry.$remove();

				for (var i in $scope.InvoiceEntries) {
					if ($scope.invoiceentries [i] === invoiceentry) {
						$scope.invoiceentries.splice(i, 1);
					}
				}
			} else {
				$scope.invoiceentry.$remove(function() {
					$location.path('invoice-entries');
				});
			}
		};

		// Update existing InvoiceEntry
		$scope.update = function() {
			var invoiceentry = $scope.invoiceentry;

			invoiceentry.$update(function() {
				$location.path('invoice-entries/' + invoiceentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of InvoiceEntry
		$scope.find = function() {
			$scope.invoiceentries = InvoiceEntries.query();
		};

		// Find existing InvoiceEntry
		$scope.findOne = function() {


      InvoiceEntries.get({ 
				invoiceEntryId: $stateParams.invoiceEntryId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.invoiceentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);