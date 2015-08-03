'use strict';

//Employee masters service used to communicate Employee masters REST endpoints
angular.module('employee-masters').factory('EmployeeMasters', ['$resource',
	function($resource) {
		return $resource('employee-masters/:employeeMasterId', { employeeMasterId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);