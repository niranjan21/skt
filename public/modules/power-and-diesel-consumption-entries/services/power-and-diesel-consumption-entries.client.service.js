'use strict';

//Power and diesel consumption entries service used to communicate Power and diesel consumption entries REST endpoints
angular.module('power-and-diesel-consumption-entries').factory('PowerAndDieselConsumptionEntries', ['$resource',
	function($resource) {
		return $resource('power-and-diesel-consumption-entries/:powerAndDieselConsumptionEntryId', { powerAndDieselConsumptionEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);