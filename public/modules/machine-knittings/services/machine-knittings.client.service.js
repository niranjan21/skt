'use strict';

//Machine knittings service used to communicate Machine knittings REST endpoints
angular.module('machine-knittings').factory('MachineKnittings', ['$resource',
	function($resource) {
		return $resource('machine-knittings/:machineKnittingId', { machineKnittingId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);