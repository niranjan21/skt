'use strict';

//Setting up route
angular.module('delivery-entries').config(['$stateProvider',
	function($stateProvider) {
		// Delivery entries state routing
		$stateProvider.
		state('listDeliveryEntries', {
			url: '/delivery-entries',
			templateUrl: 'modules/delivery-entries/views/list-delivery-entries.client.view.html'
		}).
		state('createDeliveryEntry', {
			url: '/delivery-entries/create',
			templateUrl: 'modules/delivery-entries/views/create-delivery-entry.client.view.html'
		}).
		state('viewDeliveryEntry', {
			url: '/delivery-entries/:deliveryEntryId',
			templateUrl: 'modules/delivery-entries/views/view-delivery-entry.client.view.html'
		}).
		state('editDeliveryEntry', {
			url: '/delivery-entries/:deliveryEntryId/edit',
			templateUrl: 'modules/delivery-entries/views/edit-delivery-entry.client.view.html'
		});
	}
]);