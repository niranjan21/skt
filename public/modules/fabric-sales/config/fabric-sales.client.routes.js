'use strict';

//Setting up route
angular.module('fabric-sales').config(['$stateProvider',
	function($stateProvider) {
		// Fabric sales state routing
		$stateProvider.
		state('listFabricSales', {
			url: '/fabric-sales',
			templateUrl: 'modules/fabric-sales/views/list-fabric-sales.client.view.html'
		}).
		state('createFabricSale', {
			url: '/fabric-sales/create',
			templateUrl: 'modules/fabric-sales/views/create-fabric-sale.client.view.html'
		}).
		state('viewFabricSale', {
			url: '/fabric-sales/:fabricSaleId',
			templateUrl: 'modules/fabric-sales/views/view-fabric-sale.client.view.html'
		}).
		state('editFabricSale', {
			url: '/fabric-sales/:fabricSaleId/edit',
			templateUrl: 'modules/fabric-sales/views/edit-fabric-sale.client.view.html'
		});
	}
]);