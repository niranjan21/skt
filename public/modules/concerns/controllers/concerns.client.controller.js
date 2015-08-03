'use strict';

// Concern controller
angular.module('concerns').controller('ConcernsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Concerns',
	function($scope, $stateParams, $location, Authentication, Concerns) {
		$scope.authentication = Authentication;

		// Create new Concern
		$scope.create = function() {
			// Create new Concern object
			var concern = new Concerns ({
        
        concernName: this.concernName,
        
        inshort: this.inshort,
        
        address: this.address,
        
        phoneNo: this.phoneNo,
        
        faxNo: this.faxNo,
        
        mobileNo: this.mobileNo,
        
        tin: this.tin,
        
        cst: this.cst,
        
        pan: this.pan,
        
        esino: this.esino,
        
        designation: this.designation,
              
        created: Date.now
  
			});

			// Redirect after save
			concern.$save(function(response) {
				$location.path('concerns/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Concern
		$scope.remove = function(concern) {
			if ( concern ) { 
				concern.$remove();

				for (var i in $scope.Concerns) {
					if ($scope.concerns [i] === concern) {
						$scope.concerns.splice(i, 1);
					}
				}
			} else {
				$scope.concern.$remove(function() {
					$location.path('concerns');
				});
			}
		};

		// Update existing Concern
		$scope.update = function() {
			var concern = $scope.concern;

			concern.$update(function() {
				$location.path('concerns/' + concern._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Concern
		$scope.find = function() {
			$scope.concerns = Concerns.query();
		};

		// Find existing Concern
		$scope.findOne = function() {


      Concerns.get({ 
				concernId: $stateParams.concernId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.concern = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);