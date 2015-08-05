'use strict';

//Setting up route
angular.module('item-inclusions').config(['$stateProvider',
	function($stateProvider) {
		// Item inclusions state routing
		$stateProvider.
		state('listItemInclusions', {
			url: '/item-inclusions',
			templateUrl: 'modules/item-inclusions/views/list-item-inclusions.client.view.html'
		}).
		state('createItemInclusion', {
			url: '/item-inclusions/create',
			templateUrl: 'modules/item-inclusions/views/create-item-inclusion.client.view.html'
		}).
		state('viewItemInclusion', {
			url: '/item-inclusions/:itemInclusionId',
			templateUrl: 'modules/item-inclusions/views/view-item-inclusion.client.view.html'
		}).
		state('editItemInclusion', {
			url: '/item-inclusions/:itemInclusionId/edit',
			templateUrl: 'modules/item-inclusions/views/edit-item-inclusion.client.view.html'
		});
	}
]);