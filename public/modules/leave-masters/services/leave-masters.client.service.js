'use strict';

//Leave masters service used to communicate Leave masters REST endpoints
angular.module('leave-masters').factory('LeaveMasters', ['$resource',
	function($resource) {
		return $resource('leave-masters/:leaveMasterId', { leaveMasterId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);