'use strict';

//Party allots service used to communicate Party allots REST endpoints
angular.module('party-allots').factory('PartyAllots', ['$resource',
	function($resource) {
		return $resource('party-allots/:partyAllotId', { partyAllotId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);