'use strict';

//Bs service used to communicate Bs REST endpoints
angular.module('bs').factory('Bs', ['$resource',
	function($resource) {
		return $resource('bs/:bId', { bId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);