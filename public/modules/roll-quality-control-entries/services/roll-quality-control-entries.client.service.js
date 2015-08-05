'use strict';

//Roll quality control entries service used to communicate Roll quality control entries REST endpoints
angular.module('roll-quality-control-entries').factory('RollQualityControlEntries', ['$resource',
	function($resource) {
		return $resource('roll-quality-control-entries/:rollQualityControlEntryId', { rollQualityControlEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);