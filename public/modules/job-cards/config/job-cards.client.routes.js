'use strict';

//Setting up route
angular.module('job-cards').config(['$stateProvider',
	function($stateProvider) {
		// Job cards state routing
		$stateProvider.
		state('listJobCards', {
			url: '/job-cards',
			templateUrl: 'modules/job-cards/views/list-job-cards.client.view.html'
		}).
		state('createJobCard', {
			url: '/job-cards/create',
			templateUrl: 'modules/job-cards/views/create-job-card.client.view.html'
		}).
		state('viewJobCard', {
			url: '/job-cards/:jobCardId',
			templateUrl: 'modules/job-cards/views/view-job-card.client.view.html'
		}).
		state('editJobCard', {
			url: '/job-cards/:jobCardId/edit',
			templateUrl: 'modules/job-cards/views/edit-job-card.client.view.html'
		});
	}
]);