'use strict';

//Setting up route
angular.module('fabric-descriptions').config(['$stateProvider',
	function($stateProvider) {
		// Fabric descriptions state routing
		$stateProvider.
		state('listFabricDescriptions', {
			url: '/fabric-descriptions',
			templateUrl: 'modules/fabric-descriptions/views/list-fabric-descriptions.client.view.html'
		}).
		state('createFabricDescription', {
			url: '/fabric-descriptions/create',
			templateUrl: 'modules/fabric-descriptions/views/create-fabric-description.client.view.html'
		}).
		state('viewFabricDescription', {
			url: '/fabric-descriptions/:fabricDescriptionId',
			templateUrl: 'modules/fabric-descriptions/views/view-fabric-description.client.view.html'
		}).
		state('editFabricDescription', {
			url: '/fabric-descriptions/:fabricDescriptionId/edit',
			templateUrl: 'modules/fabric-descriptions/views/edit-fabric-description.client.view.html'
		});
	}
]);