'use strict';

// BulkNeedleChangeReport controller
angular.module('bulk-needle-change-reports').controller('BulkNeedleChangeReportsController', ['$scope', '$stateParams', '$location', 'Authentication', 'BulkNeedleChangeReports',
	function($scope, $stateParams, $location, Authentication, BulkNeedleChangeReports) {
		$scope.authentication = Authentication;

		// Create new BulkNeedleChangeReport
		$scope.create = function() {
			// Create new BulkNeedleChangeReport object
			var bulkneedlechangereport = new BulkNeedleChangeReports ({
        
        machineNumber: this.machineNumber,
        
        machineMake: this.machineMake,
        
        dia: this.dia,
        
        lastBulkNeedlechangedDate: this.lastBulkNeedlechangedDate,
        
        allowedProductionQuantity: this.allowedProductionQuantity,
        
        actualProductionQuantity: this.actualProductionQuantity,
        
        balanceQty: this.balanceQty,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			bulkneedlechangereport.$save(function(response) {
				$location.path('bulk-needle-change-reports/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing BulkNeedleChangeReport
		$scope.remove = function(bulkneedlechangereport) {
			if ( bulkneedlechangereport ) { 
				bulkneedlechangereport.$remove();

				for (var i in $scope.BulkNeedleChangeReports) {
					if ($scope.bulkneedlechangereports [i] === bulkneedlechangereport) {
						$scope.bulkneedlechangereports.splice(i, 1);
					}
				}
			} else {
				$scope.bulkneedlechangereport.$remove(function() {
					$location.path('bulk-needle-change-reports');
				});
			}
		};

		// Update existing BulkNeedleChangeReport
		$scope.update = function() {
			var bulkneedlechangereport = $scope.bulkneedlechangereport;

			bulkneedlechangereport.$update(function() {
				$location.path('bulk-needle-change-reports/' + bulkneedlechangereport._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of BulkNeedleChangeReport
		$scope.find = function() {
			$scope.bulkneedlechangereports = BulkNeedleChangeReports.query();
		};

		// Find existing BulkNeedleChangeReport
		$scope.findOne = function() {


      BulkNeedleChangeReports.get({ 
				bulkNeedleChangeReportId: $stateParams.bulkNeedleChangeReportId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        
        
        data.lastBulkNeedlechangedDate = moment(data.lastBulkNeedlechangedDate).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        $scope.bulkneedlechangereport = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);