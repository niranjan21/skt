'use strict';

//Setting up route
angular.module('general-item-outstanding-registers').config(['$stateProvider',
	function($stateProvider) {
		// General item outstanding registers state routing
		$stateProvider.
		state('listGeneralItemOutstandingRegisters', {
			url: '/general-item-outstanding-registers',
			templateUrl: 'modules/general-item-outstanding-registers/views/list-general-item-outstanding-registers.client.view.html'
		}).
		state('createGeneralItemOutstandingRegister', {
			url: '/general-item-outstanding-registers/create',
			templateUrl: 'modules/general-item-outstanding-registers/views/create-general-item-outstanding-register.client.view.html'
		}).
		state('viewGeneralItemOutstandingRegister', {
			url: '/general-item-outstanding-registers/:generalItemOutstandingRegisterId',
			templateUrl: 'modules/general-item-outstanding-registers/views/view-general-item-outstanding-register.client.view.html'
		}).
		state('editGeneralItemOutstandingRegister', {
			url: '/general-item-outstanding-registers/:generalItemOutstandingRegisterId/edit',
			templateUrl: 'modules/general-item-outstanding-registers/views/edit-general-item-outstanding-register.client.view.html'
		});
	}
]);