'use strict';

//Setting up route
angular.module('fabric-return-entries').config(['$stateProvider',
	function($stateProvider) {
		// Fabric return entries state routing
		$stateProvider.
		state('listFabricReturnEntries', {
			url: '/fabric-return-entries',
			templateUrl: 'modules/fabric-return-entries/views/list-fabric-return-entries.client.view.html'
		}).
		state('createFabricReturnEntry', {
			url: '/fabric-return-entries/create',
			templateUrl: 'modules/fabric-return-entries/views/create-fabric-return-entry.client.view.html'
		}).
		state('viewFabricReturnEntry', {
			url: '/fabric-return-entries/:fabricReturnEntryId',
			templateUrl: 'modules/fabric-return-entries/views/view-fabric-return-entry.client.view.html'
		}).
		state('editFabricReturnEntry', {
			url: '/fabric-return-entries/:fabricReturnEntryId/edit',
			templateUrl: 'modules/fabric-return-entries/views/edit-fabric-return-entry.client.view.html'
		});
	}
]);