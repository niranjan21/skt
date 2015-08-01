'use strict';

//Fabric requirement inward entries service used to communicate Fabric requirement inward entries REST endpoints
angular.module('fabric-requirement-inward-entries').factory('FabricRequirementInwardEntries', ['$resource',
	function($resource) {
		return $resource('fabric-requirement-inward-entries/:fabricRequirementInwardEntryId', { fabricRequirementInwardEntryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);