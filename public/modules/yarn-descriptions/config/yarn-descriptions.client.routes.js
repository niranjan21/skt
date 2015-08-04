'use strict';

//Setting up route
angular.module('yarn-descriptions').config(['$stateProvider',
	function($stateProvider) {
		// Yarn descriptions state routing
		$stateProvider.
		state('listYarnDescriptions', {
			url: '/yarn-descriptions',
			templateUrl: 'modules/yarn-descriptions/views/list-yarn-descriptions.client.view.html'
		}).
		state('createYarnDescription', {
			url: '/yarn-descriptions/create',
			templateUrl: 'modules/yarn-descriptions/views/create-yarn-description.client.view.html'
		}).
		state('viewYarnDescription', {
			url: '/yarn-descriptions/:yarnDescriptionId',
			templateUrl: 'modules/yarn-descriptions/views/view-yarn-description.client.view.html'
		}).
		state('editYarnDescription', {
			url: '/yarn-descriptions/:yarnDescriptionId/edit',
			templateUrl: 'modules/yarn-descriptions/views/edit-yarn-description.client.view.html'
		});
	}
]);