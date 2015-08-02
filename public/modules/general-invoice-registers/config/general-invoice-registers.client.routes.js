'use strict';

//Setting up route
angular.module('general-invoice-registers').config(['$stateProvider',
	function($stateProvider) {
		// General invoice registers state routing
		$stateProvider.
		state('listGeneralInvoiceRegisters', {
			url: '/general-invoice-registers',
			templateUrl: 'modules/general-invoice-registers/views/list-general-invoice-registers.client.view.html'
		}).
		state('createGeneralInvoiceRegister', {
			url: '/general-invoice-registers/create',
			templateUrl: 'modules/general-invoice-registers/views/create-general-invoice-register.client.view.html'
		}).
		state('viewGeneralInvoiceRegister', {
			url: '/general-invoice-registers/:generalInvoiceRegisterId',
			templateUrl: 'modules/general-invoice-registers/views/view-general-invoice-register.client.view.html'
		}).
		state('editGeneralInvoiceRegister', {
			url: '/general-invoice-registers/:generalInvoiceRegisterId/edit',
			templateUrl: 'modules/general-invoice-registers/views/edit-general-invoice-register.client.view.html'
		});
	}
]);