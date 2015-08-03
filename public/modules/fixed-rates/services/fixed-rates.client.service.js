'use strict';

//Fixed rates service used to communicate Fixed rates REST endpoints
angular.module('fixed-rates').factory('FixedRates', ['$resource',
	function($resource) {
		return $resource('fixed-rates/:fixedRateId', { fixedRateId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);