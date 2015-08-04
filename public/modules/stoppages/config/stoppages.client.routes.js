'use strict';

//Setting up route
angular.module('stoppages').config(['$stateProvider',
	function($stateProvider) {
		// Stoppages state routing
		$stateProvider.
		state('listStoppages', {
			url: '/stoppages',
			templateUrl: 'modules/stoppages/views/list-stoppages.client.view.html'
		}).
		state('createStoppage', {
			url: '/stoppages/create',
			templateUrl: 'modules/stoppages/views/create-stoppage.client.view.html'
		}).
		state('viewStoppage', {
			url: '/stoppages/:stoppageId',
			templateUrl: 'modules/stoppages/views/view-stoppage.client.view.html'
		}).
		state('editStoppage', {
			url: '/stoppages/:stoppageId/edit',
			templateUrl: 'modules/stoppages/views/edit-stoppage.client.view.html'
		});
	}
]);