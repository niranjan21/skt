'use strict';

//Setting up route
angular.module('fixed-rates').config(['$stateProvider',
	function($stateProvider) {
		// Fixed rates state routing
		$stateProvider.
		state('listFixedRates', {
			url: '/fixed-rates',
			templateUrl: 'modules/fixed-rates/views/list-fixed-rates.client.view.html'
		}).
		state('createFixedRate', {
			url: '/fixed-rates/create',
			templateUrl: 'modules/fixed-rates/views/create-fixed-rate.client.view.html'
		}).
		state('viewFixedRate', {
			url: '/fixed-rates/:fixedRateId',
			templateUrl: 'modules/fixed-rates/views/view-fixed-rate.client.view.html'
		}).
		state('editFixedRate', {
			url: '/fixed-rates/:fixedRateId/edit',
			templateUrl: 'modules/fixed-rates/views/edit-fixed-rate.client.view.html'
		});
	}
]);