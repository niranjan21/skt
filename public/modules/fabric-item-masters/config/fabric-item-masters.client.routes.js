'use strict';

//Setting up route
angular.module('fabric-item-masters').config(['$stateProvider',
	function($stateProvider) {
		// Fabric item masters state routing
		$stateProvider.
		state('listFabricItemMasters', {
			url: '/fabric-item-masters',
			templateUrl: 'modules/fabric-item-masters/views/list-fabric-item-masters.client.view.html'
		}).
		state('createFabricItemMaster', {
			url: '/fabric-item-masters/create',
			templateUrl: 'modules/fabric-item-masters/views/create-fabric-item-master.client.view.html'
		}).
		state('viewFabricItemMaster', {
			url: '/fabric-item-masters/:fabricItemMasterId',
			templateUrl: 'modules/fabric-item-masters/views/view-fabric-item-master.client.view.html'
		}).
		state('editFabricItemMaster', {
			url: '/fabric-item-masters/:fabricItemMasterId/edit',
			templateUrl: 'modules/fabric-item-masters/views/edit-fabric-item-master.client.view.html'
		});
	}
]);