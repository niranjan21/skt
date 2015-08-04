'use strict';

// NeedlesBreakage controller
angular.module('needles-breakages').controller('NeedlesBreakagesController', ['$scope', '$stateParams', '$location', 'Authentication', 'NeedlesBreakages',
	function($scope, $stateParams, $location, Authentication, NeedlesBreakages) {
		$scope.authentication = Authentication;

		// Create new NeedlesBreakage
		$scope.create = function() {
			// Create new NeedlesBreakage object
			var needlesbreakage = new NeedlesBreakages ({
        
        date: this.date,
        
        shift: this.shift,
        
        machineCode: this.machineCode,
        
        employee: this.employee,
        
        needleType: this.needleType,
        
        brokenNeedles: this.brokenNeedles,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			needlesbreakage.$save(function(response) {
				$location.path('needles-breakages/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing NeedlesBreakage
		$scope.remove = function(needlesbreakage) {
			if ( needlesbreakage ) { 
				needlesbreakage.$remove();

				for (var i in $scope.NeedlesBreakages) {
					if ($scope.needlesbreakages [i] === needlesbreakage) {
						$scope.needlesbreakages.splice(i, 1);
					}
				}
			} else {
				$scope.needlesbreakage.$remove(function() {
					$location.path('needles-breakages');
				});
			}
		};

		// Update existing NeedlesBreakage
		$scope.update = function() {
			var needlesbreakage = $scope.needlesbreakage;

			needlesbreakage.$update(function() {
				$location.path('needles-breakages/' + needlesbreakage._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of NeedlesBreakage
		$scope.find = function() {
			$scope.needlesbreakages = NeedlesBreakages.query();
		};

		// Find existing NeedlesBreakage
		$scope.findOne = function() {


      NeedlesBreakages.get({ 
				needlesBreakageId: $stateParams.needlesBreakageId
			})
      .$promise.then(function(data) {
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.needlesbreakage = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);