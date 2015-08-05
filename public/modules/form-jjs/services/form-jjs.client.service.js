'use strict';

//Form jjs service used to communicate Form jjs REST endpoints
angular.module('form-jjs').factory('FormJjs', ['$resource',
	function($resource) {
		return $resource('form-jjs/:formJjId', { formJjId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);