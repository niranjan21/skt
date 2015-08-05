'use strict';

// OrderEnquiry controller
angular.module('order-enquiries').controller('OrderEnquiriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'OrderEnquiries',
	function($scope, $stateParams, $location, Authentication, OrderEnquiries) {
		$scope.authentication = Authentication;

		// Create new OrderEnquiry
		$scope.create = function() {
			// Create new OrderEnquiry object
			var orderenquiry = new OrderEnquiries ({
        
        enquiryNo: this.enquiryNo,
        
        date: this.date,
        
        party: this.party,
        
        concern: this.concern,
        
        orderReference: this.orderReference,
        
        attn: this.attn,
        
        fabricType: this.fabricType,
        
        receiver: this.receiver,
        
        counts: this.counts,
        
        dia: this.dia,
        
        samplingCharges: this.samplingCharges,
        
        knittingRatePerKg: this.knittingRatePerKg,
        
        paymentTerms: this.paymentTerms,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			orderenquiry.$save(function(response) {
				$location.path('order-enquiries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing OrderEnquiry
		$scope.remove = function(orderenquiry) {
			if ( orderenquiry ) { 
				orderenquiry.$remove();

				for (var i in $scope.OrderEnquiries) {
					if ($scope.orderenquiries [i] === orderenquiry) {
						$scope.orderenquiries.splice(i, 1);
					}
				}
			} else {
				$scope.orderenquiry.$remove(function() {
					$location.path('order-enquiries');
				});
			}
		};

		// Update existing OrderEnquiry
		$scope.update = function() {
			var orderenquiry = $scope.orderenquiry;

			orderenquiry.$update(function() {
				$location.path('order-enquiries/' + orderenquiry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of OrderEnquiry
		$scope.find = function() {
			$scope.orderenquiries = OrderEnquiries.query();
		};

		// Find existing OrderEnquiry
		$scope.findOne = function() {


      OrderEnquiries.get({ 
				orderEnquiryId: $stateParams.orderEnquiryId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.orderenquiry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);