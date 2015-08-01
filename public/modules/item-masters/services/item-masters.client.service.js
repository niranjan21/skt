'use strict';

//Item masters service used to communicate Item masters REST endpoints
angular.module('item-masters').factory('ItemMasters', ['$resource',
	function($resource) {
		return $resource('item-masters/:itemMasterId', { itemMasterId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);