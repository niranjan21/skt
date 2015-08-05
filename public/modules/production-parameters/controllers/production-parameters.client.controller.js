'use strict';

// ProductionParameter controller
angular.module('production-parameters').controller('ProductionParametersController', ['$scope', '$stateParams', '$location', 'Authentication', 'ProductionParameters',
	function($scope, $stateParams, $location, Authentication, ProductionParameters) {
		$scope.authentication = Authentication;

		// Create new ProductionParameter
		$scope.create = function() {
			// Create new ProductionParameter object
			var productionparameter = new ProductionParameters ({
        
        jobNo: this.jobNo,
        
        date: this.date,
        
        party: this.party,
        
        sno: this.sno,
        
        design: this.design,
        
        colour: this.colour,
        
        rate: this.rate,
        
        texture: this.texture,
        
        gsm: this.gsm,
        
        lLength: this.lLength,
        
        gG: this.gG,
        
        mill: this.mill,
        
        count: this.count,
        
        dia: this.dia,
        
        programmeQty: this.programmeQty,
        
        averageProductionPerHour: this.averageProductionPerHour,
        
        rpm: this.rpm,
        
        counting: this.counting,
        
        feeder: this.feeder,
        
        rollWeight: this.rollWeight,
        
        remarks: this.remarks,
              
        created: Date.now
  
			});

			// Redirect after save
			productionparameter.$save(function(response) {
				$location.path('production-parameters/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing ProductionParameter
		$scope.remove = function(productionparameter) {
			if ( productionparameter ) { 
				productionparameter.$remove();

				for (var i in $scope.ProductionParameters) {
					if ($scope.productionparameters [i] === productionparameter) {
						$scope.productionparameters.splice(i, 1);
					}
				}
			} else {
				$scope.productionparameter.$remove(function() {
					$location.path('production-parameters');
				});
			}
		};

		// Update existing ProductionParameter
		$scope.update = function() {
			var productionparameter = $scope.productionparameter;

			productionparameter.$update(function() {
				$location.path('production-parameters/' + productionparameter._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of ProductionParameter
		$scope.find = function() {
			$scope.productionparameters = ProductionParameters.query();
		};

		// Find existing ProductionParameter
		$scope.findOne = function() {


      ProductionParameters.get({ 
				productionParameterId: $stateParams.productionParameterId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.date = moment(data.date).format('YYYY-MM-DD');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.productionparameter = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });      
      
      
		};
	}
]);