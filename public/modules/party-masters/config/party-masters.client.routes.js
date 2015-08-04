'use strict';

//Setting up route
angular.module('party-masters').config(['$stateProvider',
	function($stateProvider) {
		// Party masters state routing
		$stateProvider.
		state('listPartyMasters', {
			url: '/party-masters',
			templateUrl: 'modules/party-masters/views/list-party-masters.client.view.html'
		}).
		state('createPartyMaster', {
			url: '/party-masters/create',
			templateUrl: 'modules/party-masters/views/create-party-master.client.view.html'
		}).
		state('viewPartyMaster', {
			url: '/party-masters/:partyMasterId',
			templateUrl: 'modules/party-masters/views/view-party-master.client.view.html'
		}).
		state('editPartyMaster', {
			url: '/party-masters/:partyMasterId/edit',
			templateUrl: 'modules/party-masters/views/edit-party-master.client.view.html'
		});
	}
]);