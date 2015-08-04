'use strict';

//Setting up route
angular.module('party-allots').config(['$stateProvider',
	function($stateProvider) {
		// Party allots state routing
		$stateProvider.
		state('listPartyAllots', {
			url: '/party-allots',
			templateUrl: 'modules/party-allots/views/list-party-allots.client.view.html'
		}).
		state('createPartyAllot', {
			url: '/party-allots/create',
			templateUrl: 'modules/party-allots/views/create-party-allot.client.view.html'
		}).
		state('viewPartyAllot', {
			url: '/party-allots/:partyAllotId',
			templateUrl: 'modules/party-allots/views/view-party-allot.client.view.html'
		}).
		state('editPartyAllot', {
			url: '/party-allots/:partyAllotId/edit',
			templateUrl: 'modules/party-allots/views/edit-party-allot.client.view.html'
		});
	}
]);