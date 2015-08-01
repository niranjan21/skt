'use strict';

//Setting up route
angular.module('yarn-return-entries').config(['$stateProvider',
	function($stateProvider) {
		// Yarn return entries state routing
		$stateProvider.
		state('listYarnReturnEntries', {
			url: '/yarn-return-entries',
			templateUrl: 'modules/yarn-return-entries/views/list-yarn-return-entries.client.view.html'
		}).
		state('createYarnReturnEntry', {
			url: '/yarn-return-entries/create',
			templateUrl: 'modules/yarn-return-entries/views/create-yarn-return-entry.client.view.html'
		}).
		state('viewYarnReturnEntry', {
			url: '/yarn-return-entries/:yarnReturnEntryId',
			templateUrl: 'modules/yarn-return-entries/views/view-yarn-return-entry.client.view.html'
		}).
		state('editYarnReturnEntry', {
			url: '/yarn-return-entries/:yarnReturnEntryId/edit',
			templateUrl: 'modules/yarn-return-entries/views/edit-yarn-return-entry.client.view.html'
		});
	}
]);