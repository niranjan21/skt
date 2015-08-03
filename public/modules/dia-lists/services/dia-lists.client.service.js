'use strict';

//Dia lists service used to communicate Dia lists REST endpoints
angular.module('dia-lists').factory('DiaLists', ['$resource',
	function($resource) {
		return $resource('dia-lists/:diaListId', { diaListId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);