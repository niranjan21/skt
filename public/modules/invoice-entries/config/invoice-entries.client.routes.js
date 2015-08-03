'use strict';

//Setting up route
angular.module('invoice-entries').config(['$stateProvider',
	function($stateProvider) {
		// Invoice entries state routing
		$stateProvider.
		state('listInvoiceEntries', {
			url: '/invoice-entries',
			templateUrl: 'modules/invoice-entries/views/list-invoice-entries.client.view.html'
		}).
		state('createInvoiceEntry', {
			url: '/invoice-entries/create',
			templateUrl: 'modules/invoice-entries/views/create-invoice-entry.client.view.html'
		}).
		state('viewInvoiceEntry', {
			url: '/invoice-entries/:invoiceEntryId',
			templateUrl: 'modules/invoice-entries/views/view-invoice-entry.client.view.html'
		}).
		state('editInvoiceEntry', {
			url: '/invoice-entries/:invoiceEntryId/edit',
			templateUrl: 'modules/invoice-entries/views/edit-invoice-entry.client.view.html'
		});
	}
]);