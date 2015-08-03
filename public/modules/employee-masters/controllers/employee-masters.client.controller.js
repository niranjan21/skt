'use strict';

// EmployeeMaster controller
angular.module('employee-masters').controller('EmployeeMastersController', ['$scope', '$stateParams', '$location', 'Authentication', 'EmployeeMasters',
	function($scope, $stateParams, $location, Authentication, EmployeeMasters) {
		$scope.authentication = Authentication;

		// Create new EmployeeMaster
		$scope.create = function() {
			// Create new EmployeeMaster object
			var employeemaster = new EmployeeMasters ({
        
        code: this.code,
        
        name: this.name,
        
        address: this.address,
        
        basicPay: this.basicPay,
        
        pfbasic: this.pfbasic,
        
        da: this.da,
        
        travelAllowance: this.travelAllowance,
        
        teaAllowance: this.teaAllowance,
        
        sundayAllowance: this.sundayAllowance,
        
        pf: this.pf,
        
        esi: this.esi,
        
        leaveWage: this.leaveWage,
        
        pieceShiftWeek: this.pieceShiftWeek,
        
        joiningDate: this.joiningDate,
        
        resignDate: this.resignDate,
        
        addlWagePerShift: this.addlWagePerShift,
        
        allowancePerShift: this.allowancePerShift,
              
        created: Date.now
  
			});

			// Redirect after save
			employeemaster.$save(function(response) {
				$location.path('employee-masters/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing EmployeeMaster
		$scope.remove = function(employeemaster) {
			if ( employeemaster ) { 
				employeemaster.$remove();

				for (var i in $scope.EmployeeMasters) {
					if ($scope.employeemasters [i] === employeemaster) {
						$scope.employeemasters.splice(i, 1);
					}
				}
			} else {
				$scope.employeemaster.$remove(function() {
					$location.path('employee-masters');
				});
			}
		};

		// Update existing EmployeeMaster
		$scope.update = function() {
			var employeemaster = $scope.employeemaster;

			employeemaster.$update(function() {
				$location.path('employee-masters/' + employeemaster._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of EmployeeMaster
		$scope.find = function() {
			$scope.employeemasters = EmployeeMasters.query();
		};

		// Find existing EmployeeMaster
		$scope.findOne = function() {


      EmployeeMasters.get({ 
				employeeMasterId: $stateParams.employeeMasterId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        data.joiningDate = moment(data.joiningDate).format('YYYY-MM-DD');
        
        
        
        data.resignDate = moment(data.resignDate).format('YYYY-MM-DD');
        
        
        
        
        
        
        $scope.employeemaster = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);