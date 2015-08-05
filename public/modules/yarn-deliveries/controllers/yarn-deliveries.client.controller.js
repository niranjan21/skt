'use strict';

// YarnDelivery controller
angular.module('yarn-deliveries').controller('YarnDeliveriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'YarnDeliveries',
	function($scope, $stateParams, $location, Authentication, YarnDeliveries) {
		$scope.authentication = Authentication;

		// Create new YarnDelivery
		$scope.create = function() {
			// Create new YarnDelivery object
			var yarndelivery = new YarnDeliveries ({
        
        dCNo: this.dCNo,
        
        dCDate: this.dCDate,
        
        party: this.party,
        
        jobNo: this.jobNo,
        
        jobDate: this.jobDate,
        
        knitter: this.knitter,
        
        sNo: this.sNo,
        
        description: this.description,
        
        colour: this.colour,
        
        code: this.code,
        
        rate: this.rate,
        
        gSM: this.gSM,
        
        lLength: this.lLength,
        
        gG: this.gG,
        
        mill: this.mill,
        
        count: this.count,
        
        dIA: this.dIA,
        
        programmeKgs: this.programmeKgs,
        
        requiredKgs: this.requiredKgs,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			yarndelivery.$save(function(response) {
				$location.path('yarn-deliveries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing YarnDelivery
		$scope.remove = function(yarndelivery) {
			if ( yarndelivery ) { 
				yarndelivery.$remove();

				for (var i in $scope.YarnDeliveries) {
					if ($scope.yarndeliveries [i] === yarndelivery) {
						$scope.yarndeliveries.splice(i, 1);
					}
				}
			} else {
				$scope.yarndelivery.$remove(function() {
					$location.path('yarn-deliveries');
				});
			}
		};

		// Update existing YarnDelivery
		$scope.update = function() {
			var yarndelivery = $scope.yarndelivery;

			yarndelivery.$update(function() {
				$location.path('yarn-deliveries/' + yarndelivery._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of YarnDelivery
		$scope.find = function() {
			$scope.yarndeliveries = YarnDeliveries.query();
		};

		// Find existing YarnDelivery
		$scope.findOne = function() {


      YarnDeliveries.get({ 
				yarnDeliveryId: $stateParams.yarnDeliveryId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.dCDate = moment(data.dCDate).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        data.jobDate = moment(data.jobDate).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.yarndelivery = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);