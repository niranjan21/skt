'use strict';

//Setting up route
angular.module('fabric-sale-registers').config(['$stateProvider',
	function($stateProvider) {
		// Fabric sale registers state routing
		$stateProvider.
		state('listFabricSaleRegisters', {
			url: '/fabric-sale-registers',
			templateUrl: 'modules/fabric-sale-registers/views/list-fabric-sale-registers.client.view.html'
		}).
		state('createFabricSaleRegister', {
			url: '/fabric-sale-registers/create',
			templateUrl: 'modules/fabric-sale-registers/views/create-fabric-sale-register.client.view.html'
		}).
		state('viewFabricSaleRegister', {
			url: '/fabric-sale-registers/:fabricSaleRegisterId',
			templateUrl: 'modules/fabric-sale-registers/views/view-fabric-sale-register.client.view.html'
		}).
		state('editFabricSaleRegister', {
			url: '/fabric-sale-registers/:fabricSaleRegisterId/edit',
			templateUrl: 'modules/fabric-sale-registers/views/edit-fabric-sale-register.client.view.html'
		});
	}
]);