'use strict';

//Setting up route
angular.module('yarn-receipt-entries').config(['$stateProvider',
	function($stateProvider) {
		// Yarn receipt entries state routing
		$stateProvider.
		state('listYarnReceiptEntries', {
			url: '/yarn-receipt-entries',
			templateUrl: 'modules/yarn-receipt-entries/views/list-yarn-receipt-entries.client.view.html'
		}).
		state('createYarnReceiptEntry', {
			url: '/yarn-receipt-entries/create',
			templateUrl: 'modules/yarn-receipt-entries/views/create-yarn-receipt-entry.client.view.html'
		}).
		state('viewYarnReceiptEntry', {
			url: '/yarn-receipt-entries/:yarnReceiptEntryId',
			templateUrl: 'modules/yarn-receipt-entries/views/view-yarn-receipt-entry.client.view.html'
		}).
		state('editYarnReceiptEntry', {
			url: '/yarn-receipt-entries/:yarnReceiptEntryId/edit',
			templateUrl: 'modules/yarn-receipt-entries/views/edit-yarn-receipt-entry.client.view.html'
		});
	}
]);