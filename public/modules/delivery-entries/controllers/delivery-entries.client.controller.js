'use strict';

// DeliveryEntry controller
angular.module('delivery-entries').controller('DeliveryEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'DeliveryEntries',
	function($scope, $stateParams, $location, Authentication, DeliveryEntries) {
		$scope.authentication = Authentication;

		// Create new DeliveryEntry
		$scope.create = function() {
			// Create new DeliveryEntry object
			var deliveryentry = new DeliveryEntries ({
        
        deliveryChallanNo: this.deliveryChallanNo,
        
        date: this.date,
        
        knitter: this.knitter,
        
        jobNo: this.jobNo,
        
        jobDate: this.jobDate,
        
        party: this.party,
        
        fabric: this.fabric,
        
        gsm: this.gsm,
        
        kgs: this.kgs,
        
        dia: this.dia,
        
        stockRolls: this.stockRolls,
        
        stockKgs: this.stockKgs,
        
        deliveryRolls: this.deliveryRolls,
        
        deliveryKgs: this.deliveryKgs,
              
        created: Date.now
  
			});

			// Redirect after save
			deliveryentry.$save(function(response) {
				$location.path('delivery-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing DeliveryEntry
		$scope.remove = function(deliveryentry) {
			if ( deliveryentry ) { 
				deliveryentry.$remove();

				for (var i in $scope.DeliveryEntries) {
					if ($scope.deliveryentries [i] === deliveryentry) {
						$scope.deliveryentries.splice(i, 1);
					}
				}
			} else {
				$scope.deliveryentry.$remove(function() {
					$location.path('delivery-entries');
				});
			}
		};

		// Update existing DeliveryEntry
		$scope.update = function() {
			var deliveryentry = $scope.deliveryentry;

			deliveryentry.$update(function() {
				$location.path('delivery-entries/' + deliveryentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of DeliveryEntry
		$scope.find = function() {
			$scope.deliveryentries = DeliveryEntries.query();
		};

		// Find existing DeliveryEntry
		$scope.findOne = function() {


      DeliveryEntries.get({ 
				deliveryEntryId: $stateParams.deliveryEntryId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        data.jobDate = moment(data.jobDate).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.deliveryentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);