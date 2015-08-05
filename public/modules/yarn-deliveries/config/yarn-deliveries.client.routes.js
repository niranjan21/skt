'use strict';

//Setting up route
angular.module('yarn-deliveries').config(['$stateProvider',
	function($stateProvider) {
		// Yarn deliveries state routing
		$stateProvider.
		state('listYarnDeliveries', {
			url: '/yarn-deliveries',
			templateUrl: 'modules/yarn-deliveries/views/list-yarn-deliveries.client.view.html'
		}).
		state('createYarnDelivery', {
			url: '/yarn-deliveries/create',
			templateUrl: 'modules/yarn-deliveries/views/create-yarn-delivery.client.view.html'
		}).
		state('viewYarnDelivery', {
			url: '/yarn-deliveries/:yarnDeliveryId',
			templateUrl: 'modules/yarn-deliveries/views/view-yarn-delivery.client.view.html'
		}).
		state('editYarnDelivery', {
			url: '/yarn-deliveries/:yarnDeliveryId/edit',
			templateUrl: 'modules/yarn-deliveries/views/edit-yarn-delivery.client.view.html'
		});
	}
]);