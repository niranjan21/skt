'use strict';

//Setting up route
angular.module('fabric-receipts').config(['$stateProvider',
	function($stateProvider) {
		// Fabric receipts state routing
		$stateProvider.
		state('listFabricReceipts', {
			url: '/fabric-receipts',
			templateUrl: 'modules/fabric-receipts/views/list-fabric-receipts.client.view.html'
		}).
		state('createFabricReceipt', {
			url: '/fabric-receipts/create',
			templateUrl: 'modules/fabric-receipts/views/create-fabric-receipt.client.view.html'
		}).
		state('viewFabricReceipt', {
			url: '/fabric-receipts/:fabricReceiptId',
			templateUrl: 'modules/fabric-receipts/views/view-fabric-receipt.client.view.html'
		}).
		state('editFabricReceipt', {
			url: '/fabric-receipts/:fabricReceiptId/edit',
			templateUrl: 'modules/fabric-receipts/views/edit-fabric-receipt.client.view.html'
		});
	}
]);