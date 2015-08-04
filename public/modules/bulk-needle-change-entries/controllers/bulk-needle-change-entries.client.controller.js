'use strict';

// BulkNeedleChangeEntry controller
angular.module('bulk-needle-change-entries').controller('BulkNeedleChangeEntriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'BulkNeedleChangeEntries',
	function($scope, $stateParams, $location, Authentication, BulkNeedleChangeEntries) {
		$scope.authentication = Authentication;

		// Create new BulkNeedleChangeEntry
		$scope.create = function() {
			// Create new BulkNeedleChangeEntry object
			var bulkneedlechangeentry = new BulkNeedleChangeEntries ({
        
        machineCode: this.machineCode,
        
        machineMake: this.machineMake,
        
        dia: this.dia,
        
        mark: this.mark,
        
        lastBulkNeedlechanged: this.lastBulkNeedlechanged,
        
        allowedKgs: this.allowedKgs,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			bulkneedlechangeentry.$save(function(response) {
				$location.path('bulk-needle-change-entries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing BulkNeedleChangeEntry
		$scope.remove = function(bulkneedlechangeentry) {
			if ( bulkneedlechangeentry ) { 
				bulkneedlechangeentry.$remove();

				for (var i in $scope.BulkNeedleChangeEntries) {
					if ($scope.bulkneedlechangeentries [i] === bulkneedlechangeentry) {
						$scope.bulkneedlechangeentries.splice(i, 1);
					}
				}
			} else {
				$scope.bulkneedlechangeentry.$remove(function() {
					$location.path('bulk-needle-change-entries');
				});
			}
		};

		// Update existing BulkNeedleChangeEntry
		$scope.update = function() {
			var bulkneedlechangeentry = $scope.bulkneedlechangeentry;

			bulkneedlechangeentry.$update(function() {
				$location.path('bulk-needle-change-entries/' + bulkneedlechangeentry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of BulkNeedleChangeEntry
		$scope.find = function() {
			$scope.bulkneedlechangeentries = BulkNeedleChangeEntries.query();
		};

		// Find existing BulkNeedleChangeEntry
		$scope.findOne = function() {


      BulkNeedleChangeEntries.get({ 
				bulkNeedleChangeEntryId: $stateParams.bulkNeedleChangeEntryId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        
        
        
        
        data.lastBulkNeedlechanged = moment(data.lastBulkNeedlechanged).format('YYYY-MM-DD');
        
        
        
        
        
        
        $scope.bulkneedlechangeentry = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);