'use strict';

//Count masters service used to communicate Count masters REST endpoints
angular.module('count-masters').factory('CountMasters', ['$resource',
	function($resource) {
		return $resource('count-masters/:countMasterId', { countMasterId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);