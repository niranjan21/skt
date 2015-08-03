'use strict';

//Setting up route
angular.module('fabrics').config(['$stateProvider',
	function($stateProvider) {
		// Fabrics state routing
		$stateProvider.
		state('listFabrics', {
			url: '/fabrics',
			templateUrl: 'modules/fabrics/views/list-fabrics.client.view.html'
		}).
		state('createFabric', {
			url: '/fabrics/create',
			templateUrl: 'modules/fabrics/views/create-fabric.client.view.html'
		}).
		state('viewFabric', {
			url: '/fabrics/:fabricId',
			templateUrl: 'modules/fabrics/views/view-fabric.client.view.html'
		}).
		state('editFabric', {
			url: '/fabrics/:fabricId/edit',
			templateUrl: 'modules/fabrics/views/edit-fabric.client.view.html'
		});
	}
]);