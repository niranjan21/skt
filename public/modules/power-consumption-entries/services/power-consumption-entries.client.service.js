'use strict';

//Power consumption entries service used to communicate Power consumption entries REST endpoints
angular.module('power-consumption-entries').factory('PowerConsumptionEntries', ['$resource',
	function($resource) {
		return $resource('power-consumption-entries/:powerConsumptionEntryId', { powerConsumptionEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);