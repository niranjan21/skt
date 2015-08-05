'use strict';

//Setting up route
angular.module('form-jjs').config(['$stateProvider',
	function($stateProvider) {
		// Form jjs state routing
		$stateProvider.
		state('listFormJjs', {
			url: '/form-jjs',
			templateUrl: 'modules/form-jjs/views/list-form-jjs.client.view.html'
		}).
		state('createFormJj', {
			url: '/form-jjs/create',
			templateUrl: 'modules/form-jjs/views/create-form-jj.client.view.html'
		}).
		state('viewFormJj', {
			url: '/form-jjs/:formJjId',
			templateUrl: 'modules/form-jjs/views/view-form-jj.client.view.html'
		}).
		state('editFormJj', {
			url: '/form-jjs/:formJjId/edit',
			templateUrl: 'modules/form-jjs/views/edit-form-jj.client.view.html'
		});
	}
]);