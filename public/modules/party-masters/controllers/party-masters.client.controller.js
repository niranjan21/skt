'use strict';

// PartyMaster controller
angular.module('party-masters').controller('PartyMastersController', ['$scope', '$stateParams', '$location', 'Authentication', 'PartyMasters',
	function($scope, $stateParams, $location, Authentication, PartyMasters) {
		$scope.authentication = Authentication;

		// Create new PartyMaster
		$scope.create = function() {
			// Create new PartyMaster object
			var partymaster = new PartyMasters ({
        
        code: this.code,
        
        nameoftheCompany: this.nameoftheCompany,
        
        address: this.address,
        
        contactPerson: this.contactPerson,
        
        phoneNo: this.phoneNo,
        
        tin: this.tin,
        
        cst: this.cst,
        
        pan: this.pan,
              
        created: Date.now
  
			});

			// Redirect after save
			partymaster.$save(function(response) {
				$location.path('party-masters/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing PartyMaster
		$scope.remove = function(partymaster) {
			if ( partymaster ) { 
				partymaster.$remove();

				for (var i in $scope.PartyMasters) {
					if ($scope.partymasters [i] === partymaster) {
						$scope.partymasters.splice(i, 1);
					}
				}
			} else {
				$scope.partymaster.$remove(function() {
					$location.path('party-masters');
				});
			}
		};

		// Update existing PartyMaster
		$scope.update = function() {
			var partymaster = $scope.partymaster;

			partymaster.$update(function() {
				$location.path('party-masters/' + partymaster._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of PartyMaster
		$scope.find = function() {
			$scope.partymasters = PartyMasters.query();
		};

		// Find existing PartyMaster
		$scope.findOne = function() {


      PartyMasters.get({ 
				partyMasterId: $stateParams.partyMasterId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.partymaster = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);