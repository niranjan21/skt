'use strict';

//Setting up route
angular.module('fabric-transfer-registers').config(['$stateProvider',
	function($stateProvider) {
		// Fabric transfer registers state routing
		$stateProvider.
		state('listFabricTransferRegisters', {
			url: '/fabric-transfer-registers',
			templateUrl: 'modules/fabric-transfer-registers/views/list-fabric-transfer-registers.client.view.html'
		}).
		state('createFabricTransferRegister', {
			url: '/fabric-transfer-registers/create',
			templateUrl: 'modules/fabric-transfer-registers/views/create-fabric-transfer-register.client.view.html'
		}).
		state('viewFabricTransferRegister', {
			url: '/fabric-transfer-registers/:fabricTransferRegisterId',
			templateUrl: 'modules/fabric-transfer-registers/views/view-fabric-transfer-register.client.view.html'
		}).
		state('editFabricTransferRegister', {
			url: '/fabric-transfer-registers/:fabricTransferRegisterId/edit',
			templateUrl: 'modules/fabric-transfer-registers/views/edit-fabric-transfer-register.client.view.html'
		});
	}
]);