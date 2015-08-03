'use strict';

//Fabrics service used to communicate Fabrics REST endpoints
angular.module('fabrics').factory('Fabrics', ['$resource',
	function($resource) {
		return $resource('fabrics/:fabricId', { fabricId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);