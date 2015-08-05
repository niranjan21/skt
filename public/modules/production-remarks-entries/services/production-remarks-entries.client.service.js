'use strict';

//Production remarks entries service used to communicate Production remarks entries REST endpoints
angular.module('production-remarks-entries').factory('ProductionRemarksEntries', ['$resource',
	function($resource) {
		return $resource('production-remarks-entries/:productionRemarksEntryId', { productionRemarksEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);