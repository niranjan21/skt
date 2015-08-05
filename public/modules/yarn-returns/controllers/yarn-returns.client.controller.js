'use strict';

// YarnReturn controller
angular.module('yarn-returns').controller('YarnReturnsController', ['$scope', '$stateParams', '$location', 'Authentication', 'YarnReturns',
	function($scope, $stateParams, $location, Authentication, YarnReturns) {
		$scope.authentication = Authentication;

		// Create new YarnReturn
		$scope.create = function() {
			// Create new YarnReturn object
			var yarnreturn = new YarnReturns ({
        
        jobNo: this.jobNo,
        
        party: this.party,
        
        partyDcno: this.partyDcno,
        
        dcdate: this.dcdate,
        
        ourDeliveryChallan: this.ourDeliveryChallan,
        
        sNo: this.sNo,
        
        yarnDescription: this.yarnDescription,
        
        sentBags: this.sentBags,
        
        sentKgs: this.sentKgs,
        
        returnBags: this.returnBags,
        
        returnKgs: this.returnKgs,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			yarnreturn.$save(function(response) {
				$location.path('yarn-returns/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing YarnReturn
		$scope.remove = function(yarnreturn) {
			if ( yarnreturn ) { 
				yarnreturn.$remove();

				for (var i in $scope.YarnReturns) {
					if ($scope.yarnreturns [i] === yarnreturn) {
						$scope.yarnreturns.splice(i, 1);
					}
				}
			} else {
				$scope.yarnreturn.$remove(function() {
					$location.path('yarn-returns');
				});
			}
		};

		// Update existing YarnReturn
		$scope.update = function() {
			var yarnreturn = $scope.yarnreturn;

			yarnreturn.$update(function() {
				$location.path('yarn-returns/' + yarnreturn._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of YarnReturn
		$scope.find = function() {
			$scope.yarnreturns = YarnReturns.query();
		};

		// Find existing YarnReturn
		$scope.findOne = function() {


      YarnReturns.get({ 
				yarnReturnId: $stateParams.yarnReturnId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        
        
        data.dcdate = moment(data.dcdate).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.yarnreturn = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);