'use strict';

//Setting up route
angular.module('fabric-groups').config(['$stateProvider',
	function($stateProvider) {
		// Fabric groups state routing
		$stateProvider.
		state('listFabricGroups', {
			url: '/fabric-groups',
			templateUrl: 'modules/fabric-groups/views/list-fabric-groups.client.view.html'
		}).
		state('createFabricGroup', {
			url: '/fabric-groups/create',
			templateUrl: 'modules/fabric-groups/views/create-fabric-group.client.view.html'
		}).
		state('viewFabricGroup', {
			url: '/fabric-groups/:fabricGroupId',
			templateUrl: 'modules/fabric-groups/views/view-fabric-group.client.view.html'
		}).
		state('editFabricGroup', {
			url: '/fabric-groups/:fabricGroupId/edit',
			templateUrl: 'modules/fabric-groups/views/edit-fabric-group.client.view.html'
		});
	}
]);