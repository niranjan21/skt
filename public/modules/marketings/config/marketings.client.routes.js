'use strict';

//Setting up route
angular.module('marketings').config(['$stateProvider',
	function($stateProvider) {
		// Marketings state routing
		$stateProvider.
		state('listMarketings', {
			url: '/marketings',
			templateUrl: 'modules/marketings/views/list-marketings.client.view.html'
		}).
		state('createMarketing', {
			url: '/marketings/create',
			templateUrl: 'modules/marketings/views/create-marketing.client.view.html'
		}).
		state('viewMarketing', {
			url: '/marketings/:marketingId',
			templateUrl: 'modules/marketings/views/view-marketing.client.view.html'
		}).
		state('editMarketing', {
			url: '/marketings/:marketingId/edit',
			templateUrl: 'modules/marketings/views/edit-marketing.client.view.html'
		});
	}
]);