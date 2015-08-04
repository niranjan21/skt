'use strict';

//Needles inward entries service used to communicate Needles inward entries REST endpoints
angular.module('needles-inward-entries').factory('NeedlesInwardEntries', ['$resource',
	function($resource) {
		return $resource('needles-inward-entries/:needlesInwardEntryId', { needlesInwardEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);