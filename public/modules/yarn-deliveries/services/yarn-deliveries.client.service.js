'use strict';

//Yarn deliveries service used to communicate Yarn deliveries REST endpoints
angular.module('yarn-deliveries').factory('YarnDeliveries', ['$resource',
	function($resource) {
		return $resource('yarn-deliveries/:yarnDeliveryId', { yarnDeliveryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);