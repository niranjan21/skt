'use strict';

//Setting up route
angular.module('general-item-outward-entries').config(['$stateProvider',
	function($stateProvider) {
		// General item outward entries state routing
		$stateProvider.
		state('listGeneralItemOutwardEntries', {
			url: '/general-item-outward-entries',
			templateUrl: 'modules/general-item-outward-entries/views/list-general-item-outward-entries.client.view.html'
		}).
		state('createGeneralItemOutwardEntry', {
			url: '/general-item-outward-entries/create',
			templateUrl: 'modules/general-item-outward-entries/views/create-general-item-outward-entry.client.view.html'
		}).
		state('viewGeneralItemOutwardEntry', {
			url: '/general-item-outward-entries/:generalItemOutwardEntryId',
			templateUrl: 'modules/general-item-outward-entries/views/view-general-item-outward-entry.client.view.html'
		}).
		state('editGeneralItemOutwardEntry', {
			url: '/general-item-outward-entries/:generalItemOutwardEntryId/edit',
			templateUrl: 'modules/general-item-outward-entries/views/edit-general-item-outward-entry.client.view.html'
		});
	}
]);