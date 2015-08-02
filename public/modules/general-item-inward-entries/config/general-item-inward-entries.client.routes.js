'use strict';

//Setting up route
angular.module('general-item-inward-entries').config(['$stateProvider',
	function($stateProvider) {
		// General item inward entries state routing
		$stateProvider.
		state('listGeneralItemInwardEntries', {
			url: '/general-item-inward-entries',
			templateUrl: 'modules/general-item-inward-entries/views/list-general-item-inward-entries.client.view.html'
		}).
		state('createGeneralItemInwardEntry', {
			url: '/general-item-inward-entries/create',
			templateUrl: 'modules/general-item-inward-entries/views/create-general-item-inward-entry.client.view.html'
		}).
		state('viewGeneralItemInwardEntry', {
			url: '/general-item-inward-entries/:generalItemInwardEntryId',
			templateUrl: 'modules/general-item-inward-entries/views/view-general-item-inward-entry.client.view.html'
		}).
		state('editGeneralItemInwardEntry', {
			url: '/general-item-inward-entries/:generalItemInwardEntryId/edit',
			templateUrl: 'modules/general-item-inward-entries/views/edit-general-item-inward-entry.client.view.html'
		});
	}
]);