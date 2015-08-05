'use strict';

//Setting up route
angular.module('yarn-returns').config(['$stateProvider',
	function($stateProvider) {
		// Yarn returns state routing
		$stateProvider.
		state('listYarnReturns', {
			url: '/yarn-returns',
			templateUrl: 'modules/yarn-returns/views/list-yarn-returns.client.view.html'
		}).
		state('createYarnReturn', {
			url: '/yarn-returns/create',
			templateUrl: 'modules/yarn-returns/views/create-yarn-return.client.view.html'
		}).
		state('viewYarnReturn', {
			url: '/yarn-returns/:yarnReturnId',
			templateUrl: 'modules/yarn-returns/views/view-yarn-return.client.view.html'
		}).
		state('editYarnReturn', {
			url: '/yarn-returns/:yarnReturnId/edit',
			templateUrl: 'modules/yarn-returns/views/edit-yarn-return.client.view.html'
		});
	}
]);