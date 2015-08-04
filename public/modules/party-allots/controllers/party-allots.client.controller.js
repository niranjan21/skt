'use strict';

// PartyAllot controller
angular.module('party-allots').controller('PartyAllotsController', ['$scope', '$stateParams', '$location', 'Authentication', 'PartyAllots',
	function($scope, $stateParams, $location, Authentication, PartyAllots) {
		$scope.authentication = Authentication;

		// Create new PartyAllot
		$scope.create = function() {
			// Create new PartyAllot object
			var partyallot = new PartyAllots ({
        
        partyName: this.partyName,
        
        knitter: this.knitter,
              
        created: Date.now
  
			});

			// Redirect after save
			partyallot.$save(function(response) {
				$location.path('party-allots/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing PartyAllot
		$scope.remove = function(partyallot) {
			if ( partyallot ) { 
				partyallot.$remove();

				for (var i in $scope.PartyAllots) {
					if ($scope.partyallots [i] === partyallot) {
						$scope.partyallots.splice(i, 1);
					}
				}
			} else {
				$scope.partyallot.$remove(function() {
					$location.path('party-allots');
				});
			}
		};

		// Update existing PartyAllot
		$scope.update = function() {
			var partyallot = $scope.partyallot;

			partyallot.$update(function() {
				$location.path('party-allots/' + partyallot._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of PartyAllot
		$scope.find = function() {
			$scope.partyallots = PartyAllots.query();
		};

		// Find existing PartyAllot
		$scope.findOne = function() {


      PartyAllots.get({ 
				partyAllotId: $stateParams.partyAllotId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        $scope.partyallot = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);