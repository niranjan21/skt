'use strict';

//Fabric descriptions service used to communicate Fabric descriptions REST endpoints
angular.module('fabric-descriptions').factory('FabricDescriptions', ['$resource',
	function($resource) {
		return $resource('fabric-descriptions/:fabricDescriptionId', { fabricDescriptionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);