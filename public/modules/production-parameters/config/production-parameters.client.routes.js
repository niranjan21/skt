'use strict';

//Setting up route
angular.module('production-parameters').config(['$stateProvider',
	function($stateProvider) {
		// Production parameters state routing
		$stateProvider.
		state('listProductionParameters', {
			url: '/production-parameters',
			templateUrl: 'modules/production-parameters/views/list-production-parameters.client.view.html'
		}).
		state('createProductionParameter', {
			url: '/production-parameters/create',
			templateUrl: 'modules/production-parameters/views/create-production-parameter.client.view.html'
		}).
		state('viewProductionParameter', {
			url: '/production-parameters/:productionParameterId',
			templateUrl: 'modules/production-parameters/views/view-production-parameter.client.view.html'
		}).
		state('editProductionParameter', {
			url: '/production-parameters/:productionParameterId/edit',
			templateUrl: 'modules/production-parameters/views/edit-production-parameter.client.view.html'
		});
	}
]);