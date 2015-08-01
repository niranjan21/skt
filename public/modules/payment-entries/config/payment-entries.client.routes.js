'use strict';

//Setting up route
angular.module('payment-entries').config(['$stateProvider',
	function($stateProvider) {
		// Payment entries state routing
		$stateProvider.
		state('listPaymentEntries', {
			url: '/payment-entries',
			templateUrl: 'modules/payment-entries/views/list-payment-entries.client.view.html'
		}).
		state('createPaymentEntry', {
			url: '/payment-entries/create',
			templateUrl: 'modules/payment-entries/views/create-payment-entry.client.view.html'
		}).
		state('viewPaymentEntry', {
			url: '/payment-entries/:paymentEntryId',
			templateUrl: 'modules/payment-entries/views/view-payment-entry.client.view.html'
		}).
		state('editPaymentEntry', {
			url: '/payment-entries/:paymentEntryId/edit',
			templateUrl: 'modules/payment-entries/views/edit-payment-entry.client.view.html'
		});
	}
]);