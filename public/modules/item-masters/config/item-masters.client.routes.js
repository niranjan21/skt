'use strict';

//Setting up route
angular.module('item-masters').config(['$stateProvider',
	function($stateProvider) {
		// Item masters state routing
		$stateProvider.
		state('listItemMasters', {
			url: '/item-masters',
			templateUrl: 'modules/item-masters/views/list-item-masters.client.view.html'
		}).
		state('createItemMaster', {
			url: '/item-masters/create',
			templateUrl: 'modules/item-masters/views/create-item-master.client.view.html'
		}).
		state('viewItemMaster', {
			url: '/item-masters/:itemMasterId',
			templateUrl: 'modules/item-masters/views/view-item-master.client.view.html'
		}).
		state('editItemMaster', {
			url: '/item-masters/:itemMasterId/edit',
			templateUrl: 'modules/item-masters/views/edit-item-master.client.view.html'
		});
	}
]);