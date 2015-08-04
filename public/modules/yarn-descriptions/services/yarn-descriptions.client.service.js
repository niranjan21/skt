'use strict';

//Yarn descriptions service used to communicate Yarn descriptions REST endpoints
angular.module('yarn-descriptions').factory('YarnDescriptions', ['$resource',
	function($resource) {
		return $resource('yarn-descriptions/:yarnDescriptionId', { yarnDescriptionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);