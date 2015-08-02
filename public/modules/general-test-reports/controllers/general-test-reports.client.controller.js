'use strict';

// GeneralTestReport controller
angular.module('general-test-reports').controller('GeneralTestReportsController', ['$scope', '$stateParams', '$location', 'Authentication', 'GeneralTestReports',
	function($scope, $stateParams, $location, Authentication, GeneralTestReports) {
		$scope.authentication = Authentication;

		// Create new GeneralTestReport
		$scope.create = function() {
			// Create new GeneralTestReport object
			var generaltestreport = new GeneralTestReports ({
        
        from: this.from,
        
        to: this.to,
        
        reportNo: this.reportNo,
        
        jobNo: this.jobNo,
        
        partyOrderReference: this.partyOrderReference,
        
        approvedSignatory: this.approvedSignatory,
        
        authorisedSignatory: this.authorisedSignatory,
        
        count: this.count,
        
        mill: this.mill,
        
        noofCones: this.noofCones,
        
        grossWtinCone: this.grossWtinCone,
        
        grossWtinKithan: this.grossWtinKithan,
        
        netWtinKgs: this.netWtinKgs,
        
        fabricProduced: this.fabricProduced,
        
        balanceYarnNetWeight: this.balanceYarnNetWeight,
        
        shortageinKgs: this.shortageinKgs,
        
        lossinpercentage: this.lossinpercentage,
              
        created: Date.now
  
			});

			// Redirect after save
			generaltestreport.$save(function(response) {
				$location.path('general-test-reports/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing GeneralTestReport
		$scope.remove = function(generaltestreport) {
			if ( generaltestreport ) { 
				generaltestreport.$remove();

				for (var i in $scope.GeneralTestReports) {
					if ($scope.generaltestreports [i] === generaltestreport) {
						$scope.generaltestreports.splice(i, 1);
					}
				}
			} else {
				$scope.generaltestreport.$remove(function() {
					$location.path('general-test-reports');
				});
			}
		};

		// Update existing GeneralTestReport
		$scope.update = function() {
			var generaltestreport = $scope.generaltestreport;

			generaltestreport.$update(function() {
				$location.path('general-test-reports/' + generaltestreport._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of GeneralTestReport
		$scope.find = function() {
			$scope.generaltestreports = GeneralTestReports.query();
		};

		// Find existing GeneralTestReport
		$scope.findOne = function() {


      GeneralTestReports.get({ 
				generalTestReportId: $stateParams.generalTestReportId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.generaltestreport = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);