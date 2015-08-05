'use strict';

//Production parameters service used to communicate Production parameters REST endpoints
angular.module('production-parameters').factory('ProductionParameters', ['$resource',
	function($resource) {
		return $resource('production-parameters/:productionParameterId', { productionParameterId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);