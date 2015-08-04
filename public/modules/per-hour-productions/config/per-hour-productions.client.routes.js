'use strict';

//Setting up route
angular.module('per-hour-productions').config(['$stateProvider',
	function($stateProvider) {
		// Per hour productions state routing
		$stateProvider.
		state('listPerHourProductions', {
			url: '/per-hour-productions',
			templateUrl: 'modules/per-hour-productions/views/list-per-hour-productions.client.view.html'
		}).
		state('createPerHourProduction', {
			url: '/per-hour-productions/create',
			templateUrl: 'modules/per-hour-productions/views/create-per-hour-production.client.view.html'
		}).
		state('viewPerHourProduction', {
			url: '/per-hour-productions/:perHourProductionId',
			templateUrl: 'modules/per-hour-productions/views/view-per-hour-production.client.view.html'
		}).
		state('editPerHourProduction', {
			url: '/per-hour-productions/:perHourProductionId/edit',
			templateUrl: 'modules/per-hour-productions/views/edit-per-hour-production.client.view.html'
		});
	}
]);