'use strict';

//Setting up route
angular.module('count-masters').config(['$stateProvider',
	function($stateProvider) {
		// Count masters state routing
		$stateProvider.
		state('listCountMasters', {
			url: '/count-masters',
			templateUrl: 'modules/count-masters/views/list-count-masters.client.view.html'
		}).
		state('createCountMaster', {
			url: '/count-masters/create',
			templateUrl: 'modules/count-masters/views/create-count-master.client.view.html'
		}).
		state('viewCountMaster', {
			url: '/count-masters/:countMasterId',
			templateUrl: 'modules/count-masters/views/view-count-master.client.view.html'
		}).
		state('editCountMaster', {
			url: '/count-masters/:countMasterId/edit',
			templateUrl: 'modules/count-masters/views/edit-count-master.client.view.html'
		});
	}
]);