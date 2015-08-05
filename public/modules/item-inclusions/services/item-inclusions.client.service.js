'use strict';

//Item inclusions service used to communicate Item inclusions REST endpoints
angular.module('item-inclusions').factory('ItemInclusions', ['$resource',
	function($resource) {
		return $resource('item-inclusions/:itemInclusionId', { itemInclusionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);