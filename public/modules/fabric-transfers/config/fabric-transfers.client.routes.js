'use strict';

//Setting up route
angular.module('fabric-transfers').config(['$stateProvider',
	function($stateProvider) {
		// Fabric transfers state routing
		$stateProvider.
		state('listFabricTransfers', {
			url: '/fabric-transfers',
			templateUrl: 'modules/fabric-transfers/views/list-fabric-transfers.client.view.html'
		}).
		state('createFabricTransfer', {
			url: '/fabric-transfers/create',
			templateUrl: 'modules/fabric-transfers/views/create-fabric-transfer.client.view.html'
		}).
		state('viewFabricTransfer', {
			url: '/fabric-transfers/:fabricTransferId',
			templateUrl: 'modules/fabric-transfers/views/view-fabric-transfer.client.view.html'
		}).
		state('editFabricTransfer', {
			url: '/fabric-transfers/:fabricTransferId/edit',
			templateUrl: 'modules/fabric-transfers/views/edit-fabric-transfer.client.view.html'
		});
	}
]);