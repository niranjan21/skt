'use strict';

//Setting up route
angular.module('general-item-outward-registers').config(['$stateProvider',
	function($stateProvider) {
		// General item outward registers state routing
		$stateProvider.
		state('listGeneralItemOutwardRegisters', {
			url: '/general-item-outward-registers',
			templateUrl: 'modules/general-item-outward-registers/views/list-general-item-outward-registers.client.view.html'
		}).
		state('createGeneralItemOutwardRegister', {
			url: '/general-item-outward-registers/create',
			templateUrl: 'modules/general-item-outward-registers/views/create-general-item-outward-register.client.view.html'
		}).
		state('viewGeneralItemOutwardRegister', {
			url: '/general-item-outward-registers/:generalItemOutwardRegisterId',
			templateUrl: 'modules/general-item-outward-registers/views/view-general-item-outward-register.client.view.html'
		}).
		state('editGeneralItemOutwardRegister', {
			url: '/general-item-outward-registers/:generalItemOutwardRegisterId/edit',
			templateUrl: 'modules/general-item-outward-registers/views/edit-general-item-outward-register.client.view.html'
		});
	}
]);