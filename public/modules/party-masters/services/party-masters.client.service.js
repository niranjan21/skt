'use strict';

//Party masters service used to communicate Party masters REST endpoints
angular.module('party-masters').factory('PartyMasters', ['$resource',
	function($resource) {
		return $resource('party-masters/:partyMasterId', { partyMasterId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);