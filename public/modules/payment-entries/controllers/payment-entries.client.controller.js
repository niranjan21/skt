'use strict';

// PaymentEntry controller
angular.module('payment-entries').controller('PaymentEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'PaymentEntries',
	function($scope, $stateParams, $location, Authentication, PaymentEntries) {
		$scope.authentication = Authentication;

		// Create new PaymentEntry
		$scope.create = function() {
			// Create new PaymentEntry object
			var paymententry = new PaymentEntries ({
        
        journalNo: this.journalNo,
        
        journalDate: this.journalDate,
        
        party: this.party,
        
        knitter: this.knitter,
        
        amount: this.amount,
        
        mode: this.mode,
        
        by: this.by,
        
        number: this.number,
        
        date: this.date,
        
        drawnOn: this.drawnOn,
        
        remarks: this.remarks,
        
        receivedBy: this.receivedBy,
        
        preparedBy: this.preparedBy,
        
        authorisedBy: this.authorisedBy,
              
        created: Date.now
  
			});

			// Redirect after save
			paymententry.$save(function(response) {
				$location.path('payment-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing PaymentEntry
		$scope.remove = function(paymententry) {
			if ( paymententry ) { 
				paymententry.$remove();

				for (var i in $scope.PaymentEntries) {
					if ($scope.paymententries [i] === paymententry) {
						$scope.paymententries.splice(i, 1);
					}
				}
			} else {
				$scope.paymententry.$remove(function() {
					$location.path('payment-entries');
				});
			}
		};

		// Update existing PaymentEntry
		$scope.update = function() {
			var paymententry = $scope.paymententry;

			paymententry.$update(function() {
				$location.path('payment-entries/' + paymententry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of PaymentEntry
		$scope.find = function() {
			$scope.paymententries = PaymentEntries.query();
		};

		// Find existing PaymentEntry
		$scope.findOne = function() {


      PaymentEntries.get({ 
				paymentEntryId: $stateParams.paymentEntryId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.journalDate = moment(data.journalDate).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.paymententry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);