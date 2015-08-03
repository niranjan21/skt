'use strict';

//Collar sizes service used to communicate Collar sizes REST endpoints
angular.module('collar-sizes').factory('CollarSizes', ['$resource',
	function($resource) {
		return $resource('collar-sizes/:collarSizeId', { collarSizeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);