'use strict';

//Setting up route
angular.module('bulk-needle-change-entries').config(['$stateProvider',
	function($stateProvider) {
		// Bulk needle change entries state routing
		$stateProvider.
		state('listBulkNeedleChangeEntries', {
			url: '/bulk-needle-change-entries',
			templateUrl: 'modules/bulk-needle-change-entries/views/list-bulk-needle-change-entries.client.view.html'
		}).
		state('createBulkNeedleChangeEntry', {
			url: '/bulk-needle-change-entries/create',
			templateUrl: 'modules/bulk-needle-change-entries/views/create-bulk-needle-change-entry.client.view.html'
		}).
		state('viewBulkNeedleChangeEntry', {
			url: '/bulk-needle-change-entries/:bulkNeedleChangeEntryId',
			templateUrl: 'modules/bulk-needle-change-entries/views/view-bulk-needle-change-entry.client.view.html'
		}).
		state('editBulkNeedleChangeEntry', {
			url: '/bulk-needle-change-entries/:bulkNeedleChangeEntryId/edit',
			templateUrl: 'modules/bulk-needle-change-entries/views/edit-bulk-needle-change-entry.client.view.html'
		});
	}
]);