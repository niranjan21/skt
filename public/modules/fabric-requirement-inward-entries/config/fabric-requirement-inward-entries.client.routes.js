'use strict';

//Setting up route
angular.module('fabric-requirement-inward-entries').config(['$stateProvider',
	function($stateProvider) {
		// Fabric requirement inward entries state routing
		$stateProvider.
		state('listFabricRequirementInwardEntries', {
			url: '/fabric-requirement-inward-entries',
			templateUrl: 'modules/fabric-requirement-inward-entries/views/list-fabric-requirement-inward-entries.client.view.html'
		}).
		state('createFabricRequirementInwardEntry', {
			url: '/fabric-requirement-inward-entries/create',
			templateUrl: 'modules/fabric-requirement-inward-entries/views/create-fabric-requirement-inward-entry.client.view.html'
		}).
		state('viewFabricRequirementInwardEntry', {
			url: '/fabric-requirement-inward-entries/:fabricRequirementInwardEntryId',
			templateUrl: 'modules/fabric-requirement-inward-entries/views/view-fabric-requirement-inward-entry.client.view.html'
		}).
		state('editFabricRequirementInwardEntry', {
			url: '/fabric-requirement-inward-entries/:fabricRequirementInwardEntryId/edit',
			templateUrl: 'modules/fabric-requirement-inward-entries/views/edit-fabric-requirement-inward-entry.client.view.html'
		});
	}
]);