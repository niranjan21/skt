'use strict';

//General item inward entries service used to communicate General item inward entries REST endpoints
angular.module('general-item-inward-entries').factory('GeneralItemInwardEntries', ['$resource',
	function($resource) {
		return $resource('general-item-inward-entries/:generalItemInwardEntryId', { generalItemInwardEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);